import { MAP_H, MAP_W } from '../config';
import { T } from './tileTypes';

export const H_ROADS = [12, 28, 44];
export const V_ROADS = [16, 40];
export const PARK = { x: 19, y: 15, w: 20, h: 12 };

export interface BuildingDef {
  id: string;
  name: string;
  /** Left tile column. */
  x: number;
  /** Bottom tile row; the door opens onto the row below. */
  bottom: number;
  w: number;
  h: number;
  wall: string;
  roof: string;
  style: 'shop' | 'office';
}

/** Future mission clients. Each one maps to Cloud Practitioner topics. */
export const BUILDINGS: BuildingDef[] = [
  { id: 'bakery', name: 'Pastelería Dulce Nube', x: 2, bottom: 10, w: 9, h: 7, wall: '#f6c1cc', roof: '#c2546f', style: 'shop' },
  { id: 'bank', name: 'Banco Andino', x: 20, bottom: 10, w: 9, h: 8, wall: '#cfd8e3', roof: '#3d5a80', style: 'office' },
  { id: 'cafe', name: 'Café Byte', x: 31, bottom: 10, w: 7, h: 6, wall: '#e9d8a6', roof: '#7f5539', style: 'shop' },
  { id: 'clinic', name: 'Clínica Vida', x: 44, bottom: 10, w: 9, h: 8, wall: '#f1f1ee', roof: '#d62828', style: 'office' },
  { id: 'hotel', name: 'Hotel Mirador', x: 55, bottom: 10, w: 8, h: 8, wall: '#ffd7a8', roof: '#9c6644', style: 'office' },
  { id: 'academy', name: 'Cloud Academy', x: 2, bottom: 26, w: 11, h: 8, wall: '#ffe8c2', roof: '#f77f00', style: 'office' },
  { id: 'startup', name: 'Startup Hub', x: 44, bottom: 26, w: 10, h: 8, wall: '#e0d4f5', roof: '#6a4c93', style: 'office' },
  { id: 'store', name: 'Tienda Andes', x: 56, bottom: 26, w: 7, h: 6, wall: '#cdeac0', roof: '#2d6a4f', style: 'shop' },
  { id: 'school', name: 'Escuela Digital', x: 2, bottom: 42, w: 10, h: 7, wall: '#fbe7a1', roof: '#bc6c25', style: 'office' },
  { id: 'streaming', name: 'StreamLlama', x: 20, bottom: 42, w: 9, h: 8, wall: '#d7e3fc', roof: '#22223b', style: 'office' },
  { id: 'delivery', name: 'Rapidito', x: 31, bottom: 42, w: 7, h: 6, wall: '#ffd6a5', roof: '#e85d04', style: 'shop' },
  { id: 'cityhall', name: 'Municipalidad', x: 44, bottom: 42, w: 10, h: 9, wall: '#e5e5e5', roof: '#6c757d', style: 'office' },
  { id: 'gym', name: 'FitCloud Gym', x: 56, bottom: 42, w: 7, h: 6, wall: '#caf0f8', roof: '#0077b6', style: 'shop' },
];

export function buildingTop(def: BuildingDef): number {
  return def.bottom - def.h + 1;
}

export type TileGrid = number[][];

