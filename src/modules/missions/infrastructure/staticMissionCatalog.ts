import type { MissionCatalog } from '../domain/MissionCatalog';
import { bakeryElasticity } from './content/bakeryElasticity';
import { bankAccess } from './content/bankAccess';
import { cityhallArchive } from './content/cityhallArchive';
import { clinicResilience } from './content/clinicResilience';
import { startupCosts } from './content/startupCosts';
import { streamingGlobal } from './content/streamingGlobal';

/** Campaign order: missions are offered one after another in this order. */
const MISSIONS = [bakeryElasticity, bankAccess, startupCosts, streamingGlobal, cityhallArchive, clinicResilience];

/** Adapter: missions written as typed data in the repository. */
export const staticMissionCatalog: MissionCatalog = {
  all: async () => [...MISSIONS],
  inBuilding: async (buildingId) => MISSIONS.filter((m) => m.buildingId === buildingId),
};
