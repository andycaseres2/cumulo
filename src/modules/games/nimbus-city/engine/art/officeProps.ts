/**
 * Office furniture drawn in code with colors taken from the Kenney RPG Urban Pack palette
 * (dark grey outline, warm woods, sky-blue screens) so it blends with the CC0 tiles.
 */
import Phaser from 'phaser';
import { createCanvas } from './canvas';

const C = {
  outline: '#3a3a40',
  woodTop: '#dc8652',
  wood: '#c77b47',
  woodDark: '#a9673b',
  woodDeep: '#874d27',
  metalLight: '#c5c5b9',
  metal: '#9ea3ac',
  metalDark: '#71717b',
  metalDeep: '#545a6e',
  screen: '#59b6d8',
  screenLight: '#daeef7',
  screenDark: '#3f4488',
  fabric: '#576cb6',
  fabricDark: '#3f4488',
  sofa: '#ae5242',
  sofaDark: '#793445',
  white: '#f4f7ee',
  paper: '#ffffff',
  water: '#64c0e1',
  waterLight: '#cde5f2',
  books: ['#dc615d', '#44b58a', '#f5aa57', '#6b86d4', '#c2522d'],
  mat: '#965652',
  matLight: '#b4734a',
  wallTop: '#5c586c',
  wallEdge: '#7a77a4',
};

type Ctx = CanvasRenderingContext2D;

function box(ctx: Ctx, x: number, y: number, w: number, h: number, fill: string) {
  ctx.fillStyle = C.outline;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = fill;
  ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
}

function rect(ctx: Ctx, x: number, y: number, w: number, h: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
}

/** Two-tile desk seen from the front, with a monitor, keyboard and some papers. */
function desk(ctx: Ctx) {
  // desk top and front panel (canvas 32x22: the monitor rises above the desk)
  box(ctx, 0, 8, 32, 9, C.woodTop);
  rect(ctx, 1, 15, 30, 1, C.wood);
  box(ctx, 0, 16, 32, 6, C.woodDark);
  box(ctx, 2, 17, 10, 4, C.wood);
  rect(ctx, 6, 19, 2, 1, C.metalLight);
  // monitor
  box(ctx, 9, 0, 14, 10, C.metalDeep);
  rect(ctx, 10, 1, 12, 8, C.screen);
  rect(ctx, 11, 2, 4, 2, C.screenLight);
  rect(ctx, 15, 10, 2, 2, C.metalDark);
  // keyboard and papers
  box(ctx, 11, 12, 10, 3, C.metalLight);
  box(ctx, 24, 10, 6, 4, C.paper);
  rect(ctx, 25, 11, 4, 1, C.metal);
}

function officeChair(ctx: Ctx) {
  rect(ctx, 7, 12, 2, 3, C.metalDeep);
  box(ctx, 3, 14, 10, 2, C.metalDark);
  box(ctx, 2, 7, 12, 6, C.fabric);
  box(ctx, 3, 1, 10, 7, C.fabricDark);
  rect(ctx, 4, 2, 8, 1, C.fabric);
}

/** Four-by-two meeting table with laptops and coffee cups. */
function meetingTable(ctx: Ctx) {
  box(ctx, 2, 4, 60, 22, C.woodTop);
  rect(ctx, 3, 24, 58, 1, C.wood);
  box(ctx, 2, 25, 60, 5, C.woodDark);
  for (const x of [10, 28, 46]) {
    box(ctx, x, 9, 9, 6, C.metalDark);
    rect(ctx, x + 1, 10, 7, 4, C.screen);
  }
  for (const x of [22, 40]) box(ctx, x, 18, 4, 4, C.white);
}

function counter(ctx: Ctx) {
  box(ctx, 0, 2, 64, 8, C.white);
  box(ctx, 0, 9, 64, 9, C.wood);
  for (let x = 6; x < 64; x += 14) rect(ctx, x, 11, 8, 5, C.woodDark);
  box(ctx, 26, 0, 10, 5, C.metalDeep);
  rect(ctx, 27, 1, 8, 3, C.screen);
}

