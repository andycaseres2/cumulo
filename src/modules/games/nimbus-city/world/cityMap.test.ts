import { describe, expect, it } from 'vitest';
import { seededRandom } from '../engine/art/canvas';
import { MAP_H, MAP_W } from '../config';
import { BUILDINGS, buildCityTiles, buildingTop, lampSpots, treeSpots } from './cityMap';
import { T } from './tileTypes';

const tiles = buildCityTiles(seededRandom(2024));
const ROADS: number[] = [T.ROAD, T.ROAD_H_TOP, T.ROAD_H_BOTTOM, T.ROAD_V_LEFT, T.ROAD_V_RIGHT, T.CROSS_H, T.CROSS_V];

describe('city map', () => {
  it('has the configured size', () => {
    expect(tiles).toHaveLength(MAP_H);
    expect(tiles.every((row) => row.length === MAP_W)).toBe(true);
  });

  it('opens every building door onto a sidewalk', () => {
    for (const b of BUILDINGS) {
      expect(tiles[b.bottom + 1][b.x + Math.floor(b.w / 2)], b.id).toBe(T.SIDEWALK);
    }
  });

  it('never places a building over a road, sidewalk or the park', () => {
    for (const b of BUILDINGS) {
      for (let y = buildingTop(b); y <= b.bottom; y++) {
        for (let x = b.x; x < b.x + b.w; x++) {
          expect([T.GRASS, T.FLOWERS], `${b.id} at ${x},${y}`).toContain(tiles[y][x]);
        }
      }
    }
  });

  it('keeps trees off roads and lamps on sidewalks', () => {
    for (const { x, y } of treeSpots(tiles, seededRandom(1))) expect(ROADS).not.toContain(tiles[y][x]);
    for (const { x, y } of lampSpots()) expect(tiles[y][x]).toBe(T.SIDEWALK);
  });

  it('gives every building a unique id', () => {
    expect(new Set(BUILDINGS.map((b) => b.id)).size).toBe(BUILDINGS.length);
  });
});
