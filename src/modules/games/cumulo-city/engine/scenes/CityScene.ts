import Phaser from 'phaser';
import { seededRandom } from '../art/canvas';
import { frameName, npcLookKey } from '../art/characters';
import { MARKERS, placeMarker } from '../art/markers';
import { EVENTS, FONT, GUIDE_ORBIT, MAP_H, MAP_W, minimapRect, NPC_COUNT, pickZoom, REGISTRY, TILE, WORLD_H, WORLD_W } from '../../config';
import { NameTag } from '../entities/NameTag';
import { Npc } from '../entities/Npc';
import { Walker } from '../entities/Walker';
import { renderBuildings, renderGround, renderProps, renderRoadMarkings, type Door } from '../render/cityRenderer';
import { Interactions } from '../systems/Interactions';
import { PlayerControls } from '../systems/PlayerControls';
import type { CurrentMission } from '../../missions';
import { stepZoom, zoomLevels } from '../../cameraZoom';
import { pinchStep } from '../../touchStick';
import { guideArrow } from '../../world/guide';
import { MissionTracker } from '../systems/MissionTracker';
import { busStopTalk, STAY } from '../../busStop';
import { missionAccess, type AccessPolicy } from '../../world/access';
import { buildCityGround, buildingTop, doorTile, streetProps, type BuildingDef, type GroundGrid } from '../../world/cityMap';
import { BUS_STOP, districtOf, findBuilding, findDistrict, type District, type DistrictId } from '../../world/districts';
import { buildingName, districtName } from '../../world/placeNames';
import { G } from '../../world/tileTypes';
import { gameLocale, gameText } from '../locale';

/** Each district places its neighbours differently, the same way on every visit. */
const NPC_SEEDS: Record<DistrictId, number> = { downtown: 2024, financial: 2025, tech: 2026, market: 2027 };

const FADE_MS = 250;
/** How long a zoom step takes, and how much wheel movement makes one step. */
const ZOOM_MS = 220;
const WHEEL_STEP = 50;

/** Data passed when coming back from a building interior. */
export interface CityWakeData {
  exitBuildingId?: string;
}

/** Data the city starts with: which district to show and whether the player arrives by bus. */
export interface CityStartData {
  districtId?: string;
  arriveByBus?: boolean;
}

export class CityScene extends Phaser.Scene {
  private player!: Walker;
  private nameTag!: NameTag;
  private controls!: PlayerControls;
  private interactions!: Interactions;
  private minimap!: Phaser.Cameras.Scene2D.Camera;
  private marker!: Phaser.GameObjects.Arc;
  /** Doors open only for the active mission; updated whenever the mission changes. */
  private access: AccessPolicy = missionAccess(null);
  private transitioning = false;
  private markers: Phaser.GameObjects.Image[] = [];
  /** Whether the full-map view is on, the camera follows the player, and the map is being dragged. */
  private mapMode = false;
  private following = true;
  private dragging = false;
  private zoomTween?: Phaser.Tweens.Tween;
  /** Zoom the running animation is heading to. */
  private zoomTarget = 0;
  private tracker!: MissionTracker;
  private guide!: Phaser.GameObjects.Image;
  private guideTarget: { x: number; y: number } | null = null;
  private district!: District;

  constructor() {
    super('city');
  }

  create(data: CityStartData = {}) {
    this.tracker = MissionTracker.of(this);
    this.access = missionAccess(null, gameLocale(this));
    this.district = findDistrict(data.districtId ?? this.tracker.district);
    this.tracker.district = this.district.id;
    this.transitioning = false;
    this.markers = [];
    this.guideTarget = null;

    const cityGround = buildCityGround();
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);

    const solids = this.physics.add.staticGroup();
    const addSolid = (cx: number, cy: number, w: number, h: number) => solids.add(this.add.zone(cx, cy, w, h));

    const ground = renderGround(this, cityGround);
    renderRoadMarkings(this, cityGround);
    const doors = renderBuildings(this, ground, this.district.buildings, addSolid);
    renderProps(this, cityGround, this.district.buildings, addSolid);
    const busStop = { x: (BUS_STOP.x + 0.5) * TILE, y: (BUS_STOP.y + 1) * TILE };
    this.add.image(busStop.x, busStop.y, MARKERS.busStop).setOrigin(0.5, 1).setDepth(busStop.y);
    addSolid(busStop.x, busStop.y - 3, 6, 6);

