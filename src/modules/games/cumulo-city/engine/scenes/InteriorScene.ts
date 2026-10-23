import Phaser from 'phaser';
import { seededRandom } from '../art/canvas';
import { frameName, npcLookKey } from '../art/characters';
import { EVENTS, fitZoom, REGISTRY, TILE } from '../../config';
import { NameTag } from '../entities/NameTag';
import { Walker } from '../entities/Walker';
import { Worker } from '../entities/Worker';
import { renderOffice } from '../render/officeRenderer';
import { MARKERS, placeMarker } from '../art/markers';
import { Interactions, type Interactable } from '../systems/Interactions';
import { MissionTracker } from '../systems/MissionTracker';
import { PlayerControls } from '../systems/PlayerControls';
import { clientOffer, clientOutro, START } from '../../missionTalk';
import type { GameMissions, MissionBrief } from '../../missions';
import type { BuildingDef } from '../../world/cityMap';
import { ALL_BUILDINGS, findBuilding } from '../../world/districts';
import { guideArrow } from '../../world/guide';
import { buildOfficeLayout, walkableGrid, type OfficeLayout } from '../../world/office';
import { workerLine, workerName } from '../../world/officeTalk';
import { buildingName } from '../../world/placeNames';
import { gameLocale, gameText } from '../locale';
import type { CityWakeData } from './CityScene';

export interface InteriorData {
  buildingId: string;
}

const FADE_MS = 250;

/** Inside a building: an office with workers; walking back over the doormat returns to the street. */
export class InteriorScene extends Phaser.Scene {
  private building!: BuildingDef;
  private guide!: Phaser.GameObjects.Image;
  /** The client of the active mission, until the player reaches them. */
  private guideTarget: Worker | null = null;
  private layout!: OfficeLayout;
  private player!: Walker;
  private nameTag!: NameTag;
  private controls!: PlayerControls;
  private interactions!: Interactions;
  private workerTalk: Interactable[] = [];
  private leaving = false;
  /** True while the mission panel is open over the office. */
  private inMission = false;

  constructor() {
    super('interior');
  }

  create(data: InteriorData) {
    this.building = findBuilding(data.buildingId)!;
    this.layout = buildOfficeLayout(this.building);
    this.leaving = false;
    this.inMission = false;
    this.workerTalk = [];
    this.physics.world.setBounds(0, 0, this.layout.width * TILE, this.layout.height * TILE);

    const solids = this.physics.add.staticGroup();
    renderOffice(this, this.layout, this.building, (cx, cy, w, h) => solids.add(this.add.zone(cx, cy, w, h)));

    const spawn = this.layout.spawn;
    this.player = new Walker(this, (spawn.x + 0.5) * TILE, (spawn.y + 1) * TILE - 2, this.registry.get(REGISTRY.playerKey) ?? 'player-man');
    this.player.facing = 'up';
    this.player.move(0, 0);
    this.nameTag = new NameTag(this, this.registry.get(REGISTRY.playerName));
    this.controls = new PlayerControls(this);
    this.interactions = new Interactions(this, this.player);

    this.guideTarget = null;
    this.guide = this.add.image(0, 0, MARKERS.guide).setDepth(9_100).setVisible(false);
    this.tweens.add({ targets: this.guide, scale: { from: 1.2, to: 1.5 }, duration: 450, yoyo: true, repeat: -1 });

    const workers = this.spawnWorkers();
    this.physics.add.collider(this.player, solids);
    this.physics.add.collider(this.player, this.add.group(workers, { runChildUpdate: true }));
    void this.setupClient(workers[0], this.workerTalk[0]);

    const camera = this.cameras.main.setBackgroundColor('#141c33');
    this.frameRoom(this.scale.width, this.scale.height);
    const onResize = (size: Phaser.Structs.Size) => this.frameRoom(size.width, size.height);
    this.scale.on('resize', onResize);
    this.events.once('shutdown', () => this.scale.off('resize', onResize));

    this.game.events.emit(EVENTS.location, {
      title: buildingName(this.building.id, gameLocale(this)),
      subtitle: gameText(this).interior.exitHint,
      minimap: false,
    });
    camera.fadeIn(FADE_MS, 0, 0, 0);
  }

  update() {
    this.nameTag.follow(this.player);
    if (this.leaving || this.inMission) return;

    const interact = this.controls.consumeInteract();
    if (this.interactions.busy) this.player.move(0, 0);
    else this.controls.drive(this.player);
    this.interactions.update(interact);
    this.updateGuide();

    const doorX = (this.layout.door.x + 0.5) * TILE;
    if (this.player.y >= this.layout.door.y * TILE + 8 && Math.abs(this.player.x - doorX) < TILE) this.leave();
  }

