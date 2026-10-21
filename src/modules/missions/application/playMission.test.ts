import { describe, expect, it } from 'vitest';
import type { MissionResult } from '../domain/MissionRun';
import { inMemoryProgressStore } from '../infrastructure/inMemoryProgressStore';
import { twoStepMission as mission } from '../testing/fixtures';
import { getMissionStatus } from './missionProgress';
import { playMission } from './playMission';

const finished = (passed: boolean): MissionResult => ({ correct: passed ? 2 : 0, total: 2, score: passed ? 1 : 0, passed, review: [] });

describe('playMission', () => {
  it('saves the outcome when the player finishes and reports it', async () => {
    const store = inMemoryProgressStore();
    const outcome = await playMission(store, mission, async () => finished(true));

    expect(outcome).toEqual({ passed: true, score: 1 });
    expect((await getMissionStatus(store, mission.id)).state).toBe('completed');
  });

  it('saves nothing when the player leaves before finishing', async () => {
    const store = inMemoryProgressStore();
    await expect(playMission(store, mission, async () => null)).resolves.toBeNull();
    expect(await getMissionStatus(store, mission.id)).toEqual({ state: 'available', bestScore: null });
  });
});