export function buildCityTiles(rng: () => number): TileGrid {
  const tiles: TileGrid = Array.from({ length: MAP_H }, () => Array<number>(MAP_W).fill(T.GRASS));
  const set = (x: number, y: number, tile: number) => {
    if (x >= 0 && y >= 0 && x < MAP_W && y < MAP_H) tiles[y][x] = tile;
  };
  const isRoadRow = (y: number) => H_ROADS.some((r) => y === r || y === r + 1);
  const isRoadCol = (x: number) => V_ROADS.some((c) => x === c || x === c + 1);

  for (const r of H_ROADS) {
    for (let x = 0; x < MAP_W; x++) {
      set(x, r - 1, T.SIDEWALK);
      set(x, r + 2, T.SIDEWALK);
    }
  }
  for (const c of V_ROADS) {
    for (let y = 0; y < MAP_H; y++) {
      set(c - 1, y, T.SIDEWALK);
      set(c + 2, y, T.SIDEWALK);
    }
  }

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (isRoadRow(y) && isRoadCol(x)) set(x, y, T.ROAD);
      else if (isRoadRow(y)) set(x, y, H_ROADS.includes(y) ? T.ROAD_H_TOP : T.ROAD_H_BOTTOM);
      else if (isRoadCol(x)) set(x, y, V_ROADS.includes(x) ? T.ROAD_V_LEFT : T.ROAD_V_RIGHT);
    }
  }

  // Crosswalks on every side of every intersection.
  for (const r of H_ROADS) {
    for (const c of V_ROADS) {
      for (const d of [0, 1]) {
        set(c - 1, r + d, T.CROSS_H);
        set(c + 2, r + d, T.CROSS_H);
        set(c + d, r - 1, T.CROSS_V);
        set(c + d, r + 2, T.CROSS_V);
      }
    }
  }

  // Central park: two crossing paths, a plaza and a pond.
  for (let x = PARK.x; x < PARK.x + PARK.w; x++) for (const y of [20, 21]) set(x, y, T.PLAZA);
  for (let y = PARK.y; y < PARK.y + PARK.h; y++) for (const x of [28, 29]) set(x, y, T.PLAZA);
  for (let y = 18; y <= 23; y++) for (let x = 26; x <= 31; x++) set(x, y, T.PLAZA);
  for (let y = 16; y <= 18; y++) for (let x = 33; x <= 36; x++) set(x, y, T.WATER);

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (tiles[y][x] !== T.GRASS) continue;
      if (rng() < (inPark(x, y) ? 0.12 : 0.03)) tiles[y][x] = T.FLOWERS;
    }
  }
  return tiles;
}

export function inPark(x: number, y: number): boolean {
  return x >= PARK.x && x < PARK.x + PARK.w && y >= PARK.y && y < PARK.y + PARK.h;
}

function nearBuilding(x: number, y: number): boolean {
  return BUILDINGS.some((b) => x >= b.x - 1 && x <= b.x + b.w && y >= buildingTop(b) - 1 && y <= b.bottom + 1);
}

/** Grass tiles that get a tree, keeping paths and building fronts clear. */
export function treeSpots(tiles: TileGrid, rng: () => number): { x: number; y: number }[] {
  const isGreen = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < MAP_W && y < MAP_H && (tiles[y][x] === T.GRASS || tiles[y][x] === T.FLOWERS);
  const taken = new Set<string>();
  const spots: { x: number; y: number }[] = [];
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (!isGreen(x, y) || nearBuilding(x, y)) continue;
      if (!isGreen(x - 1, y) || !isGreen(x + 1, y) || !isGreen(x, y - 1) || !isGreen(x, y + 1)) continue;
      if (['-1,0', '0,-1', '-1,-1', '1,-1'].some((d) => {
        const [dx, dy] = d.split(',').map(Number);
        return taken.has(`${x + dx},${y + dy}`);
      })) continue;
      if (rng() < (inPark(x, y) ? 0.14 : 0.08)) {
        taken.add(`${x},${y}`);
        spots.push({ x, y });
      }
    }
  }
  return spots;
}

export function lampSpots(): { x: number; y: number }[] {
  const doors = new Set(BUILDINGS.map((b) => `${b.x + Math.floor(b.w / 2)},${b.bottom + 1}`));
  const spots: { x: number; y: number }[] = [];
  for (const r of H_ROADS) {
    for (let x = 3; x < MAP_W; x += 7) {
      if (isRoadColumn(x)) continue;
      // Only the sidewalk above the road: lamps are taller than a tile and would overlap the asphalt.
      const y = r - 1;
      if ([-1, 0, 1].some((d) => doors.has(`${x + d},${y}`))) continue;
      spots.push({ x, y });
    }
  }
  return spots;
}

function isRoadColumn(x: number): boolean {
  return V_ROADS.some((c) => x >= c - 1 && x <= c + 2);
}

export const BENCH_SPOTS = [
  { x: 21, y: 19 },
  { x: 24, y: 19 },
  { x: 33, y: 22 },
  { x: 36, y: 22 },
];
