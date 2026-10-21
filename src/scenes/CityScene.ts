import Phaser from 'phaser';
import { seededRandom } from '../art/canvas';
import { buildingLayout } from '../art/props';
import {
  EVENTS,
  FONT,
  INTERACT_RANGE,
  MAP_H,
  MAP_W,
  minimapRect,
  NPC_COUNT,
  pickZoom,
  PLAYER_RUN_SPEED,
  PLAYER_SPEED,
  TILE,
  WORLD_H,
  WORLD_W,
} from '../config';
import { Npc } from '../entities/Npc';
import { getPlayerName } from '../session';
import { Walker } from '../entities/Walker';
import {
  BENCH_SPOTS,
  BUILDINGS,
  buildCityTiles,
  buildingTop,
  lampSpots,
  treeSpots,
  type BuildingDef,
  type TileGrid,
} from '../world/cityMap';
import { T } from '../world/tileTypes';

export interface DialogContent {
  title: string;
  text: string;
}

interface Interactable {
  x: number;
  y: number;
  prompt: string;
  open: () => DialogContent;
  close?: () => void;
}

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

const DOOR_TEXT: Record<string, string> = {
  academy: 'Bienvenido a la Cloud Academy. Aquí empezará tu formación como consultor cloud. Muy pronto: tu primera clase.',
};

export class CityScene extends Phaser.Scene {
  private player!: Walker;
  private npcs: Npc[] = [];
  private interactables: Interactable[] = [];
  private keys!: Record<'up' | 'down' | 'left' | 'right' | 'w' | 'a' | 's' | 'd' | 'shift' | 'e' | 'space', Phaser.Input.Keyboard.Key>;
  private minimap!: Phaser.Cameras.Scene2D.Camera;
  private marker!: Phaser.GameObjects.Arc;
  private nameTag!: Phaser.GameObjects.Container;
  private lastPrompt: string | null = null;
  private active: Interactable | null = null;
  /** Set by the HUD interaction button; consumed on the next update like a key press. */
  private interactRequested = false;

  constructor() {
    super('city');
  }

  create() {
    const rng = seededRandom(2024);
    const tiles = buildCityTiles(rng);
    const map = this.make.tilemap({ data: tiles, tileWidth: TILE, tileHeight: TILE });
    const ground = map.createLayer(0, map.addTilesetImage('tiles')!, 0, 0)!;
    ground.setCollision([T.WATER]);
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);

    const solids = this.physics.add.staticGroup();
    const addSolid = (cx: number, cy: number, w: number, h: number) => solids.add(this.add.zone(cx, cy, w, h));

    for (const def of BUILDINGS) this.placeBuilding(def, addSolid);
    this.placeProps(tiles, rng, addSolid);

    const academy = BUILDINGS.find((b) => b.id === 'academy')!;
    const spawnX = (academy.x + academy.w / 2) * TILE;
    const spawnY = (academy.bottom + 2) * TILE - 2;
    this.player = new Walker(this, spawnX, spawnY, this.registry.get('playerKey') ?? 'player-man');
    this.nameTag = this.createNameTag(getPlayerName());
    this.spawnNpcs(tiles, rng);

    const npcGroup = this.add.group(this.npcs, { runChildUpdate: true });
    for (const obstacle of [solids, ground]) {
      this.physics.add.collider(this.player, obstacle);
      this.physics.add.collider(npcGroup, obstacle);
    }
    this.physics.add.collider(this.player, npcGroup);

