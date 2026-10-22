/**
 * Composition root for missions. Client-side only.
 * Signed-in players keep progress in their Supabase account (with a copy in the browser);
 * without Supabase, progress stays in the browser.
 */
import { supabase } from '@/infrastructure/supabase/client';
import type { GameMissions } from '@/modules/games/nimbus-city/missions';
import { getCampaignOverview, type CampaignOverview } from '@/modules/missions/application/campaignOverview';
import { acceptMission, getCampaign, getMissionStatus } from '@/modules/missions/application/missionProgress';
import { playMission } from '@/modules/missions/application/playMission';
import type { MissionProgressStore } from '@/modules/missions/domain/MissionProgress';
import { localProgressStore, takeLegacyProgress } from '@/modules/missions/infrastructure/localStorageProgressStore';
import { staticMissionCatalog as catalog } from '@/modules/missions/infrastructure/staticMissionCatalog';
import { supabaseProgressStore } from '@/modules/missions/infrastructure/supabaseProgressStore';
import { mergeProgress, syncedProgressStore } from '@/modules/missions/infrastructure/syncedProgressStore';
import { openMissionPanel } from '@/modules/missions/presentation/missionPanel';
import { routes } from '@/ui/routes';

let store: Promise<MissionProgressStore> | undefined;

async function createStore(): Promise<MissionProgressStore> {
  const client = supabase();
  const userId = client ? (await client.auth.getSession()).data.session?.user.id : undefined;
  if (!client || !userId) return localProgressStore();

  const local = localProgressStore(`nimbus-city:mission-progress:${userId}`);
  // Progress played on this device before accounts existed now belongs to this player.
  const legacy = takeLegacyProgress();
  if (Object.keys(legacy).length > 0) await local.save(mergeProgress(await local.load(), legacy));

  const remote = supabaseProgressStore(
    {
      select: async () => await client.from('mission_progress').select('mission_id, best_score, completed, accepted'),
      upsert: async (rows) => await client.from('mission_progress').upsert(rows, { onConflict: 'user_id,mission_id' }),
    },
    userId,
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
    current: async () => {
      const { current } = await getCampaign(await progressStore(), catalog);
      return current && { brief: current.mission, state: current.state };
    },
    forBuilding: (buildingId) => catalog.findByBuilding(buildingId),
    status: async (missionId) => (await getMissionStatus(await progressStore(), catalog, missionId)).state,
    accept: async (missionId) => acceptMission(await progressStore(), catalog, missionId),
    play: async (missionId) => {
      const mission = (await catalog.all()).find((m) => m.id === missionId);
      if (!mission) return null;
      return playMission(await progressStore(), mission, (m) => openMissionPanel({ mission: m, host, theoryUrl: routes.topic }));
    },
  };
}
