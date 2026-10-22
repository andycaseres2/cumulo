import type { BuildingDef } from './cityMap';

export interface Point {
  x: number;
  y: number;
}

export type OfficeCell = 'wall' | 'window' | 'floor' | 'door';

export type FurnitureKind = 'desk' | 'meeting' | 'counter' | 'shelf' | 'plant' | 'printer' | 'cooler' | 'sofa';

export interface Furniture {
  kind: FurnitureKind;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Where a worker stands to work, and which way they look while working. */
export interface Workstation {
  seat: Point;
  facing: 'up' | 'down';
}

export interface OfficeLayout {
  width: number;
  height: number;
  cells: OfficeCell[][];
  door: Point;
  /** Tile right above the door, where the player appears when entering. */
  spawn: Point;
  furniture: Furniture[];
  workstations: Workstation[];
  breakSpots: Point[];
}

export const OFFICE_W = 20;
export const OFFICE_H = 13;

const DESK_COLUMNS = [2, 5, 12, 15];

const piece = (kind: FurnitureKind, x: number, y: number, w = 1, h = 1): Furniture => ({ kind, x, y, w, h });

function deskRow(y: number): { furniture: Furniture[]; workstations: Workstation[] } {
  return {
    furniture: DESK_COLUMNS.map((x) => piece('desk', x, y, 2, 1)),
    workstations: DESK_COLUMNS.map((x) => ({ seat: { x, y: y + 1 }, facing: 'up' as const })),
  };
}

/**
 * A walled office with a door in the middle of the bottom wall and a clear aisle above it.
 * Offices get two rows of desks and a meeting table; shops get a reception counter and one row of desks.
 */
export function buildOfficeLayout(building: BuildingDef): OfficeLayout {
  const width = OFFICE_W;
  const height = OFFICE_H;
  const door = { x: Math.floor(width / 2), y: height - 1 };

  const cells: OfficeCell[][] = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x): OfficeCell => {
      if (y === door.y && x === door.x) return 'door';
      if (y === 1 && x > 0 && x < width - 1) return x % 4 === 2 ? 'window' : 'wall';
      if (y <= 1 || y === height - 1 || x === 0 || x === width - 1) return 'wall';
      return 'floor';
    }),
  );

  const furniture: Furniture[] = [piece('plant', 1, 2), piece('plant', 18, 2), piece('cooler', 17, 10), piece('sofa', 1, 10, 2, 1)];
  const workstations: Workstation[] = [];

  if (building.style === 'shop') {
    furniture.push(piece('shelf', 2, 2, 3, 1), piece('shelf', 15, 2, 3, 1), piece('counter', 8, 5, 4, 1));
    workstations.push({ seat: { x: 9, y: 4 }, facing: 'down' });
    const desks = deskRow(8);
    furniture.push(...desks.furniture);
    workstations.push(...desks.workstations);
  } else {
    furniture.push(piece('shelf', 3, 2, 2, 1), piece('shelf', 14, 2, 2, 1), piece('meeting', 8, 2, 4, 2), piece('printer', 18, 6));
    for (const y of [4, 7]) {
      const desks = deskRow(y);
      furniture.push(...desks.furniture);
      workstations.push(...desks.workstations);
    }
  }

  return {
    width,
    height,
    cells,
    door,
    spawn: { x: door.x, y: door.y - 1 },
    furniture,
    workstations,
    // Around the water cooler (17,10) and the sofa (1–2,10).
    breakSpots: [
      { x: 16, y: 10 },
      { x: 16, y: 9 },
      { x: 17, y: 9 },
      { x: 3, y: 10 },
      { x: 1, y: 9 },
      { x: 4, y: 10 },
    ],
  };
}

/** Floor and door tiles not covered by furniture. */
export function walkableGrid(layout: OfficeLayout): boolean[][] {
  const grid = layout.cells.map((row) => row.map((cell) => cell === 'floor' || cell === 'door'));
  for (const f of layout.furniture) {
    for (let y = f.y; y < f.y + f.h; y++) for (let x = f.x; x < f.x + f.w; x++) grid[y][x] = false;
  }
  return grid;
}

/** Shortest 4-direction route on a walkable grid (breadth-first search), or null when unreachable. */
export function findPath(walkable: boolean[][], from: Point, to: Point): Point[] | null {
  const key = (p: Point) => p.y * 10_000 + p.x;
  const cameFrom = new Map<number, Point | null>([[key(from), null]]);
  const queue: Point[] = [from];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.x === to.x && current.y === to.y) {
      const path: Point[] = [];
      for (let p: Point | null = current; p; p = cameFrom.get(key(p)) ?? null) path.unshift(p);
      return path;
    }
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const next = { x: current.x + dx, y: current.y + dy };
      if (!walkable[next.y]?.[next.x] || cameFrom.has(key(next))) continue;
      cameFrom.set(key(next), current);
      queue.push(next);
    }
  }
  return null;
}