    this.setupCameras();
    this.setupInput();
    this.scene.launch('hud');
    const requestInteract = () => (this.interactRequested = true);
    this.game.events.on(EVENTS.dialogClose, this.closeDialog, this);
    this.game.events.on(EVENTS.interact, requestInteract);
    this.events.once('shutdown', () => {
      this.game.events.off(EVENTS.dialogClose, this.closeDialog, this);
      this.game.events.off(EVENTS.interact, requestInteract);
    });
  }

  private placeBuilding(def: BuildingDef, addSolid: (cx: number, cy: number, w: number, h: number) => void) {
    const layout = buildingLayout(def);
    const left = def.x * TILE;
    const top = buildingTop(def) * TILE;
    const depth = (def.bottom + 1) * TILE;
    this.add.image(left, top, `building-${def.id}`).setOrigin(0, 0).setDepth(depth);
    this.add
      .text(left + layout.sign.x + layout.sign.w / 2, top + layout.sign.y + layout.sign.h / 2, def.name, {
        fontFamily: FONT,
        fontSize: '4px',
        color: '#2b2118',
        resolution: 4,
      })
      .setOrigin(0.5)
      .setDepth(depth + 0.5)
      .texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    addSolid(left + layout.width / 2, top + layout.height / 2, layout.width, layout.height);

    this.interactables.push({
      x: left + layout.width / 2,
      y: (def.bottom + 1) * TILE + 6,
      prompt: `[E] Entrar a ${def.name}`,
      open: () => ({
        title: def.name,
        text: DOOR_TEXT[def.id] ?? 'Misión en construcción. Muy pronto podrás ayudar a este cliente con su problema en la nube.',
      }),
    });
  }

  private placeProps(tiles: TileGrid, rng: () => number, addSolid: (cx: number, cy: number, w: number, h: number) => void) {
    const benchTiles = new Set(BENCH_SPOTS.map((b) => `${b.x},${b.y}`));
    for (const spot of treeSpots(tiles, rng)) {
      if ([-1, 0, 1].some((d) => benchTiles.has(`${spot.x + d},${spot.y}`))) continue;
      const x = spot.x * TILE + TILE / 2;
      const y = spot.y * TILE + TILE - 1;
      this.add.image(x, y, 'tree').setOrigin(0.5, 1).setDepth(y);
      addSolid(x, y - 3, 6, 5);
    }
    for (const spot of lampSpots()) {
      const x = spot.x * TILE + TILE / 2;
      const y = spot.y * TILE + 6;
      this.add.image(x, y, 'lamp').setOrigin(0.5, 1).setDepth(y);
    }
    for (const spot of BENCH_SPOTS) {
      const x = spot.x * TILE + TILE / 2;
      const y = spot.y * TILE + TILE - 2;
      this.add.image(x, y, 'bench').setOrigin(0.5, 1).setDepth(y);
      addSolid(x, y - 4, 16, 6);
    }
  }

  /** Name label with a pointer arrow, drawn above every other world object. */
  private createNameTag(name: string): Phaser.GameObjects.Container {
    const label = this.add
      .text(0, 0, name, {
        fontFamily: FONT,
        fontSize: '5px',
        color: '#1b1b2a',
        backgroundColor: '#ffd166',
        padding: { x: 2, y: 1.5 },
        resolution: 4,
      })
      .setOrigin(0.5, 1);
    label.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    const arrow = this.add.triangle(0, 0, 0, 0, 5, 0, 2.5, 3, 0xffd166).setOrigin(0.5, 0);
    label.setY(-1);
    return this.add.container(0, 0, [label, arrow]).setDepth(9_000);
  }

  private spawnNpcs(tiles: TileGrid, rng: () => number) {
    const sidewalks: { x: number; y: number }[] = [];
    for (let y = 0; y < MAP_H; y++) for (let x = 0; x < MAP_W; x++) if (tiles[y][x] === T.SIDEWALK) sidewalks.push({ x, y });
    for (let i = 0; i < NPC_COUNT; i++) {
      const spot = sidewalks[Math.floor(rng() * sidewalks.length)];
      const npc = new Npc(this, spot.x * TILE + TILE / 2, spot.y * TILE + TILE - 2, `npc-${i}`, NPC_LINES[i % NPC_LINES.length]);
      this.npcs.push(npc);
      this.interactables.push({
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
          return { title: 'Vecino', text: npc.line };
        },
        close: () => {
          npc.frozen = false;
        },
      });
    }
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

  private setupInput() {
    const K = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard!.addKeys({
      up: K.UP,
      down: K.DOWN,
      left: K.LEFT,
      right: K.RIGHT,
      w: K.W,
      a: K.A,
      s: K.S,
      d: K.D,
      shift: K.SHIFT,
      e: K.E,
      space: K.SPACE,
    }) as CityScene['keys'];
  }

  update() {
    const k = this.keys;
    this.marker.setPosition(this.player.x, this.player.y - 8);
    this.nameTag.setPosition(Math.round(this.player.x), Math.round(this.player.y) - 27);

    const interact =
      Phaser.Input.Keyboard.JustDown(k.e) || Phaser.Input.Keyboard.JustDown(k.space) || this.interactRequested;
    this.interactRequested = false;
    if (this.active) {
      this.player.move(0, 0);
      if (interact) this.closeDialog();
      return;
    }

    let vx = (k.right.isDown || k.d.isDown ? 1 : 0) - (k.left.isDown || k.a.isDown ? 1 : 0);
    let vy = (k.down.isDown || k.s.isDown ? 1 : 0) - (k.up.isDown || k.w.isDown ? 1 : 0);
    const running = k.shift.isDown;
    const speed = running ? PLAYER_RUN_SPEED : PLAYER_SPEED;
    if (vx !== 0 && vy !== 0) {
      vx *= Math.SQRT1_2;
      vy *= Math.SQRT1_2;
    }
    this.player.move(vx * speed, vy * speed);
    this.player.anims.timeScale = running ? 1.6 : 1;

    const target = this.nearestInteractable();
    this.setPrompt(target?.prompt ?? null);
    if (target && interact) {
      this.active = target;
      this.setPrompt(null);
      this.game.events.emit(EVENTS.dialog, target.open());
    }
  }

  private nearestInteractable(): Interactable | null {
    let best: Interactable | null = null;
    let bestDistance = INTERACT_RANGE;
    for (const item of this.interactables) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y);
      if (distance < bestDistance) {
        best = item;
        bestDistance = distance;
      }
    }
    return best;
  }

  private setPrompt(text: string | null) {
    if (text === this.lastPrompt) return;
    this.lastPrompt = text;
    this.game.events.emit(EVENTS.prompt, text);
  }

  private closeDialog() {
    if (!this.active) return;
    this.active.close?.();
    this.active = null;
    this.game.events.emit(EVENTS.dialog, null);
  }
}
