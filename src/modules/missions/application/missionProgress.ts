import type { MissionProgressStore } from '../domain/MissionProgress';

export interface MissionStatus {
  state: 'available' | 'completed';
  bestScore: number | null;
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
  };
  await store.save(records);
}

export async function getMissionStatus(store: MissionProgressStore, missionId: string): Promise<MissionStatus> {
  const record = (await store.load())[missionId];
  if (!record) return { state: 'available', bestScore: null };
  return { state: record.completed ? 'completed' : 'available', bestScore: record.bestScore };
}
