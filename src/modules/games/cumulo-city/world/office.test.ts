import { describe, expect, it } from 'vitest';
import { ALL_BUILDINGS as BUILDINGS } from './districts';
import { buildOfficeLayout, findPath, walkableGrid, type OfficeLayout, type Point } from './office';

const layouts = BUILDINGS.map((b) => [b.id, buildOfficeLayout(b)] as const);

function overlaps(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

const reachable = (layout: OfficeLayout, to: Point) => findPath(walkableGrid(layout), layout.spawn, to) !== null;

describe('office layouts', () => {
  it.each(layouts)('%s: has a door in the bottom wall with a free spawn tile right above it', (_, layout) => {
    expect(layout.door.y).toBe(layout.height - 1);
    expect(layout.cells[layout.door.y][layout.door.x]).toBe('door');
    expect(layout.spawn).toEqual({ x: layout.door.x, y: layout.door.y - 1 });
    expect(walkableGrid(layout)[layout.spawn.y][layout.spawn.x]).toBe(true);
  });

  it.each(layouts)('%s: keeps furniture on the floor without overlapping', (_, layout) => {
    for (const f of layout.furniture) {
      for (let y = f.y; y < f.y + f.h; y++) {
        for (let x = f.x; x < f.x + f.w; x++) expect(layout.cells[y][x], `${f.kind} at ${x},${y}`).toBe('floor');
      }
    }
    layout.furniture.forEach((a, i) =>
      layout.furniture.slice(i + 1).forEach((b) => expect(overlaps(a, b), `${a.kind} vs ${b.kind}`).toBe(false)),
    );
  });

  it.each(layouts)('%s: has workstations whose seats are reachable from the door', (_, layout) => {
    expect(layout.workstations.length).toBeGreaterThanOrEqual(3);
    for (const station of layout.workstations) expect(reachable(layout, station.seat), JSON.stringify(station)).toBe(true);
  });

  it.each(layouts)('%s: has distinct break spots, none of them a workstation seat', (_, layout) => {
    const seats = new Set(layout.workstations.map((s) => `${s.seat.x},${s.seat.y}`));
    const spots = layout.breakSpots.map((p) => `${p.x},${p.y}`);
    expect(spots.length).toBeGreaterThanOrEqual(5);
    expect(new Set(spots).size).toBe(spots.length);
    expect(spots.filter((s) => seats.has(s))).toEqual([]);
  });

  it.each(layouts)('%s: has a reachable break area', (_, layout) => {
    expect(layout.breakSpots.length).toBeGreaterThan(0);
    for (const spot of layout.breakSpots) expect(reachable(layout, spot), JSON.stringify(spot)).toBe(true);
  });

  it('builds the same office every time for the same building', () => {
    expect(buildOfficeLayout(BUILDINGS[0])).toEqual(buildOfficeLayout(BUILDINGS[0]));
  });

  it('gives shops a reception counter and offices a meeting table', () => {
    for (const [id, layout] of layouts) {
      const style = BUILDINGS.find((b) => b.id === id)!.style;
      const kinds = layout.furniture.map((f) => f.kind);
      expect(kinds, id).toContain(style === 'shop' ? 'counter' : 'meeting');
    }
  });
});

describe('findPath', () => {
  const open = [
    [true, true, true],
    [true, false, true],
    [true, true, true],
  ];

  it('returns the shortest walkable route, including start and goal', () => {
    const path = findPath(open, { x: 0, y: 1 }, { x: 2, y: 1 });
    expect(path).toHaveLength(5);
    expect(path?.[0]).toEqual({ x: 0, y: 1 });
    expect(path?.at(-1)).toEqual({ x: 2, y: 1 });
    expect(path?.some((p) => p.x === 1 && p.y === 1)).toBe(false);
  });

  it('returns null when the goal cannot be reached', () => {
    const walled = [
      [true, false, true],
      [true, false, true],
    ];
    expect(findPath(walled, { x: 0, y: 0 }, { x: 2, y: 0 })).toBeNull();
  });
});
