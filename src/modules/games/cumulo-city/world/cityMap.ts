import { MAP_H, MAP_W } from '../config';
import { G, isRoad, type Ground } from './tileTypes';

export const H_ROADS = [12, 28, 44];
export const V_ROADS = [16, 40];

/** Grass area of the central park, inside a two-tile pavement ring. */
export const PARK = { x: 20, y: 16, w: 18, h: 10 };
const PARK_PATH_ROW = 22;
const PARK_PATH_COL = 28;
const POND = { x: 31, y: 18, w: 5, h: 2 };

export interface BuildingDef {
  id: string;
  name: string;
  /** Left tile column. */
  x: number;
  /** Bottom tile row; the door opens onto the row below. */
  bottom: number;
  w: number;
  h: number;
  facade: 'red' | 'orange';
  roof: 'beige' | 'grey';
  style: 'shop' | 'office';
}

/** Future mission clients. Each one maps to Cloud Practitioner topics. */
export const BUILDINGS: BuildingDef[] = [
  { id: 'bakery', name: 'Pastelería Dulce Nube', x: 2, bottom: 10, w: 9, h: 7, facade: 'red', roof: 'beige', style: 'shop' },
  { id: 'bank', name: 'Banco Andino', x: 20, bottom: 10, w: 9, h: 8, facade: 'orange', roof: 'grey', style: 'office' },
  { id: 'cafe', name: 'Café Byte', x: 31, bottom: 10, w: 7, h: 6, facade: 'red', roof: 'grey', style: 'shop' },
  { id: 'clinic', name: 'Clínica Vida', x: 44, bottom: 10, w: 9, h: 8, facade: 'orange', roof: 'beige', style: 'office' },
  { id: 'hotel', name: 'Hotel Mirador', x: 55, bottom: 10, w: 8, h: 8, facade: 'red', roof: 'grey', style: 'office' },
  { id: 'academy', name: 'Cloud Academy', x: 2, bottom: 26, w: 11, h: 8, facade: 'orange', roof: 'beige', style: 'office' },
  { id: 'startup', name: 'Startup Hub', x: 44, bottom: 26, w: 10, h: 8, facade: 'red', roof: 'grey', style: 'office' },
  { id: 'store', name: 'Tienda Andes', x: 56, bottom: 26, w: 7, h: 6, facade: 'orange', roof: 'grey', style: 'shop' },
  { id: 'school', name: 'Escuela Digital', x: 2, bottom: 42, w: 10, h: 7, facade: 'red', roof: 'beige', style: 'office' },
  { id: 'streaming', name: 'StreamLlama', x: 20, bottom: 42, w: 9, h: 8, facade: 'orange', roof: 'grey', style: 'office' },
  { id: 'delivery', name: 'Rapidito', x: 31, bottom: 42, w: 7, h: 6, facade: 'red', roof: 'beige', style: 'shop' },
  { id: 'cityhall', name: 'Municipalidad', x: 44, bottom: 42, w: 10, h: 9, facade: 'orange', roof: 'beige', style: 'office' },
  { id: 'gym', name: 'FitCloud Gym', x: 56, bottom: 42, w: 7, h: 6, facade: 'red', roof: 'grey', style: 'shop' },
];

export function buildingTop(def: BuildingDef): number {
  return def.bottom - def.h + 1;
}

export function doorTile(def: BuildingDef): { x: number; y: number } {
  return { x: def.x + Math.floor(def.w / 2), y: def.bottom + 1 };
}

export type GroundGrid = Ground[][];

