import Phaser from 'phaser';
import { seededRandom } from '../art/canvas';
import { frameName, npcLookKey } from '../art/characters';
import { EVENTS, MAP_H, MAP_W, minimapRect, NPC_COUNT, pickZoom, REGISTRY, TILE, WORLD_H, WORLD_W } from '../../config';
import { NameTag } from '../entities/NameTag';
import { Npc } from '../entities/Npc';
import { Walker } from '../entities/Walker';
import { renderBuildings, renderGround, renderProps, renderRoadMarkings, type Door } from '../render/cityRenderer';
import { Interactions } from '../systems/Interactions';
import { PlayerControls } from '../systems/PlayerControls';
import { openAccess, type AccessPolicy } from '../../world/access';
import { BUILDINGS, buildCityGround, buildingTop, doorTile, streetProps, type BuildingDef, type GroundGrid } from '../../world/cityMap';
import { G } from '../../world/tileTypes';

const NPC_LINES = [
  '¿Viste la Pastelería Dulce Nube? Dicen que su web se cae cada Navidad.',
  'En el Banco Andino andan preocupados por la seguridad de los datos de sus clientes.',
  'Me contaron que en Startup Hub pagan una fortuna por servidores que nadie usa.',
  'StreamLlama quiere llegar a toda Latinoamérica, pero sus videos cargan lento fuera de Lima.',
  'Si recién empiezas, pasa por la Cloud Academy. Ahí te explican todo desde cero.',
  'La Municipalidad tiene que guardar sus documentos por diez años. ¡Diez!',
  'Rapidito recibe miles de pedidos al mediodía y casi ninguno de madrugada.',
  'En la Clínica Vida dicen que sus sistemas no pueden caerse nunca.',
];

const FADE_MS = 250;

/** Data passed when coming back from a building interior. */
export interface CityWakeData {
  exitBuildingId?: string;
}

export class CityScene extends Phaser.Scene {
  private player!: Walker;
  private nameTag!: NameTag;
  private controls!: PlayerControls;
  private interactions!: Interactions;
  private minimap!: Phaser.Cameras.Scene2D.Camera;
  private marker!: Phaser.GameObjects.Arc;
  private readonly access: AccessPolicy = openAccess;
  private transitioning = false;

  constructor() {
    super('city');
  }

  create() {
    const cityGround = buildCityGround();
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);

    const solids = this.physics.add.staticGroup();
    const addSolid = (cx: number, cy: number, w: number, h: number) => solids.add(this.add.zone(cx, cy, w, h));

    const ground = renderGround(this, cityGround);
    renderRoadMarkings(this, cityGround);
    const doors = renderBuildings(this, ground, addSolid);
    renderProps(this, cityGround, addSolid);

    const academy = doorTile(BUILDINGS.find((b) => b.id === 'academy')!);
    this.player = new Walker(this, (academy.x + 0.5) * TILE, (academy.y + 1) * TILE - 2, this.registry.get(REGISTRY.playerKey) ?? 'player-man');
    this.nameTag = new NameTag(this, this.registry.get(REGISTRY.playerName));
    this.controls = new PlayerControls(this);
    this.interactions = new Interactions(this, this.player);
    for (const door of doors) this.addDoor(door);
    const npcs = this.spawnNpcs(cityGround, seededRandom(2024));

    const npcGroup = this.add.group(npcs, { runChildUpdate: true });
    for (const obstacle of [solids, ground]) {
      this.physics.add.collider(this.player, obstacle);
      this.physics.add.collider(npcGroup, obstacle);
    }
    this.physics.add.collider(this.player, npcGroup);

    this.setupCameras();
    this.scene.launch('hud');
    this.events.on('wake', (_: unknown, data: CityWakeData) => this.returnFromBuilding(data));
  }

  update() {
    this.marker.setPosition(this.player.x, this.player.y - 8);
    this.nameTag.follow(this.player);
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
    const building = BUILDINGS.find((b) => b.id === data?.exitBuildingId);
    if (building) {
      const door = doorTile(building);
      this.player.setPosition((door.x + 0.5) * TILE, (door.y + 1) * TILE - 2);
      this.player.facing = 'down';
      this.player.move(0, 0);
    }
    this.controls.reset();
    this.transitioning = false;
    this.game.events.emit(EVENTS.location, { title: 'Nimbus City', subtitle: 'Objetivo: explora la ciudad', minimap: true });
    this.cameras.main.fadeIn(FADE_MS, 0, 0, 0);
  }

  /** Citizens start on free pavement: not under a building and not on a prop. */
  private spawnNpcs(ground: GroundGrid, rng: () => number): Npc[] {
    const taken = new Set(streetProps(ground).map((p) => `${p.x},${p.y}`));
    const underBuilding = (x: number, y: number) =>
      BUILDINGS.some((b) => x >= b.x && x < b.x + b.w && y >= buildingTop(b) && y <= b.bottom);
    const free: { x: number; y: number }[] = [];
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        if (ground[y][x] === G.PAVEMENT && !underBuilding(x, y) && !taken.has(`${x},${y}`)) free.push({ x, y });
      }
    }
    return Array.from({ length: NPC_COUNT }, (_, i) => {
      const spot = free[Math.floor(rng() * free.length)];
      const npc = new Npc(this, (spot.x + 0.5) * TILE, (spot.y + 1) * TILE - 2, npcLookKey(i), NPC_LINES[i % NPC_LINES.length]);
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