    // A new game starts at the Cloud Academy; a bus ride ends next to the stop.
    const academy = this.district.buildings.find((b) => b.id === 'academy');
    const start = data.arriveByBus || !academy ? { x: busStop.x + TILE, y: busStop.y - 2 } : { x: (doorTile(academy).x + 0.5) * TILE, y: (doorTile(academy).y + 1) * TILE - 2 };
    this.player = new Walker(this, start.x, start.y, this.registry.get(REGISTRY.playerKey) ?? 'player-man');
    this.nameTag = new NameTag(this, this.registry.get(REGISTRY.playerName));
    this.controls = new PlayerControls(this);
    this.interactions = new Interactions(this, this.player);
    for (const door of doors) this.addDoor(door);
    this.addBusStop(busStop);
    const npcs = this.spawnNpcs(cityGround, seededRandom(NPC_SEEDS[this.district.id]));

    const npcGroup = this.add.group(npcs, { runChildUpdate: true });
    for (const obstacle of [solids, ground]) {
      this.physics.add.collider(this.player, obstacle);
      this.physics.add.collider(npcGroup, obstacle);
    }
    this.physics.add.collider(this.player, npcGroup);

    // Above the name tag (depth 9000) so it is never hidden; grows and shrinks to catch the eye, always opaque.
    this.guide = this.add.image(0, 0, MARKERS.guide).setDepth(9_100).setVisible(false);
    this.tweens.add({ targets: this.guide, scale: { from: 0.9, to: 1.05 }, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.mapMode = false;
    this.following = true;
    this.dragging = false;
    this.setupCameras();
    this.setupMapControls();
    this.markBusStop(busStop);
    this.zoomTween = undefined;
    this.game.events.emit(EVENTS.mapMode, false);
    this.minimap.ignore(this.guide);

    const onMissionChanged = (current: CurrentMission | null) => void this.applyMission(current);
    this.game.events.on(EVENTS.missionChanged, onMissionChanged);
    const onWake = (_: unknown, wake: CityWakeData) => this.returnFromBuilding(wake);
    this.events.on('wake', onWake);
    this.events.once('shutdown', () => {
      this.game.events.off(EVENTS.missionChanged, onMissionChanged);
      this.events.off('wake', onWake);
    });

    if (!this.scene.isActive('hud')) this.scene.launch('hud');
    void this.tracker.refresh();
    this.showLocation();
    this.cameras.main.fadeIn(FADE_MS, 0, 0, 0);
  }

  private showLocation() {
    this.game.events.emit(EVENTS.location, { title: 'Cúmulo City', subtitle: districtName(this.district.id, gameLocale(this)), minimap: true });
  }

  /** A readable sign over the bus stop, and a blue dot that shows it on the minimap. */
  private markBusStop(stop: { x: number; y: number }) {
    const text = gameText(this).city.busSign;
    const y = stop.y - 34;
    this.add.rectangle(stop.x, y, text.length * 4 + 12, 10, 0x2b2b3a).setStrokeStyle(1, 0x5b8fd6).setDepth(8_000);
    this.add
      .text(stop.x, y, text, { fontFamily: FONT, fontSize: '4px', color: '#ffffff', resolution: 4 })
      .setOrigin(0.5)
      .setDepth(8_001)
      .texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    const dot = this.add.circle(stop.x, stop.y - 8, 22, 0x3b6fb6).setStrokeStyle(8, 0xf4f7ee).setDepth(9_999);
    this.cameras.main.ignore(dot);
  }

  /** The bus stop takes the player to another district. */
  private addBusStop(stop: { x: number; y: number }) {
    this.interactions.add({
      x: stop.x,
      y: stop.y - 4,
      prompt: gameText(this).city.busPrompt,
      open: () => ({
        pages: [busStopTalk(this.district.id, gameLocale(this))],
        onChoice: (choice: string) => {
          if (choice !== STAY) this.travel(choice as DistrictId);
        },
      }),
    });
  }

  private travel(districtId: DistrictId) {
    this.transitioning = true;
    this.player.move(0, 0);
    this.interactions.clearPrompt();
    this.cameras.main.fadeOut(FADE_MS, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.tracker.district = districtId;
      this.scene.restart({ districtId, arriveByBus: true } satisfies CityStartData);
    });
  }

