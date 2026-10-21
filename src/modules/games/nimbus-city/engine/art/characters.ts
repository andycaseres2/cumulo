import Phaser from 'phaser';
import { createCanvas, outline, painter, shade, type Painter } from './canvas';

export const FRAME_W = 16;
export const FRAME_H = 24;
export const DIRECTIONS = ['down', 'left', 'right', 'up'] as const;
export type Direction = (typeof DIRECTIONS)[number];

export interface Look {
  skin: string;
  hair: string;
  longHair: boolean;
  shirt: string;
  legs: string;
  shoes: string;
  /** When set, the character wears a skirt of this color instead of trousers. */
  skirt?: string;
}

export const PLAYER_LOOKS: Record<'player-man' | 'player-woman', Look> = {
  'player-man': { skin: '#e0ac83', hair: '#2b1d14', longHair: false, shirt: '#2a9d8f', legs: '#2d3047', shoes: '#3b2a20' },
  'player-woman': {
    skin: '#e0ac83',
    hair: '#5a2e1c',
    longHair: true,
    shirt: '#7b5ea7',
    legs: '#2d3047',
    skirt: '#2d3047',
    shoes: '#3b2a20',
  },
};

const EYE = '#1b1b2a';
const SKINS = ['#f2c7a5', '#e0ac83', '#c68b59', '#a86b45', '#7a4a2c'];
const HAIRS = ['#1a1a1a', '#2b1d14', '#5a3825', '#8f2d1f', '#d8b05a', '#9a9a9a'];
const SHIRTS = ['#e63946', '#457b9d', '#f4a261', '#2a9d8f', '#ffb703', '#8338ec', '#06d6a0', '#ef476f', '#3a86ff'];
const LEGS = ['#2d3047', '#3d405b', '#6b4f3a', '#264653', '#495057'];

export function randomLook(rng: () => number): Look {
  const pick = <T,>(list: T[]) => list[Math.floor(rng() * list.length)];
  const female = rng() < 0.5;
  const legs = pick(LEGS);
  return {
    skin: pick(SKINS),
    hair: pick(HAIRS),
    longHair: female,
    shirt: pick(SHIRTS),
    legs,
    shoes: '#3b2a20',
    skirt: female && rng() < 0.6 ? pick(SHIRTS) : undefined,
  };
}

/** Frame 0 stands still; frames 1 and 2 are opposite walking steps. */
function drawFront(p: Painter, l: Look, frame: number, back: boolean) {
  const legColor = l.skirt ? l.skin : l.legs;
  const liftLeft = frame === 2 ? 1 : 0;
  const liftRight = frame === 1 ? 1 : 0;
  p.rect(5, 16, 3, 5 - liftLeft, legColor);
  p.rect(5, 21 - liftLeft, 3, 2, l.shoes);
  p.rect(8, 16, 3, 5 - liftRight, legColor);
  p.rect(8, 21 - liftRight, 3, 2, l.shoes);

  p.rect(4, 10, 8, 6, l.shirt);
  if (l.skirt) p.rect(4, 15, 8, 3, l.skirt);
  else p.rect(4, 15, 8, 1, shade(l.legs, -0.3));

  const swingLeft = frame === 1 ? 1 : 0;
  const swingRight = frame === 2 ? 1 : 0;
  const sleeve = shade(l.shirt, -0.15);
  p.rect(3, 11, 1, 4 + swingLeft, sleeve);
  p.px(3, 15 + swingLeft, l.skin);
  p.rect(12, 11, 1, 4 + swingRight, sleeve);
  p.px(12, 15 + swingRight, l.skin);

  p.rect(7, 9, 2, 1, l.skin);
  p.rect(4, 2, 8, 7, l.skin);
  if (back) {
    p.rect(4, 1, 8, 7, l.hair);
    if (l.longHair) p.rect(4, 8, 8, 4, l.hair);
    return;
  }
  p.rect(4, 1, 8, 3, l.hair);
  p.px(4, 4, l.hair);
  p.px(11, 4, l.hair);
  if (l.longHair) {
    p.rect(3, 2, 1, 10, l.hair);
    p.rect(12, 2, 1, 10, l.hair);
  }
  p.px(6, 6, EYE);
  p.px(9, 6, EYE);
  p.rect(7, 8, 2, 1, shade(l.skin, -0.25));
}

