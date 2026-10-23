// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import type { DuelProgress, DuelProgressStore } from '../domain/DuelProgress';
import { localDuelProgressStore, parseDuelProgress, supabaseDuelProgressStore, syncedDuelProgressStore } from './duelProgressStores';

const progress = (beatenRivals: string[], bestTimeAttack = 0, bestPractice: Record<string, number> = {}): DuelProgress => ({
  beatenRivals,
  bestTimeAttack,
  bestPractice,
});
const memory = (initial: DuelProgress, failing = false): DuelProgressStore & { saved: DuelProgress } => {
  const store = {
    saved: initial,
    load: async () => {
      if (failing) throw new Error('down');
      return store.saved;
    },
    save: async (p: DuelProgress) => {
      if (failing) throw new Error('down');
      store.saved = p;
    },
  };
  return store;
};

describe('parseDuelProgress', () => {
  it('keeps only well-formed values', () => {
    expect(parseDuelProgress({ beatenRivals: ['a', 3], bestTimeAttack: 'x', bestPractice: { s: 0.5, t: 'no', u: 7 } })).toEqual(
      progress(['a'], 0, { s: 0.5 }),
    );
    expect(parseDuelProgress(null)).toEqual(progress([]));
  });
});

describe('localDuelProgressStore', () => {
  beforeEach(() => window.localStorage.clear());

  it('saves and loads the progress under its key', async () => {
    const store = localDuelProgressStore('k');
    await store.save(progress(['trainee'], 4));
    expect(await store.load()).toEqual(progress(['trainee'], 4));
    expect(await localDuelProgressStore('other').load()).toEqual(progress([]));
  });
});

describe('supabaseDuelProgressStore', () => {
  it('reads the player row and writes it back with the player id', async () => {
    const rows: unknown[] = [];
    const store = supabaseDuelProgressStore(
      {
        select: async () => ({ data: [{ beaten_rivals: ['trainee'], best_time_attack: 9, best_practice: { storage: 1 } }], error: null }),
        upsert: async (row) => {
          rows.push(row);
          return { error: null };
        },
      },
      'user-1',
    );
    expect(await store.load()).toEqual(progress(['trainee'], 9, { storage: 1 }));
    await store.save(progress(['trainee', 'analyst'], 10));
    expect(rows).toEqual([{ user_id: 'user-1', beaten_rivals: ['trainee', 'analyst'], best_time_attack: 10, best_practice: {} }]);
  });

  it('reads an empty progress when the player has no row yet, and fails loudly on errors', async () => {
    const empty = supabaseDuelProgressStore({ select: async () => ({ data: [], error: null }), upsert: async () => ({ error: null }) }, 'u');
    expect(await empty.load()).toEqual(progress([]));
    const broken = supabaseDuelProgressStore({ select: async () => ({ data: null, error: { message: 'no table' } }), upsert: async () => ({ error: null }) }, 'u');
    await expect(broken.load()).rejects.toThrow('no table');
  });
});

describe('syncedDuelProgressStore', () => {
  it('joins both copies on load and writes the result to both', async () => {
    const remote = memory(progress(['trainee'], 3));
    const local = memory(progress(['analyst'], 8));
    expect(await syncedDuelProgressStore(remote, local).load()).toEqual(progress(['trainee', 'analyst'], 8));
    expect(remote.saved.beatenRivals).toEqual(['trainee', 'analyst']);
    expect(local.saved.bestTimeAttack).toBe(8);
  });

  it('keeps working with the device copy when the account is unavailable', async () => {
    const local = memory(progress(['trainee']));
    const store = syncedDuelProgressStore(memory(progress([]), true), local);
    expect(await store.load()).toEqual(progress(['trainee']));
    await store.save(progress(['trainee', 'analyst']));
    expect(local.saved.beatenRivals).toEqual(['trainee', 'analyst']);
  });
});
