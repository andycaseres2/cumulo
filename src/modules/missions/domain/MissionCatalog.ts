import type { Mission } from './Mission';

/** Port: where missions come from. */
export interface MissionCatalog {
  all(): Promise<Mission[]>;
  findByBuilding(buildingId: string): Promise<Mission | null>;
}
