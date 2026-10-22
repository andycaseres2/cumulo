import { describe, expect, it } from 'vitest';
import { stepZoom, zoomLevels } from './cameraZoom';

const world = { width: 1024, height: 768 };

describe('zoomLevels', () => {
  it('starts with the zoom that shows the whole district, then half steps up to 4', () => {
    const levels = zoomLevels({ width: 1280, height: 713 }, world);
    expect(levels[0]).toBeCloseTo(713 / 768);
    expect(levels.slice(1)).toEqual([1, 1.5, 2, 2.5, 3, 3.5, 4]);
  });

  it('skips zooms that would show less than the whole district view', () => {
    // A big screen already fits the district at 1.875x, so 1x and 1.5x are not offered.
    const levels = zoomLevels({ width: 2560, height: 1440 }, world);
    expect(levels[0]).toBeCloseTo(1440 / 768);
    expect(levels.slice(1)).toEqual([2, 2.5, 3, 3.5, 4]);
  });
});

describe('stepZoom', () => {
  const levels = [0.93, 1, 1.5, 2, 2.5, 3];

  it('moves one level in or out', () => {
    expect(stepZoom(levels, 2, 'in')).toBe(2.5);
    expect(stepZoom(levels, 2, 'out')).toBe(1.5);
    expect(stepZoom(levels, 1, 'out')).toBe(0.93);
  });

  it('stays at the ends', () => {
    expect(stepZoom(levels, 3, 'in')).toBe(3);
    expect(stepZoom(levels, 0.93, 'out')).toBe(0.93);
  });

  it('starts from the nearest level when the current zoom is between levels', () => {
    expect(stepZoom(levels, 2.2, 'in')).toBe(2.5);
    expect(stepZoom(levels, 2.4, 'out')).toBe(2);
  });
});
