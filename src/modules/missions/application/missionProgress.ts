import type { Mission } from '../domain/Mission';
import type { MissionCatalog } from '../domain/MissionCatalog';
import type { MissionProgressStore, MissionState, ProgressRecords } from '../domain/MissionProgress';

export interface MissionStatus {
  state: MissionState;
  bestScore: number | null;
}

export interface Campaign {
  /** The mission on offer or in progress; null when every mission is completed. */
  current: { mission: Mission; state: 'offered' | 'active' } | null;
  completed: number;
  total: number;
}

function currentMission(missions: Mission[], records: ProgressRecords): Mission | null {
  return missions.find((m) => !records[m.id]?.completed) ?? null;
}

function stateOf(missionId: string, missions: Mission[], records: ProgressRecords): MissionState {
  const record = records[missionId];
  if (record?.completed) return 'completed';
  if (currentMission(missions, records)?.id !== missionId) return 'locked';
  return record?.accepted ? 'active' : 'offered';
}

export async function getMissionStatus(store: MissionProgressStore, catalog: MissionCatalog, missionId: string): Promise<MissionStatus> {
  const [records, missions] = await Promise.all([store.load(), catalog.all()]);
  return { state: stateOf(missionId, missions, records), bestScore: records[missionId]?.bestScore ?? null };
}

export async function getCampaign(store: MissionProgressStore, catalog: MissionCatalog): Promise<Campaign> {
  const [records, missions] = await Promise.all([store.load(), catalog.all()]);
  const mission = currentMission(missions, records);
  return {
    current: mission ? { mission, state: records[mission.id]?.accepted ? 'active' : 'offered' } : null,
    completed: missions.filter((m) => records[m.id]?.completed).length,
    total: missions.length,
  };
}

/** Activates the mission on offer. Returns false for any other mission (locked, active or completed). */
export async function acceptMission(store: MissionProgressStore, catalog: MissionCatalog, missionId: string): Promise<boolean> {
  const [records, missions] = await Promise.all([store.load(), catalog.all()]);
  if (stateOf(missionId, missions, records) !== 'offered') return false;
  records[missionId] = { bestScore: records[missionId]?.bestScore ?? 0, completed: false, accepted: true };
  await store.save(records);
  return true;
}

/** Saves a finished run: keeps the best score and never undoes a completion. */
export async function recordMissionResult(
  store: MissionProgressStore,
  missionId: string,
  result: { score: number; passed: boolean },
): Promise<void> {
  const records = await store.load();
  const previous = records[missionId];
  records[missionId] = {
    bestScore: Math.max(previous?.bestScore ?? 0, result.score),
    completed: (previous?.completed ?? false) || result.passed,
    accepted: true,
  };
  await store.save(records);
}
