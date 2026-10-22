import Phaser from 'phaser';
import { seededRandom } from '../art/canvas';
import { frameName, npcLookKey } from '../art/characters';
import { MARKERS, placeMarker } from '../art/markers';
import { EVENTS, MAP_H, MAP_W, minimapRect, NPC_COUNT, pickZoom, REGISTRY, TILE, WORLD_H, WORLD_W } from '../../config';
import { NameTag } from '../entities/NameTag';
import { Npc } from '../entities/Npc';
import { Walker } from '../entities/Walker';
import { renderBuildings, renderGround, renderProps, renderRoadMarkings, type Door } from '../render/cityRenderer';
import { Interactions } from '../systems/Interactions';
import { PlayerControls } from '../systems/PlayerControls';
import type { CurrentMission } from '../../missions';
import { guideArrow } from '../../world/guide';
import { MissionTracker } from '../systems/MissionTracker';
import { busStopTalk, STAY } from '../../busStop';
import { missionAccess, type AccessPolicy } from '../../world/access';
import { buildCityGround, buildingTop, doorTile, streetProps, type BuildingDef, type GroundGrid } from '../../world/cityMap';
import { BUS_STOP, districtOf, findBuilding, findDistrict, type District, type DistrictId } from '../../world/districts';
import { G } from '../../world/tileTypes';

const BUS_LINE = 'Con el bus de la esquina llegas a los otros distritos. Cada uno tiene clientes con problemas distintos.';

/** What neighbours talk about in each district: hints of the problems its clients have. */
const NPC_LINES: Record<DistrictId, string[]> = {
  centro: [
    '¿Viste la Pastelería Dulce Nube? Dicen que su web se cae cada Navidad.',
    'Si recién empiezas, pasa por la Cloud Academy. Ahí te explican todo desde cero.',
    'Rapidito recibe miles de pedidos al mediodía y casi ninguno de madrugada.',
    'En Seguros Horizonte se preguntan si la nube les conviene más que su centro de datos.',
  ],
  financiero: [
    'En el Banco Andino andan preocupados por la seguridad de los datos de sus clientes.',
    'Aquí todos hablan de auditorías, cifrado y permisos. Es el barrio más cuidadoso de la ciudad.',
    'La Fintech PagoYa mueve pagos de miles de personas. Un acceso indebido sería un desastre.',
    'Dicen que en la Bolsa de Valores Andina reciben ataques para tumbar su sistema.',
  ],
  tecnologico: [
    'StreamLlama quiere llegar a toda Latinoamérica, pero sus videos cargan lento fuera de Lima.',
    'La Municipalidad tiene que guardar sus documentos por diez años. ¡Diez!',
    'En la Clínica Vida dicen que sus sistemas no pueden caerse nunca.',
    'En el Startup Lab cada mes nace una startup que quiere crecer sin administrar servidores.',
  ],
  mercado: [
    'Me contaron que en Startup Hub pagan una fortuna por servidores que nadie usa.',
    'En el Estudio Contable Saldo siempre preguntan por qué la factura de AWS subió.',
    'La Florería Primavera vende diez veces más en San Valentín. El resto del año, casi nada.',
    'En el Contact Center Andino atienden las 24 horas. Si algo se cae, ¿a quién llaman?',
  ],
};

/** Each district places its neighbours differently, the same way on every visit. */
const NPC_SEEDS: Record<DistrictId, number> = { centro: 2024, financiero: 2025, tecnologico: 2026, mercado: 2027 };

const FADE_MS = 250;

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
  private tracker!: MissionTracker;
  private guide!: Phaser.GameObjects.Image;
  private guideTarget: { x: number; y: number } | null = null;
  private district!: District;

  constructor() {
    super('city');
  }

  create(data: CityStartData = {}) {
    this.tracker = MissionTracker.of(this);
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
    this.tweens.add({ targets: this.guide, scale: { from: 1.2, to: 1.5 }, duration: 450, yoyo: true, repeat: -1 });
    this.setupCameras();
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
    this.game.events.emit(EVENTS.location, { title: 'Cúmulo City', subtitle: this.district.name, minimap: true });
  }

  /** The bus stop takes the player to another district. */
  private addBusStop(stop: { x: number; y: number }) {
    this.interactions.add({
      x: stop.x,
      y: stop.y - 4,
      prompt: '[E] Tomar el bus',
      open: () => ({
        pages: [busStopTalk(this.district.id)],
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

    const interact = this.controls.consumeInteract();
    if (this.interactions.busy) this.player.move(0, 0);
    else this.controls.drive(this.player);
    this.interactions.update(interact);
  }

  private addDoor({ building, x, y }: Door) {
    this.interactions.add({
      x,
      y,
      prompt: `[E] Entrar a ${building.name}`,
      open: () => {
        const decision = this.access.canEnter(building);
        if (!decision.allowed) return { title: building.name, text: decision.reason };
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
    this.access = missionAccess(current);
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
      .setPosition(from.x + Math.cos(angle) * 30, from.y + Math.sin(angle) * 30);
  }

  /** Citizens start on free pavement: not under a building and not on a prop. */
  private spawnNpcs(ground: GroundGrid, rng: () => number): Npc[] {
    const taken = new Set([...streetProps(ground, this.district.buildings), BUS_STOP].map((p) => `${p.x},${p.y}`));
    const underBuilding = (x: number, y: number) =>
      this.district.buildings.some((b) => x >= b.x && x < b.x + b.w && y >= buildingTop(b) && y <= b.bottom);
    const lines = [...NPC_LINES[this.district.id], BUS_LINE];
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
        prompt: '[E] Hablar',
        open: () => {
          npc.frozen = true;
          npc.face(this.player.x, this.player.y);
          return { title: 'Vecino', text: npc.line, portrait: { key: npc.look, frame: frameName('down', 0) } };
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
    main.setBounds(0, 0, WORLD_W, WORLD_H).setZoom(pickZoom(this.scale.width, this.scale.height));
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
      main.setZoom(pickZoom(size.width, size.height));
      const r = minimapRect(size.width);
      this.minimap.setPosition(r.x, r.y);
    };
    this.scale.on('resize', onResize);
    this.events.once('shutdown', () => this.scale.off('resize', onResize));
  }
}
