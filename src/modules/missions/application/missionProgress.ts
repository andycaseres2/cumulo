import type { Mission } from '../domain/Mission';
import type { MissionCatalog } from '../domain/MissionCatalog';
import type { MissionProgressStore, MissionState, ProgressRecords } from '../domain/MissionProgress';

export interface MissionStatus {
  state: MissionState;
  bestScore: number | null;
}

export interface Campaign {
  /** The active mission, or the one on offer in the requested track; null when there is none. */
  current: { mission: Mission; state: 'offered' | 'active' } | null;
  completed: number;
  total: number;
}

/** The first mission of a track that is not completed yet: the only one that can be offered or active. */
function nextInTrack(track: string, missions: Mission[], records: ProgressRecords): Mission | null {
  return missions.find((m) => m.track === track && !records[m.id]?.completed) ?? null;
}

function stateOf(mission: Mission, missions: Mission[], records: ProgressRecords): MissionState {
  const record = records[mission.id];
  if (record?.completed) return 'completed';
  if (nextInTrack(mission.track, missions, records)?.id !== mission.id) return 'locked';
  return record?.accepted ? 'active' : 'offered';
}

/** The one mission in progress in the whole city, if any. */
function activeMission(missions: Mission[], records: ProgressRecords): Mission | null {
  return missions.find((m) => stateOf(m, missions, records) === 'active') ?? null;
}

export async function getMissionStatus(store: MissionProgressStore, catalog: MissionCatalog, missionId: string): Promise<MissionStatus> {
  const [records, missions] = await Promise.all([store.load(), catalog.all()]);
  const mission = missions.find((m) => m.id === missionId);
  return { state: mission ? stateOf(mission, missions, records) : 'locked', bestScore: records[missionId]?.bestScore ?? null };
}

/**
 * The mission to show: the active one wherever it is, otherwise the next one of `track`
 * (of the first track with missions left when no track is given).
 */
export async function getCampaign(store: MissionProgressStore, catalog: MissionCatalog, track?: string): Promise<Campaign> {
  const [records, missions] = await Promise.all([store.load(), catalog.all()]);
  const active = activeMission(missions, records);
  const offered = active ? null : nextInTrack(track ?? missions.find((m) => !records[m.id]?.completed)?.track ?? '', missions, records);
  return {
    current: active ? { mission: active, state: 'active' } : offered ? { mission: offered, state: 'offered' } : null,
    completed: missions.filter((m) => records[m.id]?.completed).length,
    total: missions.length,
  };
}

/**
 * What matters in a building right now: its active mission; nothing while some of its clients still wait
 * their turn (or when it hosts none); the last one once all of them are completed.
 */
export async function getBuildingMission(
  store: MissionProgressStore,
  catalog: MissionCatalog,
  buildingId: string,
): Promise<{ mission: Mission; state: 'active' | 'completed' } | null> {
  const [records, missions, hosted] = await Promise.all([store.load(), catalog.all(), catalog.inBuilding(buildingId)]);
  const states = hosted.map((m) => stateOf(m, missions, records));
  const active = hosted.find((_, i) => states[i] === 'active');
  if (active) return { mission: active, state: 'active' };
  if (hosted.length > 0 && states.every((s) => s === 'completed')) return { mission: hosted[hosted.length - 1], state: 'completed' };
  return null;
}

/**
 * Activates a mission on offer. Returns false for any other mission (locked, active or completed),
 * and while another mission is active: only one client is served at a time.
 */
export async function acceptMission(store: MissionProgressStore, catalog: MissionCatalog, missionId: string): Promise<boolean> {
  const [records, missions] = await Promise.all([store.load(), catalog.all()]);
  const mission = missions.find((m) => m.id === missionId);
  if (!mission || stateOf(mission, missions, records) !== 'offered' || activeMission(missions, records)) return false;
  records[missionId] = { bestScore: records[missionId]?.bestScore ?? 0, completed: false, accepted: true };
  await store.save(records);
  return true;
}

/** Saves a finished run: keeps the best score and never undoes a completion. */
export async function recordMissionResult(
  store: MissionProgressStore,
  missionId: string,
  result: { score: number; passed: boolean; stars?: number },
): Promise<void> {
  const records = await store.load();
  const previous = records[missionId];
  records[missionId] = {
    bestScore: Math.max(previous?.bestScore ?? 0, result.score),
    completed: (previous?.completed ?? false) || result.passed,
    accepted: true,
    // A failed try (0 stars) never turns an older completion without rating into a 0-star one.
    ...(Math.max(previous?.bestStars ?? 0, result.stars ?? 0) > 0 ? { bestStars: Math.max(previous?.bestStars ?? 0, result.stars ?? 0) } : {}),
  };
  await store.save(records);
}
