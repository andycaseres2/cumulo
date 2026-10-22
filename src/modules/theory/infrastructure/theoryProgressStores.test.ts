// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TheoryProgressStore } from '../domain/TheoryProgress';
import { localTheoryProgressStore } from './localTheoryProgressStore';
import { supabaseTheoryProgressStore, type TheoryProgressTable } from './supabaseTheoryProgressStore';
import { syncedTheoryProgressStore } from './syncedTheoryProgressStore';

function memory(initial: string[] = []): TheoryProgressStore {
  let slugs = [...initial];
  return { load: async () => [...slugs], save: async (next) => void (slugs = [...next]) };
}

const failing: TheoryProgressStore = {
  load: async () => {
    throw new Error('offline');
  },
  save: async () => {
    throw new Error('offline');
  },
};

describe('localTheoryProgressStore', () => {
  beforeEach(() => window.localStorage.clear());

  it('keeps completed topics in this browser under its key', async () => {
    await localTheoryProgressStore('k').save(['iam', 'kms']);
    await expect(localTheoryProgressStore('k').load()).resolves.toEqual(['iam', 'kms']);
    await expect(localTheoryProgressStore('other').load()).resolves.toEqual([]);
  });

  it('ignores broken data', async () => {
    window.localStorage.setItem('k', '{not json');
    await expect(localTheoryProgressStore('k').load()).resolves.toEqual([]);
  });
});

describe('supabaseTheoryProgressStore', () => {
  it('reads the slugs of the player rows and upserts one row per completed topic', async () => {
    const table: TheoryProgressTable = {
      select: vi.fn(async () => ({ data: [{ topic_slug: 'iam' }], error: null })),
      upsert: vi.fn(async () => ({ error: null })),
    };
    const store = supabaseTheoryProgressStore(table, 'user-1');

    await expect(store.load()).resolves.toEqual(['iam']);
    await store.save(['iam', 'kms']);
    expect(table.upsert).toHaveBeenCalledWith([
      { user_id: 'user-1', topic_slug: 'iam' },
      { user_id: 'user-1', topic_slug: 'kms' },
    ]);
  });

  it('fails loudly so the synced store can fall back', async () => {
    const table: TheoryProgressTable = {
      select: async () => ({ data: null, error: { message: 'relation does not exist' } }),
      upsert: async () => ({ error: { message: 'nope' } }),
    };
    await expect(supabaseTheoryProgressStore(table, 'u').load()).rejects.toThrow('theory_progress');
    await expect(supabaseTheoryProgressStore(table, 'u').save(['iam'])).rejects.toThrow('theory_progress');
  });
});

describe('syncedTheoryProgressStore', () => {
  it('joins what the account and the device know, and writes it to both', async () => {
    const remote = memory(['iam']);
    const local = memory(['kms']);
    const store = syncedTheoryProgressStore(remote, local);

    await expect(store.load()).resolves.toEqual(['iam', 'kms']);
    await expect(remote.load()).resolves.toEqual(['iam', 'kms']);
    await expect(local.load()).resolves.toEqual(['iam', 'kms']);
  });

  it('keeps working with the device copy when the account storage fails', async () => {
    const local = memory(['kms']);
    const store = syncedTheoryProgressStore(failing, local);
    await expect(store.load()).resolves.toEqual(['kms']);
    await store.save(['kms', 'iam']);
    await expect(local.load()).resolves.toEqual(['kms', 'iam']);
  });
});
