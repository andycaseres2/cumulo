import { describe, expect, it } from 'vitest';
import { stepZoom, zoomLevels } from './cameraZoom';

const world = { width: 1024, height: 768 };

describe('zoomLevels', () => {
  it('starts with the zoom that shows the whole district, then whole zooms up to 4', () => {
    const levels = zoomLevels({ width: 1280, height: 713 }, world);
    expect(levels[0]).toBeCloseTo(713 / 768);
    expect(levels.slice(1)).toEqual([1, 2, 3, 4]);
  });

  it('skips whole zooms that would show less than the whole district view', () => {
    // A big screen already fits the district at 1.5x, so 1x is not offered.
    const levels = zoomLevels({ width: 2560, height: 1440 }, world);
    expect(levels[0]).toBeCloseTo(1440 / 768);
    expect(levels.slice(1)).toEqual([2, 3, 4]);
  });
});

describe('stepZoom', () => {
  const levels = [0.93, 1, 2, 3, 4];

  it('moves one level in or out', () => {
    expect(stepZoom(levels, 2, 'in')).toBe(3);
    expect(stepZoom(levels, 2, 'out')).toBe(1);
    expect(stepZoom(levels, 1, 'out')).toBe(0.93);
  });

  it('stays at the ends', () => {
    expect(stepZoom(levels, 4, 'in')).toBe(4);
    expect(stepZoom(levels, 0.93, 'out')).toBe(0.93);
  });

  it('starts from the nearest level when the current zoom is between levels', () => {
    expect(stepZoom(levels, 2.4, 'in')).toBe(3);
    expect(stepZoom(levels, 2.6, 'out')).toBe(2);
  });
});
