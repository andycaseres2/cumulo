/**
 * Composition root for missions. Safe to import from client-side scripts.
 * Swap `localStorageProgressStore` for an account-backed adapter to keep progress across devices.
 */
import type { GameMissions } from '@/modules/games/nimbus-city/missions';
import { getMissionStatus } from '@/modules/missions/application/missionProgress';
import { playMission } from '@/modules/missions/application/playMission';
import { localStorageProgressStore } from '@/modules/missions/infrastructure/localStorageProgressStore';
import { staticMissionCatalog } from '@/modules/missions/infrastructure/staticMissionCatalog';
import { openMissionPanel } from '@/modules/missions/presentation/missionPanel';
import { routes } from '@/ui/routes';

/** Missions for a game whose mission panel is shown over `host`. */
export function gameMissions(host: HTMLElement): GameMissions {
  return {
    forBuilding: (buildingId) => staticMissionCatalog.findByBuilding(buildingId),
    status: async (missionId) => (await getMissionStatus(localStorageProgressStore, missionId)).state,
    play: async (missionId) => {
      const mission = (await staticMissionCatalog.all()).find((m) => m.id === missionId);
      if (!mission) return null;
      return playMission(localStorageProgressStore, mission, (m) => openMissionPanel({ mission: m, host, theoryUrl: routes.topic }));
    },
  };
}
