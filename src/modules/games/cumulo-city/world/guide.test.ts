import { describe, expect, it } from 'vitest';
import { guideArrow } from './guide';

describe('guideArrow', () => {
  it('points from the player toward the target (0 = right, PI/2 = down)', () => {
    expect(guideArrow({ x: 0, y: 0 }, { x: 200, y: 0 }, 40).angle).toBeCloseTo(0);
    expect(guideArrow({ x: 0, y: 0 }, { x: 0, y: 200 }, 40).angle).toBeCloseTo(Math.PI / 2);
    expect(guideArrow({ x: 0, y: 0 }, { x: -200, y: 0 }, 40).angle).toBeCloseTo(Math.PI);
  });

  it('is visible while far and hides once the player is close to the target', () => {
    expect(guideArrow({ x: 0, y: 0 }, { x: 200, y: 0 }, 40).visible).toBe(true);
    expect(guideArrow({ x: 0, y: 0 }, { x: 30, y: 0 }, 40).visible).toBe(false);
  });
});
