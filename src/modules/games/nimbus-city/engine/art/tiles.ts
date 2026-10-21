import Phaser from 'phaser';
import { TILE } from '../../config';
import { T, TILE_COUNT } from '../../world/tileTypes';
import { createCanvas, painter, seededRandom, type Painter } from './canvas';

type Rng = () => number;

const ASPHALT = '#4a4e57';
const LINE = '#f2d45c';
const ZEBRA = '#e9e9e4';
const FLOWERS: [number, number, string][] = [
  [3, 4, '#ffd166'],
  [11, 3, '#ef476f'],
  [7, 10, '#ffffff'],
  [12, 12, '#ffd166'],
  [2, 12, '#ef476f'],
];

function speckle(p: Painter, rng: Rng, count: number, color: string) {
  for (let i = 0; i < count; i++) p.px(Math.floor(rng() * TILE), Math.floor(rng() * TILE), color);
}

function grass(p: Painter, rng: Rng) {
  p.rect(0, 0, TILE, TILE, '#5fae4f');
  speckle(p, rng, 18, '#4e9a43');
  speckle(p, rng, 8, '#74c060');
}

function asphalt(p: Painter, rng: Rng) {
  p.rect(0, 0, TILE, TILE, ASPHALT);
  speckle(p, rng, 10, '#555a64');
  speckle(p, rng, 8, '#41454d');
}

function dashH(p: Painter, y: number) {
  p.rect(2, y, 5, 1, LINE);
  p.rect(10, y, 5, 1, LINE);
}

function dashV(p: Painter, x: number) {
  p.rect(x, 2, 1, 5, LINE);
  p.rect(x, 10, 1, 5, LINE);
}

const DRAWERS: Record<number, (p: Painter, rng: Rng) => void> = {
  [T.GRASS]: grass,
  [T.FLOWERS]: (p, rng) => {
    grass(p, rng);
    for (const [x, y, color] of FLOWERS) {
      p.px(x, y, color);
      p.px(x + 1, y, color);
      p.px(x, y + 1, color);
    }
  },
  [T.ROAD]: asphalt,
  [T.ROAD_H_TOP]: (p, rng) => {
    asphalt(p, rng);
    dashH(p, TILE - 1);
  },
  [T.ROAD_H_BOTTOM]: (p, rng) => {
    asphalt(p, rng);
    dashH(p, 0);
  },
  [T.ROAD_V_LEFT]: (p, rng) => {
    asphalt(p, rng);
    dashV(p, TILE - 1);
  },
  [T.ROAD_V_RIGHT]: (p, rng) => {
    asphalt(p, rng);
    dashV(p, 0);
  },
  [T.SIDEWALK]: (p, rng) => {
    p.rect(0, 0, TILE, TILE, '#c9c3b6');
    speckle(p, rng, 6, '#d6d1c6');
    for (const v of [0, 8]) {
      p.rect(0, v, TILE, 1, '#b5ae9f');
      p.rect(v, 0, 1, TILE, '#b5ae9f');
    }
  },
  [T.CROSS_H]: (p, rng) => {
    asphalt(p, rng);
    for (const y of [1, 6, 11]) p.rect(2, y, 12, 3, ZEBRA);
  },
  [T.CROSS_V]: (p, rng) => {
    asphalt(p, rng);
    for (const x of [1, 6, 11]) p.rect(x, 2, 3, 12, ZEBRA);
  },
  [T.PLAZA]: (p) => {
    p.rect(0, 0, TILE, TILE, '#d9b98a');
    for (let y = 0; y < TILE; y += 4) {
      p.rect(0, y, TILE, 1, '#c09e6e');
      for (let x = (y / 4) % 2 ? 4 : 0; x < TILE; x += 8) p.rect(x, y, 1, 4, '#c09e6e');
    }
  },
  [T.WATER]: (p, rng) => {
    p.rect(0, 0, TILE, TILE, '#3d8fd6');
    speckle(p, rng, 6, '#3480c4');
    p.rect(2, 3, 3, 1, '#7cc0f2');
    p.rect(9, 7, 4, 1, '#7cc0f2');
    p.rect(4, 12, 3, 1, '#7cc0f2');
  },
};

export function generateTileset(scene: Phaser.Scene) {
  const canvas = createCanvas(TILE * TILE_COUNT, TILE);
  const rng = seededRandom(7);
  for (let i = 0; i < TILE_COUNT; i++) DRAWERS[i](painter(canvas, i * TILE, 0), rng);
  scene.textures.addCanvas('tiles', canvas);
}
