import { describe, expect, it, vi } from 'vitest';
import type { MissionProgressStore, ProgressRecords } from '../domain/MissionProgress';
import { inMemoryProgressStore } from './inMemoryProgressStore';
import { mergeProgress, syncedProgressStore } from './syncedProgressStore';

const failing = (): MissionProgressStore => ({
  load: vi.fn(async () => {
    throw new Error('table missing');
  }),
  save: vi.fn(async () => {
    throw new Error('table missing');
  }),
});

describe('mergeProgress', () => {
  it('keeps the best score and never loses a completion or an acceptance from either side', () => {
    const a: ProgressRecords = { bakery: { bestScore: 0.8, completed: true, accepted: true }, bank: { bestScore: 0.4, completed: false, accepted: true } };
    const b: ProgressRecords = { bakery: { bestScore: 0.6, completed: false }, cafe: { bestScore: 1, completed: true, accepted: true } };

    expect(mergeProgress(a, b)).toEqual({
      bakery: { bestScore: 0.8, completed: true, accepted: true },
      bank: { bestScore: 0.4, completed: false, accepted: true },
      cafe: { bestScore: 1, completed: true, accepted: true },
    });
  });
});

describe('syncedProgressStore', () => {
  it('combines the account and this device, uploading what only the device knew', async () => {
    const remote = inMemoryProgressStore({ bank: { bestScore: 1, completed: true, accepted: true } });
    const local = inMemoryProgressStore({ bakery: { bestScore: 0.8, completed: true, accepted: true } });

    const records = await syncedProgressStore(remote, local).load();

    expect(Object.keys(records).sort()).toEqual(['bakery', 'bank']);
    expect(Object.keys(await remote.load()).sort()).toEqual(['bakery', 'bank']);
    expect(Object.keys(await local.load()).sort()).toEqual(['bakery', 'bank']);
  });

  it('keeps working with the device copy when the account storage is unavailable', async () => {
    const local = inMemoryProgressStore({ bakery: { bestScore: 0.8, completed: true, accepted: true } });
    const store = syncedProgressStore(failing(), local);

    await expect(store.load()).resolves.toEqual({ bakery: { bestScore: 0.8, completed: true, accepted: true } });
    await store.save({ bank: { bestScore: 0.6, completed: false, accepted: true } });
    expect(await local.load()).toEqual({ bank: { bestScore: 0.6, completed: false, accepted: true } });
  });

  it('syncs with the account once, then reads the device copy that every save keeps up to date', async () => {
    const remote = inMemoryProgressStore({ bank: { bestScore: 1, completed: true, accepted: true } });
    const remoteLoad = vi.spyOn(remote, 'load');
    const local = inMemoryProgressStore();
    const store = syncedProgressStore(remote, local);

    await store.load();
    await store.save({ ...(await store.load()), bakery: { bestScore: 1, completed: true, accepted: true } });
    const later = await store.load();

    expect(remoteLoad).toHaveBeenCalledTimes(1);
    expect(Object.keys(later).sort()).toEqual(['bakery', 'bank']);
  });

  it('tries the account again on the next load when it was unavailable', async () => {
    const remote = inMemoryProgressStore({ bank: { bestScore: 1, completed: true, accepted: true } });
    const remoteLoad = vi.spyOn(remote, 'load').mockRejectedValueOnce(new Error('offline'));
    const store = syncedProgressStore(remote, inMemoryProgressStore());

    await expect(store.load()).resolves.toEqual({});
    await expect(store.load()).resolves.toHaveProperty('bank');
    expect(remoteLoad).toHaveBeenCalledTimes(2);
  });

  it('saves to the device and the account', async () => {
    const remote = inMemoryProgressStore();
    const local = inMemoryProgressStore();
    await syncedProgressStore(remote, local).save({ bakery: { bestScore: 1, completed: true, accepted: true } });

    expect(await remote.load()).toEqual({ bakery: { bestScore: 1, completed: true, accepted: true } });
    expect(await local.load()).toEqual({ bakery: { bestScore: 1, completed: true, accepted: true } });
  });
});
