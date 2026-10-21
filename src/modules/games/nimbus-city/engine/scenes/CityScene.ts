import Phaser from 'phaser';
import { seededRandom } from '../art/canvas';
import { npcLookKey } from '../art/characters';
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
  REGISTRY,
  TILE,
  WORLD_H,
  WORLD_W,
} from '../../config';
import { Npc } from '../entities/Npc';
import { Walker } from '../entities/Walker';
import { renderBuildings, renderGround, renderProps, renderRoadMarkings, type Door } from '../render/cityRenderer';
import { BUILDINGS, buildCityGround, buildingTop, doorTile, streetProps, type GroundGrid } from '../../world/cityMap';
import { G } from '../../world/tileTypes';

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
    const cityGround = buildCityGround();
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);

    const solids = this.physics.add.staticGroup();
    const addSolid = (cx: number, cy: number, w: number, h: number) => solids.add(this.add.zone(cx, cy, w, h));

    const ground = renderGround(this, cityGround);
    renderRoadMarkings(this, cityGround);
    for (const door of renderBuildings(this, ground, addSolid)) this.addDoor(door);
    renderProps(this, cityGround, addSolid);

    const academy = doorTile(BUILDINGS.find((b) => b.id === 'academy')!);
    const spawnX = (academy.x + 0.5) * TILE;
    const spawnY = (academy.y + 1) * TILE - 2;
    this.player = new Walker(this, spawnX, spawnY, this.registry.get(REGISTRY.playerKey) ?? 'player-man');
    this.nameTag = this.createNameTag(this.registry.get(REGISTRY.playerName));
    this.spawnNpcs(cityGround, seededRandom(2024));

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

  private addDoor({ building, x, y }: Door) {
    this.interactables.push({
      x,
      y,
      prompt: `[E] Entrar a ${building.name}`,
      open: () => ({
        title: building.name,
        text: DOOR_TEXT[building.id] ?? 'Misión en construcción. Muy pronto podrás ayudar a este cliente con su problema en la nube.',
      }),
    });
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

  /** Citizens start on free pavement: not under a building and not on a prop. */
  private spawnNpcs(ground: GroundGrid, rng: () => number) {
    const taken = new Set(streetProps(ground).map((p) => `${p.x},${p.y}`));
    const underBuilding = (x: number, y: number) =>
      BUILDINGS.some((b) => x >= b.x && x < b.x + b.w && y >= buildingTop(b) && y <= b.bottom);
    const free: { x: number; y: number }[] = [];
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        if (ground[y][x] === G.PAVEMENT && !underBuilding(x, y) && !taken.has(`${x},${y}`)) free.push({ x, y });
      }
    }
    for (let i = 0; i < NPC_COUNT; i++) {
      const spot = free[Math.floor(rng() * free.length)];
      const npc = new Npc(this, (spot.x + 0.5) * TILE, (spot.y + 1) * TILE - 2, npcLookKey(i), NPC_LINES[i % NPC_LINES.length]);
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
    this.nameTag.setPosition(Math.round(this.player.x), Math.round(this.player.y) - 18);

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
