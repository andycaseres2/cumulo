/**
 * Composition root for missions. Client-side only.
 * Signed-in players keep progress in their Supabase account (with a copy in the browser);
 * without Supabase, progress stays in the browser.
 */
import { renameMissionId } from '@/infrastructure/legacyIds';
import { migrateLegacyStorage, STORAGE_PREFIX } from '@/infrastructure/storage/renameStoragePrefix';
import { supabase } from '@/infrastructure/supabase/client';
import type { GameMissions } from '@/modules/games/cumulo-city/missions';
import { getCampaignOverview, type CampaignOverview } from '@/modules/missions/application/campaignOverview';
import { acceptMission, getBuildingMission, getCampaign, getMissionStatus } from '@/modules/missions/application/missionProgress';
import { playMission } from '@/modules/missions/application/playMission';
import type { MissionProgressStore } from '@/modules/missions/domain/MissionProgress';
import { localProgressStore, takeLegacyProgress } from '@/modules/missions/infrastructure/localStorageProgressStore';
import { renamedProgressStore } from '@/modules/missions/infrastructure/renamedProgressStore';
import { staticMissionCatalog } from '@/modules/missions/infrastructure/staticMissionCatalog';
import { supabaseProgressStore } from '@/modules/missions/infrastructure/supabaseProgressStore';
import { mergeProgress, syncedProgressStore } from '@/modules/missions/infrastructure/syncedProgressStore';
import { openMissionPanel } from '@/modules/missions/presentation/missionPanel';
import { currentLocale } from '@/i18n/client';
import { routesFor } from '@/ui/routes';

/** Missions in the language of the page. */
const catalog = staticMissionCatalog(currentLocale());

let store: Promise<MissionProgressStore> | undefined;

async function createStore(): Promise<MissionProgressStore> {
  migrateLegacyStorage();
  const client = supabase();
  const userId = client ? (await client.auth.getSession()).data.session?.user.id : undefined;
  // Progress saved before the ids moved to English is read under the new ids.
  if (!client || !userId) return renamedProgressStore(localProgressStore(), renameMissionId);

  const local = renamedProgressStore(localProgressStore(`${STORAGE_PREFIX}mission-progress:${userId}`), renameMissionId);
  // Progress played on this device before accounts existed now belongs to this player.
  const legacy = takeLegacyProgress();
  if (Object.keys(legacy).length > 0) await local.save(mergeProgress(await local.load(), legacy));

  const remote = renamedProgressStore(
    supabaseProgressStore(
      {
        select: async () => await client.from('mission_progress').select('mission_id, best_score, completed, accepted'),
        upsert: async (rows) => await client.from('mission_progress').upsert(rows, { onConflict: 'user_id,mission_id' }),
      },
      userId,
    ),
    renameMissionId,
  );
  return syncedProgressStore(remote, local);
}

/** The progress store for the current player, created once per page. */
export function progressStore(): Promise<MissionProgressStore> {
  store ??= createStore();
  return store;
}

/** Missions for a game whose mission panel is shown over `host`. */
/** The signed-in player's campaign, for the progress page. */
export async function campaignOverview(): Promise<CampaignOverview> {
  return getCampaignOverview(await progressStore(), catalog);
}

export function gameMissions(host: HTMLElement): GameMissions {
  return {
    current: async (district) => {
      const { current } = await getCampaign(await progressStore(), catalog, district);
      return current && { brief: current.mission, state: current.state };
    },
    forBuilding: async (buildingId) => {
      const found = await getBuildingMission(await progressStore(), catalog, buildingId);
      return found && { brief: found.mission, state: found.state };
    },
    status: async (missionId) => (await getMissionStatus(await progressStore(), catalog, missionId)).state,
    accept: async (missionId) => acceptMission(await progressStore(), catalog, missionId),
    play: async (missionId) => {
      const mission = (await catalog.all()).find((m) => m.id === missionId);
      if (!mission) return null;
      return playMission(await progressStore(), mission, (m) => openMissionPanel({ mission: m, host, theoryUrl: routesFor(currentLocale()).topic }));
    },
  };
}
