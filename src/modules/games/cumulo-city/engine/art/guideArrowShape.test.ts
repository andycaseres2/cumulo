import { describe, expect, it } from 'vitest';
import { guideArrowShape } from './guideArrowShape';

describe('guideArrowShape', () => {
  const shape = guideArrowShape();
  const filled = (x: number, y: number) => shape[y][x];

  it('fits in 11 px with a free border for the outline, smaller than a 16 px character', () => {
    expect(shape).toHaveLength(11);
    expect(shape.every((row) => row.length === 11)).toBe(true);
    expect(shape[0].some(Boolean) || shape[10].some(Boolean) || shape.some((row) => row[0] || row[10])).toBe(false);
  });

  it('points right to a single tip in the middle row', () => {
    expect(filled(9, 5)).toBe(true);
    expect(filled(9, 4) || filled(9, 6)).toBe(false);
  });

  it('is symmetric and has a notch at the back, like a chevron', () => {
    for (let y = 0; y < 11; y++) expect(shape[y]).toEqual(shape[10 - y]);
    expect(filled(1, 5)).toBe(false);
    expect(filled(1, 1) && filled(1, 9)).toBe(true);
  });
});
