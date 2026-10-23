/** Side of the guide arrow texture, in pixels: smaller than a 16 px character. */
export const GUIDE_SIZE = 11;

/** Pixels of the guide chevron (pointing right) inside an 11x11 box, leaving a 1px border for the outline. */
export function guideArrowShape(): boolean[][] {
  return Array.from({ length: GUIDE_SIZE }, (_, y) =>
    Array.from({ length: GUIDE_SIZE }, (_, x) => {
      if (x < 1 || x > 9) return false;
      const half = Math.floor((x - 1) / 2);
      const inHead = y >= 1 + half && y <= 9 - half;
      // The notch at the back turns the triangle into a chevron.
      const inNotch = x <= 3 && y >= 4 + half && y <= 6 - half;
      return inHead && !inNotch;
    }),
  );
}