  /** Arrow orbiting the player toward the client of the active mission, hidden once next to them. */
  private updateGuide() {
    if (!this.guideTarget || this.interactions.busy) {
      this.guide.setVisible(false);
      return;
    }
    const from = { x: this.player.x, y: this.player.y - 4 };
    const { visible, angle } = guideArrow(from, { x: this.guideTarget.x, y: this.guideTarget.y }, 2 * TILE);
    this.guide
      .setVisible(visible)
      .setRotation(angle)
      .setPosition(from.x + Math.cos(angle) * 30, from.y + Math.sin(angle) * 30);
  }

  /** Shows the whole room centered when it fits the screen; otherwise follows the player. */
  private frameRoom(viewWidth: number, viewHeight: number) {
    const camera = this.cameras.main;
    const roomWidth = this.layout.width * TILE;
    const roomHeight = this.layout.height * TILE;
    const zoom = fitZoom(viewWidth, viewHeight, roomWidth, roomHeight);
    camera.setZoom(zoom);
    if (roomWidth * zoom <= viewWidth && roomHeight * zoom <= viewHeight) {
      camera.stopFollow();
      camera.centerOn(roomWidth / 2, roomHeight / 2);
    } else {
      camera.startFollow(this.player, true, 0.15, 0.15);
    }
  }

  private spawnWorkers(): Worker[] {
    const rng = seededRandom(this.building.id.length * 7919);
    const walkable = walkableGrid(this.layout);
    const lookOffset = ALL_BUILDINGS.indexOf(this.building);
    const takenSpots = new Set<string>();
    return this.layout.workstations.map((station, i) => {
      const worker = new Worker(
        this,
        npcLookKey(i + lookOffset),
        workerLine(this.building.id, i, gameLocale(this)),
        station,
        this.layout.breakSpots,
        walkable,
        rng,
        takenSpots,
      );
      const name = workerName(this.building.id, i);
      const talk: Interactable = {
        get x() {
          return worker.talkPoint.x;
        },
        get y() {
          return worker.talkPoint.y;
        },
        prompt: gameText(this).interior.talkTo(name),
        open: () => {
          worker.frozen = true;
          worker.face(this.player.x, this.player.y);
          return { title: name, text: worker.line, portrait: { key: worker.look, frame: frameName('down', 0) } };
        },
        close: () => {
          worker.frozen = false;
        },
      };
      this.interactions.add(talk);
      this.workerTalk.push(talk);
      return worker;
    });
  }

  /** When the building has a job, its first worker becomes the client who offers it. */
  private async setupClient(worker: Worker, talk: Interactable) {
    const tracker = MissionTracker.of(this);
    const missions = tracker.missions;
    // Until the player accepts one of its missions, the client is just another worker.
    const found = await missions.forBuilding(this.building.id);
    if (!found || !this.sys.isActive()) return;
    const { brief, state: initial } = found;

    let state: 'active' | 'completed' = initial;
    worker.stayAtDesk();
    const portrait = { key: worker.look, frame: frameName('down', 0) };
    let marker = placeMarker(this, worker.x, worker.y - 22, state === 'completed');
    if (state === 'active') this.guideTarget = worker;

    talk.prompt = gameText(this).interior.talkTo(brief.client.name);
    talk.open = () => {
      worker.frozen = true;
      worker.face(this.player.x, this.player.y);
      return {
        pages: clientOffer(brief, state, portrait, gameLocale(this)),
        onChoice: (choice) => {
          if (choice === START) void play();
        },
      };
    };

    const play = async () => {
      const outcome = await this.runMission(missions, brief);
      if (!outcome || !this.sys.isActive()) return;
      state = (await missions.status(brief.id)) === 'completed' ? 'completed' : 'active';
      marker.destroy();
      marker = placeMarker(this, worker.x, worker.y - 22, state === 'completed');
      if (state === 'completed') this.guideTarget = null;
      worker.face(this.player.x, this.player.y);
      this.interactions.start({ pages: clientOutro(brief, outcome.passed, portrait) });
      void tracker.refresh();
    };
  }

  /** Pauses the player and keyboard capture while the mission panel is on screen. */
  private async runMission(missions: GameMissions, brief: MissionBrief) {
    this.inMission = true;
    this.player.move(0, 0);
    this.interactions.clearPrompt();
    const keyboard = this.input.keyboard!;
    keyboard.disableGlobalCapture();
    this.game.events.emit(EVENTS.missionPlaying, true);
    try {
      return await missions.play(brief.id);
    } finally {
      keyboard.enableGlobalCapture();
      this.game.events.emit(EVENTS.missionPlaying, false);
      this.controls.reset();
      this.inMission = false;
    }
  }

  private leave() {
    this.leaving = true;
    this.player.move(0, 0);
    this.interactions.clearPrompt();
    this.cameras.main.fadeOut(FADE_MS, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      const data: CityWakeData = { exitBuildingId: this.building.id };
      this.scene.stop();
      this.scene.wake('city', data);
    });
  }
}
