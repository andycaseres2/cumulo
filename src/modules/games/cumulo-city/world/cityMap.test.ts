import { describe, expect, it } from 'vitest';
import { MAP_H, MAP_W } from '../config';
import {
  BUILDINGS,
  buildCityGround,
  buildingTop,
  doorTile,
  PARK_BENCHES,
  PARK_TREES,
  streetProps,
  type GroundGrid,
} from './cityMap';
import { G, isRoad } from './tileTypes';

const ground = buildCityGround();
const props = streetProps(ground);

function thinCells(grid: GroundGrid, type: number): string[] {
  const is = (x: number, y: number) => x < 0 || y < 0 || x >= MAP_W || y >= MAP_H || grid[y][x] === type;
  const thin: string[] = [];
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (grid[y][x] !== type) continue;
      if ((!is(x, y - 1) && !is(x, y + 1)) || (!is(x - 1, y) && !is(x + 1, y))) thin.push(`${x},${y}`);
    }
  }
  return thin;
}

function nearBuilding(x: number, y: number): boolean {
  return BUILDINGS.some((b) => x >= b.x - 1 && x <= b.x + b.w && y >= buildingTop(b) - 1 && y <= b.bottom + 1);
}

describe('city ground', () => {
  it('has the configured size', () => {
    expect(ground).toHaveLength(MAP_H);
    expect(ground.every((row) => row.length === MAP_W)).toBe(true);
  });

  it('opens every building door onto pavement', () => {
    for (const b of BUILDINGS) {
      const door = doorTile(b);
      expect(ground[door.y][door.x], b.id).toBe(G.PAVEMENT);
    }
  });

  it('places buildings only on pavement', () => {
    for (const b of BUILDINGS) {
      for (let y = buildingTop(b); y <= b.bottom; y++) {
        for (let x = b.x; x < b.x + b.w; x++) expect(ground[y][x], `${b.id} at ${x},${y}`).toBe(G.PAVEMENT);
      }
    }
  });

  it('keeps grass and water regions at least two tiles thick so nine-slice borders render', () => {
    expect(thinCells(ground, G.GRASS)).toEqual([]);
    expect(thinCells(ground, G.WATER)).toEqual([]);
  });

  it('gives every building a unique id', () => {
    expect(new Set(BUILDINGS.map((b) => b.id)).size).toBe(BUILDINGS.length);
  });
});

describe('props', () => {
  it('puts street props on pavement, away from buildings, doors and crosswalks', () => {
    expect(props.length).toBeGreaterThan(10);
    for (const p of props) {
      const where = `${p.kind} at ${p.x},${p.y}`;
      expect(ground[p.y][p.x], where).toBe(G.PAVEMENT);
      expect(nearBuilding(p.x, p.y), where).toBe(false);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const cell = ground[p.y + dy]?.[p.x + dx];
          expect(cell === G.CROSSWALK_H || cell === G.CROSSWALK_V, where).toBe(false);
        }
      }
    }
  });

  it('keeps the top half of tall props (trees, lamps) over pavement, never over a road', () => {
    for (const p of props.filter((prop) => prop.kind === 'tree' || prop.kind === 'lamp')) {
      expect(isRoad(ground[p.y - 1][p.x]), `${p.kind} at ${p.x},${p.y}`).toBe(false);
    }
  });

  it('does not stack two props on the same tile', () => {
    const keys = props.map((p) => `${p.x},${p.y}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('plants park trees and benches on grass', () => {
    for (const spot of [...PARK_TREES, ...PARK_BENCHES]) expect(ground[spot.y][spot.x], `${spot.x},${spot.y}`).toBe(G.GRASS);
    for (const tree of PARK_TREES) expect(ground[tree.y - 1][tree.x], `top of ${tree.x},${tree.y}`).toBe(G.GRASS);
  });

  it('never draws a park tree over a bench', () => {
    const treeTiles = new Set(PARK_TREES.flatMap((t) => [`${t.x},${t.y}`, `${t.x},${t.y - 1}`]));
    expect(PARK_BENCHES.filter((b) => treeTiles.has(`${b.x},${b.y}`))).toEqual([]);
  });
});
