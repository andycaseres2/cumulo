import type { MissionCatalog } from '../domain/MissionCatalog';
import { bakeryElasticity } from './content/bakeryElasticity';

const MISSIONS = [bakeryElasticity];

/** Adapter: missions written as typed data in the repository. */
export const staticMissionCatalog: MissionCatalog = {
  all: async () => [...MISSIONS],
  findByBuilding: async (buildingId) => MISSIONS.find((m) => m.buildingId === buildingId) ?? null,
};
