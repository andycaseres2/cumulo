import type { Mission } from '../domain/Mission';
import type { MissionProgressStore } from '../domain/MissionProgress';
import type { MissionResult } from '../domain/MissionRun';
import { recordMissionResult } from './missionProgress';

/** Shows the mission to the player and resolves with the result, or null if they leave. */
export type MissionPresenter = (mission: Mission) => Promise<MissionResult | null>;

/** Plays a mission and saves the outcome when the player finishes it. */
export async function playMission(
  store: MissionProgressStore,
  mission: Mission,
  present: MissionPresenter,
): Promise<{ passed: boolean; score: number } | null> {
  const result = await present(mission);
  if (!result) return null;
  await recordMissionResult(store, mission.id, result);
  return { passed: result.passed, score: result.score };
}
