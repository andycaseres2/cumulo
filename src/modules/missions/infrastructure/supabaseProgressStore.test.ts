import { describe, expect, it, vi } from 'vitest';
import { supabaseProgressStore, type ProgressTable } from './supabaseProgressStore';

function table(rows: unknown[] = [], error: { message: string } | null = null): ProgressTable {
  return {
    select: vi.fn(async () => ({ data: error ? null : rows, error })),
    upsert: vi.fn(async () => ({ error: null })),
  };
}

describe('supabaseProgressStore', () => {
  it('reads the player rows as progress records', async () => {
    const store = supabaseProgressStore(
      table([{ mission_id: 'bakery-elasticity', best_score: 0.8, completed: true, accepted: true }]),
      'user-1',
    );
    await expect(store.load()).resolves.toEqual({ 'bakery-elasticity': { bestScore: 0.8, completed: true, accepted: true } });
  });

  it('writes one row per mission for the signed-in player', async () => {
    const fake = table();
    await supabaseProgressStore(fake, 'user-1').save({ 'bakery-elasticity': { bestScore: 1, completed: true, accepted: true } });

    expect(fake.upsert).toHaveBeenCalledWith([
      { user_id: 'user-1', mission_id: 'bakery-elasticity', best_score: 1, completed: true, accepted: true, best_stars: 0 },
    ]);
  });

  it('reads 0 stars (the column default for progress saved before ratings) as a job never rated', async () => {
    const store = supabaseProgressStore(table([{ mission_id: 'old', best_score: 0.85, completed: true, accepted: true, best_stars: 0 }]), 'user-1');
    expect((await store.load()).old).toEqual({ bestScore: 0.85, completed: true, accepted: true });
  });

  it('gives every row of a batch the same columns, rated or not, so none is sent as NULL', async () => {
    const fake = table([]);
    await supabaseProgressStore(fake, 'user-1').save({
      rated: { bestScore: 1, completed: true, accepted: true, bestStars: 3 },
      older: { bestScore: 0.5, completed: false, accepted: true },
    });
    const rows = (fake.upsert as unknown as { mock: { calls: [Record<string, unknown>[]][] } }).mock.calls[0][0];
    expect(rows.map((row) => Object.keys(row).sort())).toEqual([Object.keys(rows[0]).sort(), Object.keys(rows[0]).sort()]);
    expect(rows.map((row) => row.best_stars)).toEqual([3, 0]);
  });

  it('fails loudly when the table cannot be read, so the caller can fall back', async () => {
    const store = supabaseProgressStore(table([], { message: 'relation "mission_progress" does not exist' }), 'user-1');
    await expect(store.load()).rejects.toThrow('mission_progress');
  });
});
