import { describe, expect, it, vi } from 'vitest';
import { recordMissionResult } from '../application/missionProgress';
import { inMemoryProgressStore } from './inMemoryProgressStore';
import { supabaseProgressStore } from './supabaseProgressStore';
import { mergeProgress } from './syncedProgressStore';

describe('best stars of a job', () => {
  it('keep the best rating of the account and the device copy', () => {
    expect(
      mergeProgress({ a: { bestScore: 1, completed: true, accepted: true, bestStars: 2 } }, { a: { bestScore: 1, completed: true, accepted: true, bestStars: 3 } }),
    ).toEqual({ a: { bestScore: 1, completed: true, accepted: true, bestStars: 3 } });
  });

  it('never go down when a later attempt rates worse', async () => {
    const store = inMemoryProgressStore({});
    await recordMissionResult(store, 'a', { score: 1, passed: true, stars: 3 });
    await recordMissionResult(store, 'a', { score: 0.5, passed: true, stars: 1 });
    expect((await store.load()).a).toMatchObject({ bestScore: 1, bestStars: 3, completed: true });
  });

  it('are not set by a failed try, so an older completion keeps showing its score', async () => {
    const store = inMemoryProgressStore({ a: { bestScore: 0.85, completed: true, accepted: true } });
    await recordMissionResult(store, 'a', { score: 0.2, passed: false, stars: 0 });
    expect((await store.load()).a).toEqual({ bestScore: 0.85, completed: true, accepted: true });
  });

  it('are written to and read from the account column', async () => {
    const upsert = vi.fn(async () => ({ error: null }));
    const store = supabaseProgressStore(
      { select: async () => ({ data: [{ mission_id: 'a', best_score: 1, completed: true, accepted: true, best_stars: 2 }], error: null }), upsert },
      'user-1',
    );
    expect((await store.load()).a.bestStars).toBe(2);
    await store.save({ a: { bestScore: 1, completed: true, accepted: true, bestStars: 3 } });
    expect(upsert).toHaveBeenCalledWith([expect.objectContaining({ mission_id: 'a', best_stars: 3 })]);
  });
});
