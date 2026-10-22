import { describe, expect, it } from 'vitest';
import { fitZoom } from './config';

describe('fitZoom', () => {
  it('uses the largest whole zoom that shows the whole room', () => {
    expect(fitZoom(1280, 713, 320, 208)).toBe(3);
    expect(fitZoom(1920, 1080, 320, 208)).toBe(4);
  });

  it('never goes below 2 or above 4 so pixels stay crisp and readable', () => {
    expect(fitZoom(400, 300, 320, 208)).toBe(2);
    expect(fitZoom(4000, 3000, 320, 208)).toBe(4);
  });
});
