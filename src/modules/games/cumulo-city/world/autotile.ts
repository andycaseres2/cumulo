/** Position of a tile inside a 3x3 nine-slice: corners, edges or center. */
export type SliceRole = 'tl' | 't' | 'tr' | 'l' | 'c' | 'r' | 'bl' | 'b' | 'br';

/**
 * Picks the nine-slice piece for (x, y) by looking at its four neighbours.
 * Cells outside the map count as part of the region, so the map border draws no edge.
 * Regions must be at least two tiles thick (enforced by the city map tests).
 */
export function sliceRole(grid: number[][], x: number, y: number, inRegion: (cell: number) => boolean): SliceRole {
  const same = (dx: number, dy: number) => {
    const row = grid[y + dy];
    if (row === undefined || x + dx < 0 || x + dx >= row.length) return true;
    return inRegion(row[x + dx]);
  };
  const vertical = !same(0, -1) ? 't' : !same(0, 1) ? 'b' : '';
  const horizontal = !same(-1, 0) ? 'l' : !same(1, 0) ? 'r' : '';
  return ((vertical + horizontal) || 'c') as SliceRole;
}