/** Profile facing left; the right-facing frames are mirrored copies. */
function drawSide(p: Painter, l: Look, frame: number) {
  const legColor = l.skirt ? l.skin : l.legs;
  const farLeg = shade(legColor, -0.15);
  const farShoe = shade(l.shoes, -0.2);
  if (frame === 0) {
    p.rect(6, 16, 3, 5, legColor);
    p.rect(5, 21, 4, 2, l.shoes);
  } else {
    const [near, far] = frame === 1 ? [4, 8] : [8, 4];
    p.rect(far, 16, 3, 5, farLeg);
    p.rect(far - 1, 21, 4, 2, farShoe);
    p.rect(near, 16, 3, 5, legColor);
    p.rect(near - 1, 21, 4, 2, l.shoes);
  }

  p.rect(5, 10, 6, 6, l.shirt);
  if (l.skirt) p.rect(4, 15, 8, 3, l.skirt);
  else p.rect(5, 15, 6, 1, shade(l.legs, -0.3));

  const armX = frame === 1 ? 5 : frame === 2 ? 9 : 7;
  p.rect(armX, 11, 2, 4, shade(l.shirt, -0.15));
  p.rect(armX, 15, 2, 1, l.skin);

  p.rect(7, 9, 2, 1, l.skin);
  p.rect(4, 2, 7, 7, l.skin);
  p.px(3, 6, l.skin);
  p.rect(4, 1, 7, 3, l.hair);
  p.rect(8, 4, 3, 3, l.hair);
  if (l.longHair) p.rect(9, 3, 3, 9, l.hair);
  p.px(5, 6, EYE);
  p.px(4, 8, shade(l.skin, -0.25));
}

function drawFrame(look: Look, dir: Direction, frame: number): HTMLCanvasElement {
  const canvas = createCanvas(FRAME_W, FRAME_H);
  const p = painter(canvas);
  if (dir === 'down' || dir === 'up') drawFront(p, look, frame, dir === 'up');
  else drawSide(p, look, frame);
  outline(canvas, 0, 0, FRAME_W, FRAME_H);
  return canvas;
}

export function frameName(dir: Direction, frame: number): string {
  return String(DIRECTIONS.indexOf(dir) * 3 + frame);
}

/** Builds a 3x4 walking spritesheet plus its walk animations. */
export function createCharacter(scene: Phaser.Scene, key: string, look: Look) {
  const sheet = createCanvas(FRAME_W * 3, FRAME_H * DIRECTIONS.length);
  const ctx = sheet.getContext('2d')!;
  DIRECTIONS.forEach((dir, row) => {
    for (let frame = 0; frame < 3; frame++) {
      const art = drawFrame(look, dir === 'right' ? 'left' : dir, frame);
      const x = frame * FRAME_W;
      const y = row * FRAME_H;
      if (dir === 'right') {
        ctx.save();
        ctx.translate(x + FRAME_W, y);
        ctx.scale(-1, 1);
        ctx.drawImage(art, 0, 0);
        ctx.restore();
      } else {
        ctx.drawImage(art, x, y);
      }
    }
  });

  const texture = scene.textures.addCanvas(key, sheet)!;
  DIRECTIONS.forEach((dir, row) => {
    for (let frame = 0; frame < 3; frame++) {
      texture.add(frameName(dir, frame), 0, frame * FRAME_W, row * FRAME_H, FRAME_W, FRAME_H);
    }
    scene.anims.create({
      key: `${key}-walk-${dir}`,
      frames: [1, 0, 2, 0].map((frame) => ({ key, frame: frameName(dir, frame) })),
      frameRate: 8,
      repeat: -1,
    });
  });
}