  update() {
    this.marker.setPosition(this.player.x, this.player.y - 8);
    this.nameTag.follow(this.player);
    this.updateGuide();
    if (this.transitioning) return;
    // The full map is only for looking around: the player waits where they are.
    if (this.mapMode) {
      this.player.move(0, 0);
      return;
    }

    const interact = this.controls.consumeInteract();
    if (this.interactions.busy) this.player.move(0, 0);
    else this.controls.drive(this.player);
    this.interactions.update(interact);

    // After dragging to look around, walking brings the camera back to the player.
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (!this.following && !this.dragging && body.velocity.lengthSq() > 0) this.followPlayer();
  }

  /** Zoom levels for this screen: the whole district first, then whole zooms up to the closest view. */
  private levels(): number[] {
    return zoomLevels({ width: this.scale.width, height: this.scale.height }, { width: WORLD_W, height: WORLD_H });
  }

  /** Sets a zoom and keeps the district centered when the view is larger than it. */
  private setZoom(zoom: number) {
    const camera = this.cameras.main.setZoom(zoom);
    const width = Math.max(WORLD_W, this.scale.width / zoom);
    const height = Math.max(WORLD_H, this.scale.height / zoom);
    camera.setBounds((WORLD_W - width) / 2, (WORLD_H - height) / 2, width, height);
  }