/** Bookshelf against the wall: as wide as `tiles`, slightly taller than a tile. */
function shelf(ctx: Ctx, tiles: number) {
  const w = tiles * 16;
  box(ctx, 0, 0, w, 22, C.woodDeep);
  for (const y of [2, 9, 16]) {
    rect(ctx, 1, y + 5, w - 2, 1, C.wood);
    let x = 2;
    let i = y;
    while (x < w - 3) {
      const width = 2 + (i % 2);
      rect(ctx, x, y, width, 5, C.books[i % C.books.length]);
      x += width + 1;
      i += 3;
    }
  }
}

function printer(ctx: Ctx) {
  box(ctx, 1, 4, 14, 11, C.metalLight);
  rect(ctx, 2, 5, 12, 2, C.white);
  box(ctx, 4, 1, 8, 4, C.paper);
  rect(ctx, 3, 10, 10, 2, C.metalDark);
  rect(ctx, 11, 7, 2, 1, '#44b58a');
}

function cooler(ctx: Ctx) {
  box(ctx, 3, 0, 10, 10, C.water);
  rect(ctx, 5, 2, 2, 6, C.waterLight);
  box(ctx, 2, 9, 12, 14, C.white);
  rect(ctx, 5, 13, 2, 2, '#dc615d');
  rect(ctx, 9, 13, 2, 2, C.water);
  rect(ctx, 4, 18, 8, 1, C.metal);
}

function sofa(ctx: Ctx) {
  box(ctx, 0, 0, 32, 8, C.sofaDark);
  box(ctx, 0, 6, 32, 9, C.sofa);
  box(ctx, 0, 4, 5, 12, C.sofaDark);
  box(ctx, 27, 4, 5, 12, C.sofaDark);
  rect(ctx, 15, 8, 2, 6, C.sofaDark);
}

/** Top of a side or bottom wall seen from above. */
function wallCap(ctx: Ctx) {
  rect(ctx, 0, 0, 16, 16, C.wallTop);
  rect(ctx, 0, 0, 16, 2, C.wallEdge);
  rect(ctx, 0, 14, 16, 2, C.outline);
}

function doormat(ctx: Ctx) {
  box(ctx, 1, 3, 14, 10, C.mat);
  for (let x = 3; x < 13; x += 3) rect(ctx, x, 5, 1, 6, C.matLight);
}

/** Speech bubble with three dots, shown over people who are typing. */
function typingBubble(ctx: Ctx) {
  box(ctx, 0, 0, 11, 7, C.white);
  rect(ctx, 3, 7, 2, 1, C.outline);
  for (const x of [2, 5, 8]) rect(ctx, x, 3, 1, 1, C.outline);
}

export const OFFICE_TEXTURES = {
  desk: 'office-desk',
  chair: 'office-chair',
  meeting: 'office-meeting',
  counter: 'office-counter',
  shelf2: 'office-shelf-2',
  shelf3: 'office-shelf-3',
  printer: 'office-printer',
  cooler: 'office-cooler',
  sofa: 'office-sofa',
  wallCap: 'office-wall-cap',
  doormat: 'office-doormat',
  typing: 'office-typing',
} as const;

const DRAWINGS: [string, number, number, (ctx: Ctx) => void][] = [
  [OFFICE_TEXTURES.desk, 32, 22, desk],
  [OFFICE_TEXTURES.chair, 16, 16, officeChair],
  [OFFICE_TEXTURES.meeting, 64, 30, meetingTable],
  [OFFICE_TEXTURES.counter, 64, 18, counter],
  [OFFICE_TEXTURES.shelf2, 32, 22, (ctx) => shelf(ctx, 2)],
  [OFFICE_TEXTURES.shelf3, 48, 22, (ctx) => shelf(ctx, 3)],
  [OFFICE_TEXTURES.printer, 16, 16, printer],
  [OFFICE_TEXTURES.cooler, 16, 23, cooler],
  [OFFICE_TEXTURES.sofa, 32, 16, sofa],
  [OFFICE_TEXTURES.wallCap, 16, 16, wallCap],
  [OFFICE_TEXTURES.doormat, 16, 16, doormat],
  [OFFICE_TEXTURES.typing, 11, 8, typingBubble],
];

export function createOfficeProps(scene: Phaser.Scene) {
  for (const [key, w, h, draw] of DRAWINGS) {
    const canvas = createCanvas(w, h);
    draw(canvas.getContext('2d')!);
    scene.textures.addCanvas(key, canvas);
  }
}
