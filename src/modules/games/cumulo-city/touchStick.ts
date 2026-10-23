/** Share of the radius the thumb must move before the player walks. */
export const STICK_DEADZONE = 0.18;
/** Share of the radius from which the player runs (like holding Shift). */
export const STICK_RUN_AT = 0.9;
/** How much two fingers must spread or pinch (ratio of distances) for one zoom step. */
export const PINCH_STEP = 1.2;

export interface StickVector {
  x: number;
  y: number;
  run: boolean;
}

/** Walking direction and strength (0–1) from the thumb's offset to the stick center. */
export function stickVector(dx: number, dy: number, radius: number): StickVector {
  const distance = Math.hypot(dx, dy);
  if (distance < radius * STICK_DEADZONE) return { x: 0, y: 0, run: false };
  const strength = Math.min(1, distance / radius);
  return { x: (dx / distance) * strength, y: (dy / distance) * strength, run: distance >= radius * STICK_RUN_AT };
}

/** A zoom step once the distance between two fingers changed enough since `start`. */
export function pinchStep(start: number, current: number): 'in' | 'out' | null {
  if (current >= start * PINCH_STEP) return 'in';
  if (current <= start / PINCH_STEP) return 'out';
  return null;
}