export function buildCityGround(): GroundGrid {
  const grid: GroundGrid = Array.from({ length: MAP_H }, () => Array<Ground>(MAP_W).fill(G.PAVEMENT));
  const set = (x: number, y: number, ground: Ground) => {
    if (x >= 0 && y >= 0 && x < MAP_W && y < MAP_H) grid[y][x] = ground;
  };

  for (const r of H_ROADS) for (let x = 0; x < MAP_W; x++) for (const d of [0, 1]) set(x, r + d, G.ROAD);
  for (const c of V_ROADS) for (let y = 0; y < MAP_H; y++) for (const d of [0, 1]) set(c + d, y, G.ROAD);

  // Crosswalks on every side of every intersection.
  for (const r of H_ROADS) {
    for (const c of V_ROADS) {
      for (const d of [0, 1]) {
        set(c - 1, r + d, G.CROSSWALK_H);
        set(c + 2, r + d, G.CROSSWALK_H);
        set(c + d, r - 1, G.CROSSWALK_V);
        set(c + d, r + 2, G.CROSSWALK_V);
      }
    }
  }

  // Park: grass split by two paths, with a pond in the north-east lawn.
  for (let y = PARK.y; y < PARK.y + PARK.h; y++) {
    for (let x = PARK.x; x < PARK.x + PARK.w; x++) {
      if (y !== PARK_PATH_ROW && x !== PARK_PATH_COL) set(x, y, G.GRASS);
    }
  }
  for (let y = POND.y; y < POND.y + POND.h; y++) for (let x = POND.x; x < POND.x + POND.w; x++) set(x, y, G.WATER);

  return grid;
}

export const PARK_TREES = [
  { x: 21, y: 17 },
  { x: 24, y: 19 },
  { x: 26, y: 17 },
  { x: 22, y: 25 },
  { x: 27, y: 25 },
  { x: 31, y: 24 },
  { x: 34, y: 25 },
  { x: 37, y: 24 },
  { x: 37, y: 21 },
  { x: 30, y: 17 },
];

export const PARK_BENCHES = [
  { x: 23, y: 21 },
  { x: 33, y: 21 },
  { x: 25, y: 23 },
  { x: 32, y: 23 },
];

export type StreetPropKind = 'tree' | 'lamp' | 'bin' | 'mailbox' | 'hydrant' | 'bench';

export interface StreetProp {
  kind: StreetPropKind;
  x: number;
  y: number;
}

const TALL: StreetPropKind[] = ['tree', 'lamp'];
const SHORT: StreetPropKind[] = ['bin', 'mailbox', 'hydrant', 'bench'];

/** Deterministic street furniture along the pavement next to roads. */
export function streetProps(grid: GroundGrid): StreetProp[] {
  const props: StreetProp[] = [];
  const doors = BUILDINGS.map(doorTile);
  const at = (x: number, y: number) => grid[y]?.[x];

  const allowed = (x: number, y: number, tall: boolean) => {
    if (at(x, y) !== G.PAVEMENT) return false;
    if (tall && (at(x, y - 1) === undefined || isRoad(at(x, y - 1)))) return false;
    if (BUILDINGS.some((b) => x >= b.x - 1 && x <= b.x + b.w && y >= buildingTop(b) - 1 && y <= b.bottom + 1)) return false;
    if (doors.some((d) => Math.abs(d.x - x) <= 1 && Math.abs(d.y - y) <= 1)) return false;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const cell = at(x + dx, y + dy);
        if (cell === G.CROSSWALK_H || cell === G.CROSSWALK_V) return false;
      }
    }
    return !props.some((p) => Math.abs(p.x - x) <= 2 && Math.abs(p.y - y) <= 2);
  };

  const line = (cells: { x: number; y: number }[], kinds: StreetPropKind[]) => {
    let next = 0;
    for (const { x, y } of cells) {
      const kind = kinds[next % kinds.length];
      if (!allowed(x, y, TALL.includes(kind))) continue;
      props.push({ kind, x, y });
      next++;
    }
  };

  for (const r of H_ROADS) {
    line(range(2, MAP_W, 5).map((x) => ({ x, y: r - 1 })), TALL);
    line(range(4, MAP_W, 7).map((x) => ({ x, y: r + 2 })), SHORT);
  }
  for (const c of V_ROADS) {
    for (const x of [c - 1, c + 2]) line(range(3, MAP_H, 6).map((y) => ({ x, y })), TALL);
  }
  return props;
}

function range(start: number, end: number, step: number): number[] {
  const values: number[] = [];
  for (let v = start; v < end; v += step) values.push(v);
  return values;
}
