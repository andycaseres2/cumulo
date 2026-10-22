interface Size {
  width: number;
  height: number;
}

/** Highest zoom the player can reach. */
export const MAX_ZOOM = 4;
/** Distance between zoom levels: small enough to feel gradual, large enough to need few steps. */
export const ZOOM_STEP = 0.5;

/**
 * Zoom levels for the city view: first the one that shows the whole district on screen,
 * then every half step from 1 up to MAX_ZOOM above it.
 */
export function zoomLevels(view: Size, world: Size, max = MAX_ZOOM): number[] {
  const overview = Math.min(view.width / world.width, view.height / world.height);
  const steps = Array.from({ length: Math.round((max - 1) / ZOOM_STEP) + 1 }, (_, i) => 1 + i * ZOOM_STEP).filter((z) => z > overview);
  return [Math.min(overview, max), ...steps];
}

/** The next level in or out from the level nearest to `current`, staying at the ends. */
export function stepZoom(levels: number[], current: number, direction: 'in' | 'out'): number {
  let nearest = 0;
  levels.forEach((level, i) => {
    if (Math.abs(level - current) < Math.abs(levels[nearest] - current)) nearest = i;
  });
  const next = nearest + (direction === 'in' ? 1 : -1);
  return levels[Math.min(Math.max(next, 0), levels.length - 1)];
}
