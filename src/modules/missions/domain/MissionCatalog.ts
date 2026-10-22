import type { Mission } from './Mission';

/** Port: where missions come from. */
export interface MissionCatalog {
  /** Every mission, in campaign order (each track keeps its own relative order). */
  all(): Promise<Mission[]>;
  /** Missions whose client is in this building, in campaign order. */
  inBuilding(buildingId: string): Promise<Mission[]>;
}
