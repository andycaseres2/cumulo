import { describe, expect, it } from 'vitest';
import { inMemoryProgressStore } from '../infrastructure/inMemoryProgressStore';
import { getMissionStatus, recordMissionResult } from './missionProgress';

describe('mission progress', () => {
  it('reports a mission nobody played as available', async () => {
    await expect(getMissionStatus(inMemoryProgressStore(), 'bakery-elasticity')).resolves.toEqual({
      state: 'available',
      bestScore: null,
    });
  });

  it('marks a mission completed once passed and keeps the best score across replays', async () => {
    const store = inMemoryProgressStore();
    await recordMissionResult(store, 'bakery-elasticity', { score: 0.6, passed: false });
    expect(await getMissionStatus(store, 'bakery-elasticity')).toEqual({ state: 'available', bestScore: 0.6 });

    await recordMissionResult(store, 'bakery-elasticity', { score: 1, passed: true });
    await recordMissionResult(store, 'bakery-elasticity', { score: 0.8, passed: true });
    expect(await getMissionStatus(store, 'bakery-elasticity')).toEqual({ state: 'completed', bestScore: 1 });
  });

  it('never loses a completion when a later replay fails', async () => {
    const store = inMemoryProgressStore();
    await recordMissionResult(store, 'bakery-elasticity', { score: 0.8, passed: true });
    await recordMissionResult(store, 'bakery-elasticity', { score: 0.2, passed: false });
    expect((await getMissionStatus(store, 'bakery-elasticity')).state).toBe('completed');
  });
});
