import Phaser from 'phaser';
import { TILE } from '../../config';
import type { BuildingDef } from '../../world/cityMap';
import { createCanvas, hashString, outline, painter, seededRandom, shade, type Painter } from './canvas';

export function buildingLayout(def: BuildingDef) {
  const width = def.w * TILE;
  const height = def.h * TILE;
  const roofH = Math.round(height * 0.36);
  const signW = Math.min(width - 8, def.name.length * 4 + 10);
  return {
    width,
    height,
    roofH,
    sign: { x: Math.round((width - signW) / 2), y: roofH + 3, w: signW, h: 9 },
    door: { x: Math.round(width / 2) - 6, y: height - 17, w: 12, h: 17 },
  };
}

function drawWindow(p: Painter, x: number, y: number, lit: boolean, wall: string) {
  const glass = lit ? '#ffe9a8' : '#8ecae6';
  p.rect(x, y, 8, 9, '#2f3542');
  p.rect(x + 1, y + 1, 6, 7, glass);
  p.rect(x + 1, y + 1, 6, 1, shade(glass, 0.4));
  p.px(x + 2, y + 3, '#f1faff');
  p.rect(x - 1, y + 9, 10, 1, shade(wall, -0.3));
}

function drawBuilding(def: BuildingDef): HTMLCanvasElement {
  const L = buildingLayout(def);
  const canvas = createCanvas(L.width, L.height);
  const p = painter(canvas);
  const rng = seededRandom(hashString(def.id));

  // Facade
  p.rect(0, L.roofH, L.width, L.height - L.roofH, def.wall);
  p.rect(0, L.roofH, L.width, 2, shade(def.wall, -0.25));
  p.rect(0, L.height - 3, L.width, 3, shade(def.wall, -0.3));
  p.rect(0, L.roofH, 1, L.height - L.roofH, shade(def.wall, -0.2));
  p.rect(L.width - 1, L.roofH, 1, L.height - L.roofH, shade(def.wall, -0.2));

  // Roof seen from above
  p.rect(0, 0, L.width, L.roofH, def.roof);
  for (let y = 3; y < L.roofH - 2; y += 4) p.rect(1, y, L.width - 2, 1, shade(def.roof, -0.12));
  p.rect(0, 0, L.width, 1, shade(def.roof, 0.25));
  p.rect(0, L.roofH - 2, L.width, 2, shade(def.roof, -0.35));
  p.rect(0, 0, 1, L.roofH, shade(def.roof, -0.2));
  p.rect(L.width - 1, 0, 1, L.roofH, shade(def.roof, -0.2));
  if (def.style === 'office') {
    p.rect(6, 4, 9, 6, '#9aa3ad');
    p.rect(6, 4, 9, 1, '#c3cad1');
    p.rect(L.width - 16, 5, 10, 5, '#9aa3ad');
    p.rect(L.width - 16, 5, 10, 1, '#c3cad1');
  }

  // Windows, leaving room around the door
  const { door, sign } = L;
  for (let y = sign.y + sign.h + 4; y + 10 <= L.height - 4; y += 14) {
    for (let x = 5; x + 8 <= L.width - 5; x += 13) {
      const overlapsDoor = x + 8 > door.x - 3 && x < door.x + door.w + 3 && y + 10 > door.y - 2;
      if (!overlapsDoor) drawWindow(p, x, y, rng() < 0.35, def.wall);
    }
  }

  if (def.style === 'shop') {
    const awningY = door.y - 7;
    for (let x = 3; x < L.width - 3; x += 4) {
      p.rect(x, awningY, 4, 5, (x / 4) % 2 ? '#fff7ee' : def.roof);
      p.px(x + 1, awningY + 5, (x / 4) % 2 ? '#fff7ee' : def.roof);
    }
  }

  // Door and step
  p.rect(door.x, door.y, door.w, door.h, '#2f2a2a');
  p.rect(door.x + 1, door.y + 1, door.w - 2, door.h - 1, shade(def.roof, -0.25));
  p.rect(door.x + 3, door.y + 3, 6, 6, '#8ecae6');
  p.px(door.x + 9, door.y + 10, '#ffd166');
  p.rect(door.x - 2, L.height - 2, door.w + 4, 2, '#9b9b9b');

  // Sign board; the text is drawn by the scene
  p.rect(sign.x, sign.y, sign.w, sign.h, '#2f2a2a');
  p.rect(sign.x + 1, sign.y + 1, sign.w - 2, sign.h - 2, '#fff6e5');
  return canvas;
}

function drawTree(): HTMLCanvasElement {
  const canvas = createCanvas(16, 22);
  const p = painter(canvas);
  p.rect(6, 13, 4, 8, '#7a5230');
  p.rect(6, 13, 1, 8, '#5d3d22');
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 16; x++) {
      const dx = x - 7.5;
      const dy = y - 7;
      if (dx * dx + dy * dy > 56) continue;
      const light = dx + dy;
      p.px(x, y, light < -6 ? '#7fd36b' : light < 3 ? '#4fae4a' : '#3a8a3c');
    }
  }
  outline(canvas, 0, 0, 16, 22);
  return canvas;
}

function drawLamp(): HTMLCanvasElement {
  const canvas = createCanvas(8, 24);
  const p = painter(canvas);
  p.rect(3, 6, 2, 16, '#3a3f4b');
  p.rect(1, 1, 6, 5, '#3a3f4b');
  p.rect(2, 2, 4, 3, '#ffe8a3');
  p.rect(2, 21, 4, 2, '#2a2e37');
  outline(canvas, 0, 0, 8, 24);
  return canvas;
}

function drawBench(): HTMLCanvasElement {
  const canvas = createCanvas(18, 12);
  const p = painter(canvas);
  p.rect(2, 7, 2, 4, '#3a3f4b');
  p.rect(14, 7, 2, 4, '#3a3f4b');
  p.rect(1, 5, 16, 3, '#a0693a');
  p.rect(1, 1, 16, 3, '#8a5a30');
  p.rect(1, 2, 16, 1, '#b57b45');
  outline(canvas, 0, 0, 18, 12);
  return canvas;
}

export function generateProps(scene: Phaser.Scene, buildings: BuildingDef[]) {
  scene.textures.addCanvas('tree', drawTree());
  scene.textures.addCanvas('lamp', drawLamp());
  scene.textures.addCanvas('bench', drawBench());
  for (const def of buildings) scene.textures.addCanvas(`building-${def.id}`, drawBuilding(def));
}
