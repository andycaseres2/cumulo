import { describe, expect, it } from 'vitest';
import { sliceRole } from './autotile';

const X = 1; // region
const o = 0; // outside
const grid = [
  [o, o, o, o, o],
  [o, X, X, X, o],
  [o, X, X, X, o],
  [o, X, X, X, o],
  [o, o, o, o, o],
];
const isRegion = (cell: number) => cell === X;

describe('sliceRole', () => {
  it('picks corners, edges and center of a rectangular region', () => {
    const roles = [1, 2, 3].map((y) => [1, 2, 3].map((x) => sliceRole(grid, x, y, isRegion)));
    expect(roles).toEqual([
      ['tl', 't', 'tr'],
      ['l', 'c', 'r'],
      ['bl', 'b', 'br'],
    ]);
  });

  it('treats cells outside the map as part of the region, so map borders draw no edge', () => {
    const full = [
      [X, X],
      [X, X],
    ];
    expect(sliceRole(full, 0, 0, isRegion)).toBe('c');
    expect(sliceRole(full, 1, 1, isRegion)).toBe('c');
  });
});
