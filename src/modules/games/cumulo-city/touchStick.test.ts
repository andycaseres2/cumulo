import { describe, expect, it } from 'vitest';
import { STICK_DEADZONE, STICK_RUN_AT, pinchStep, stickVector } from './touchStick';

describe('stickVector', () => {
  it('points where the thumb is, as a share of the stick radius', () => {
    expect(stickVector(30, 0, 60)).toEqual({ x: 0.5, y: 0, run: false });
    const diagonal = stickVector(-30, -30, 60);
    expect(diagonal.x).toBeCloseTo(-Math.SQRT1_2 * Math.hypot(30, 30) / 60);
    expect(diagonal.y).toBeCloseTo(diagonal.x);
  });

  it('ignores tiny movements around the center', () => {
    expect(stickVector(60 * STICK_DEADZONE - 1, 0, 60)).toEqual({ x: 0, y: 0, run: false });
  });

  it('never goes past the edge, and runs when pushed to it', () => {
    const edge = stickVector(0, 500, 60);
    expect(edge).toEqual({ x: 0, y: 1, run: true });
    expect(stickVector(0, 60 * STICK_RUN_AT - 1, 60).run).toBe(false);
  });
});

describe('pinchStep', () => {
  it('zooms in when the fingers spread enough and out when they pinch', () => {
    expect(pinchStep(100, 130)).toBe('in');
    expect(pinchStep(100, 75)).toBe('out');
  });

  it('waits while the change is small', () => {
    expect(pinchStep(100, 110)).toBeNull();
    expect(pinchStep(100, 90)).toBeNull();
  });
});