  private followPlayer() {
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);
    this.following = true;
  }

  /** Glides the zoom to `target`; `onProgress` runs every frame with the progress (0–1), e.g. to pan along. */
  private animateZoom(target: number, onProgress?: (progress: number) => void) {
    this.zoomTween?.stop();
    this.zoomTarget = target;
    this.zoomTween = this.tweens.addCounter({
      from: this.cameras.main.zoom,
      to: target,
      duration: ZOOM_MS,
      ease: 'Sine.easeOut',
      onUpdate: (tween) => {
        this.setZoom(tween.getValue() ?? target);
        onProgress?.(tween.progress);
      },
    });
  }

  private zoomBy(direction: 'in' | 'out') {
    if (this.transitioning) return;
    // Quick repeated steps continue from where the running animation is heading, not from where it is.
    const from = this.zoomTween?.isPlaying() ? this.zoomTarget : this.cameras.main.zoom;
    this.animateZoom(stepZoom(this.levels(), from, direction));
  }

  /** Full-map view: the whole district on screen, dragged around freely; leaving it goes back to the player. */
  private toggleMap(on = !this.mapMode) {
    if (this.transitioning || on === this.mapMode) return;
    this.mapMode = on;
    const camera = this.cameras.main;
    if (on) {
      this.player.move(0, 0);
      this.interactions.clearPrompt();
      camera.stopFollow();
      this.following = false;
      // Zoom out and glide to the middle of the district at the same time.
      const start = { x: camera.midPoint.x, y: camera.midPoint.y };
      this.animateZoom(this.levels()[0], (p) =>
        camera.centerOn(Phaser.Math.Linear(start.x, WORLD_W / 2, p), Phaser.Math.Linear(start.y, WORLD_H / 2, p)),
      );
    } else {
      this.animateZoom(pickZoom(this.scale.width, this.scale.height));
      this.followPlayer();
    }
    this.minimap.setVisible(!on);
    this.game.events.emit(EVENTS.mapMode, on);
  }

  /** Wheel, +/−, M and Esc, the HUD buttons, and dragging the map with the mouse or a finger. */
  private setupMapControls() {
    const handlers: [string, () => void][] = [
      [EVENTS.zoomIn, () => this.zoomBy('in')],
      [EVENTS.zoomOut, () => this.zoomBy('out')],
      [EVENTS.toggleMap, () => this.toggleMap()],
    ];
    for (const [event, handler] of handlers) this.game.events.on(event, handler);
    this.events.once('shutdown', () => {
      for (const [event, handler] of handlers) this.game.events.off(event, handler);
    });

    // A mouse wheel notch is one step; a trackpad's many small deltas add up to one.
    let wheel = 0;
    this.input.on('wheel', (_pointer: unknown, _over: unknown, _dx: number, dy: number) => {
      wheel += dy;
      if (Math.abs(wheel) < WHEEL_STEP) return;
      this.zoomBy(wheel > 0 ? 'out' : 'in');
      wheel = 0;
    });
    this.input.keyboard!.on('keydown', (event: KeyboardEvent) => {
      if (this.interactions.busy) return;
      if (event.key === '+' || event.key === '=') this.zoomBy('in');
      else if (event.key === '-' || event.key === '_') this.zoomBy('out');
      else if (event.key === 'm' || event.key === 'M') this.toggleMap();
      else if (event.key === 'Escape') this.toggleMap(false);
    });

    // Two fingers: pinching or spreading them zooms one step each time the distance changes enough.
    if (this.input.manager.pointersTotal < 3) this.input.addPointer(2);
    let pinchStart = 0;
    const pinchDistance = () => {
      const [a, b] = [this.input.pointer1, this.input.pointer2];
      return a.isDown && b.isDown ? Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y) : 0;
    };

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown || this.transitioning) return;
      // The finger on the on-screen stick walks the player; it never drags the map.
      const stickPointer = this.registry.get(REGISTRY.stickPointer);
      if (pointer.id === stickPointer) return;
      const distance = stickPointer === null || stickPointer === undefined ? pinchDistance() : 0;
      if (distance > 0) {
        pinchStart ||= distance;
        const step = pinchStep(pinchStart, distance);
        if (step) {
          this.zoomBy(step);
          pinchStart = distance;
        }
        this.dragging = true;
        return;
      }
      // A short movement is still a click; only a real drag moves the map.
      if (!this.dragging && Phaser.Math.Distance.Between(pointer.downX, pointer.downY, pointer.x, pointer.y) < 6) return;
      this.dragging = true;
      const camera = this.cameras.main;
      if (this.following) {
        camera.stopFollow();
        this.following = false;
      }
      camera.scrollX -= (pointer.x - pointer.prevPosition.x) / camera.zoom;
      camera.scrollY -= (pointer.y - pointer.prevPosition.y) / camera.zoom;
    });
    this.input.on('pointerup', () => {
      this.dragging = false;
      pinchStart = 0;
    });
  }

  private addDoor({ building, x, y }: Door) {
    const name = buildingName(building.id, gameLocale(this));
    this.interactions.add({
      x,
      y,
      prompt: gameText(this).city.enterPrompt(name),
      open: () => {
        const decision = this.access.canEnter(building);
        if (!decision.allowed) return { title: name, text: decision.reason };
        this.enterBuilding(building);
        return null;
      },
    });
  }

  private enterBuilding(building: BuildingDef) {
    this.transitioning = true;
    this.player.move(0, 0);
    this.interactions.clearPrompt();
    this.cameras.main.fadeOut(FADE_MS, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.sleep();
      this.scene.run('interior', { buildingId: building.id });
    });
  }

  private returnFromBuilding(data: CityWakeData) {
    const building = this.district.buildings.find((b) => b.id === data?.exitBuildingId);
    if (building) {
      const door = doorTile(building);
      this.player.setPosition((door.x + 0.5) * TILE, (door.y + 1) * TILE - 2);
      this.player.facing = 'down';
      this.player.move(0, 0);
    }
    this.controls.reset();
    this.transitioning = false;
    void this.tracker.refresh();
    this.showLocation();
    this.cameras.main.fadeIn(FADE_MS, 0, 0, 0);
  }

  /**
   * Updates door access, markers and the guide after the current mission changes: the arrow points to the
   * active mission's door, or to the bus stop when that building is in another district.
   */
  private async applyMission(current: CurrentMission | null) {
    this.access = missionAccess(current, gameLocale(this));
    const active = current?.state === 'active' ? findBuilding(current.brief.buildingId) : undefined;
    if (active && districtOf(active.id)?.id === this.district.id) {
      const door = doorTile(active);
      this.guideTarget = { x: (door.x + 0.5) * TILE, y: door.y * TILE + 8 };
    } else if (active) {
      this.guideTarget = { x: (BUS_STOP.x + 0.5) * TILE, y: (BUS_STOP.y + 1) * TILE };
    } else {
      this.guideTarget = null;
    }
    await this.refreshMarkers();
  }

  /** "!" above the building of the active mission, a check above buildings whose clients were all helped. */
  private async refreshMarkers() {
    const missions = this.tracker.missions;
    const placed = await Promise.all(
      this.district.buildings.map(async (building) => {
        const found = await missions.forBuilding(building.id);
        return found ? { building, completed: found.state === 'completed' } : null;
      }),
    );
    if (!this.sys.isActive()) return;
    for (const marker of this.markers) marker.destroy();
    this.markers = placed
      .filter((p) => p !== null)
      .map(({ building, completed }) =>
        placeMarker(this, (building.x + building.w / 2) * TILE, buildingTop(building) * TILE - 2, completed),
      );
  }

  /** Arrow orbiting the player toward the active mission's door, hidden once close. */
  private updateGuide() {
    if (!this.guideTarget || this.transitioning) {
      this.guide.setVisible(false);
      return;
    }
    const from = { x: this.player.x, y: this.player.y - 4 };
    const { visible, angle } = guideArrow(from, this.guideTarget, 3 * TILE);
    this.guide
      .setVisible(visible)
      .setRotation(angle)
      .setPosition(from.x + Math.cos(angle) * GUIDE_ORBIT, from.y + Math.sin(angle) * GUIDE_ORBIT);
  }

  /** Citizens start on free pavement: not under a building and not on a prop. */
  private spawnNpcs(ground: GroundGrid, rng: () => number): Npc[] {
    const taken = new Set([...streetProps(ground, this.district.buildings), BUS_STOP].map((p) => `${p.x},${p.y}`));
    const underBuilding = (x: number, y: number) =>
      this.district.buildings.some((b) => x >= b.x && x < b.x + b.w && y >= buildingTop(b) && y <= b.bottom);
    const text = gameText(this).city;
    const lines = [...text.npcLines[this.district.id], text.busLine];
    const free: { x: number; y: number }[] = [];
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        if (ground[y][x] === G.PAVEMENT && !underBuilding(x, y) && !taken.has(`${x},${y}`)) free.push({ x, y });
      }
    }
    return Array.from({ length: NPC_COUNT }, (_, i) => {
      const spot = free[Math.floor(rng() * free.length)];
      const npc = new Npc(this, (spot.x + 0.5) * TILE, (spot.y + 1) * TILE - 2, npcLookKey(i), lines[i % lines.length]);
      this.interactions.add({
        get x() {
          return npc.x;
        },
        get y() {
          return npc.y;
        },
        prompt: text.talkPrompt,
        open: () => {
          npc.frozen = true;
          npc.face(this.player.x, this.player.y);
          return { title: text.neighbour, text: npc.line, portrait: { key: npc.look, frame: frameName('down', 0) } };
        },
        close: () => {
          npc.frozen = false;
        },
      });
      return npc;
    });
  }

  private setupCameras() {
    const main = this.cameras.main;
    this.setZoom(pickZoom(this.scale.width, this.scale.height));
    main.startFollow(this.player, true, 0.15, 0.15);
    main.setBackgroundColor('#1d2b53');

    const rect = minimapRect(this.scale.width);
    this.minimap = this.cameras
      .add(rect.x, rect.y, rect.width, rect.height)
      .setZoom(rect.width / WORLD_W)
      .setBackgroundColor('#1d2b53');
    this.minimap.centerOn(WORLD_W / 2, WORLD_H / 2);
    this.marker = this.add.circle(0, 0, 22, 0xffd166).setStrokeStyle(8, 0x1b1b2a).setDepth(10_000);
    main.ignore(this.marker);
    this.minimap.ignore(this.nameTag);

    const onResize = (size: Phaser.Structs.Size) => {
      this.setZoom(this.mapMode ? this.levels()[0] : pickZoom(size.width, size.height));
      const r = minimapRect(size.width);
      this.minimap.setPosition(r.x, r.y);
    };
    this.scale.on('resize', onResize);
    this.events.once('shutdown', () => this.scale.off('resize', onResize));
  }
}
