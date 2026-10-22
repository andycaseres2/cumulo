import type { Point } from './office';

/** Direction from the player to a target (radians, 0 = right, PI/2 = down), hidden once within `hideWithin`. */
export function guideArrow(from: Point, to: Point, hideWithin: number): { visible: boolean; angle: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return { visible: Math.hypot(dx, dy) > hideWithin, angle: Math.atan2(dy, dx) };
}
