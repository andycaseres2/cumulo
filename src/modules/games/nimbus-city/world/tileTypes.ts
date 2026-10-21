/** What the ground is at each tile. The engine decides how each type is drawn. */
export const G = {
  ROAD: 0,
  /** Crosswalk across a horizontal road (pedestrians walk north–south). */
  CROSSWALK_H: 1,
  /** Crosswalk across a vertical road (pedestrians walk east–west). */
  CROSSWALK_V: 2,
  PAVEMENT: 3,
  GRASS: 4,
  WATER: 5,
} as const;

export type Ground = (typeof G)[keyof typeof G];

export function isRoad(ground: number): boolean {
  return ground === G.ROAD || ground === G.CROSSWALK_H || ground === G.CROSSWALK_V;
}
