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
      { user_id: 'user-1', mission_id: 'bakery-elasticity', best_score: 1, completed: true, accepted: true },
    ]);
  });

  it('fails loudly when the table cannot be read, so the caller can fall back', async () => {
    const store = supabaseProgressStore(table([], { message: 'relation "mission_progress" does not exist' }), 'user-1');
    await expect(store.load()).rejects.toThrow('mission_progress');
  });
});
