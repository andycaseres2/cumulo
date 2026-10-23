import { describe, expect, it } from 'vitest';
import type { MissionResult } from '../domain/MissionRun';
import { inMemoryProgressStore } from '../infrastructure/inMemoryProgressStore';
import { catalogOf, twoStepMission as mission } from '../testing/fixtures';
import { getMissionStatus } from './missionProgress';
import { playMission } from './playMission';

const finished = (passed: boolean, stars = passed ? 3 : 0): MissionResult => ({
  correct: passed ? 2 : 0,
  total: 2,
  score: passed ? 1 : 0,
  passed,
  satisfaction: passed ? 100 : 0,
  stars,
  fee: 0,
  review: [],
});

describe('playMission', () => {
  it('saves the outcome when the player finishes and reports it', async () => {
    const store = inMemoryProgressStore();
    const outcome = await playMission(store, mission, async () => finished(true));

    expect(outcome).toEqual({ passed: true, score: 1 });
    expect((await getMissionStatus(store, catalogOf(mission), mission.id)).state).toBe('completed');
  });

  it('keeps the best rating of the job', async () => {
    const store = inMemoryProgressStore();
    await playMission(store, mission, async () => finished(true, 2));
    await playMission(store, mission, async () => finished(true, 1));
    expect((await store.load())[mission.id].bestStars).toBe(2);
  });

  it('saves nothing when the player leaves before finishing', async () => {
    const store = inMemoryProgressStore();
    await expect(playMission(store, mission, async () => null)).resolves.toBeNull();
    expect(await getMissionStatus(store, catalogOf(mission), mission.id)).toEqual({ state: 'offered', bestScore: null });
  });
});
