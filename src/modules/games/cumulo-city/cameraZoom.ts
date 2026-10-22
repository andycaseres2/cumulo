interface Size {
  width: number;
  height: number;
}

/** Highest zoom the player can reach; pixel art stays crisp at whole zooms. */
export const MAX_ZOOM = 4;

/**
 * Zoom levels for the city view: first the one that shows the whole district on screen,
 * then every whole zoom above it up to MAX_ZOOM.
 */
export function zoomLevels(view: Size, world: Size, max = MAX_ZOOM): number[] {
  const overview = Math.min(view.width / world.width, view.height / world.height);
  const whole = Array.from({ length: max }, (_, i) => i + 1).filter((z) => z > overview);
  return [Math.min(overview, max), ...whole];
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
