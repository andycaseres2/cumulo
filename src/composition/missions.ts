/**
 * Composition root for missions. Safe to import from client-side scripts.
 * Swap `localStorageProgressStore` for an account-backed adapter to keep progress across devices.
 */
import type { GameMissions } from '@/modules/games/nimbus-city/missions';
import { acceptMission, getCampaign, getMissionStatus } from '@/modules/missions/application/missionProgress';
import { playMission } from '@/modules/missions/application/playMission';
import { localStorageProgressStore as store } from '@/modules/missions/infrastructure/localStorageProgressStore';
import { staticMissionCatalog as catalog } from '@/modules/missions/infrastructure/staticMissionCatalog';
import { openMissionPanel } from '@/modules/missions/presentation/missionPanel';
import { routes } from '@/ui/routes';

/** Missions for a game whose mission panel is shown over `host`. */
export function gameMissions(host: HTMLElement): GameMissions {
  return {
    current: async () => {
      const { current } = await getCampaign(store, catalog);
      return current && { brief: current.mission, state: current.state };
    },
    forBuilding: (buildingId) => catalog.findByBuilding(buildingId),
    status: async (missionId) => (await getMissionStatus(store, catalog, missionId)).state,
    accept: (missionId) => acceptMission(store, catalog, missionId),
    play: async (missionId) => {
      const mission = (await catalog.all()).find((m) => m.id === missionId);
      if (!mission) return null;
      return playMission(store, mission, (m) => openMissionPanel({ mission: m, host, theoryUrl: routes.topic }));
    },
  };
}
