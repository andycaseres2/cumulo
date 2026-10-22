import type { MissionProgressStore, MissionRecord, ProgressRecords } from '../domain/MissionProgress';

function mergeRecord(a: MissionRecord | undefined, b: MissionRecord | undefined): MissionRecord {
  return {
    bestScore: Math.max(a?.bestScore ?? 0, b?.bestScore ?? 0),
    completed: Boolean(a?.completed || b?.completed),
    accepted: Boolean(a?.accepted || b?.accepted),
  };
}

/** Progress from two places combined: best score wins, a completion or an acceptance is never lost. */
export function mergeProgress(a: ProgressRecords, b: ProgressRecords): ProgressRecords {
  const merged: ProgressRecords = {};
  for (const id of new Set([...Object.keys(a), ...Object.keys(b)])) merged[id] = mergeRecord(a[id], b[id]);
  return merged;
}

/**
 * Adapter that keeps the player's progress in the account (`remote`) and a copy on this device (`local`).
 * When the account storage is unavailable (no table yet, offline) the game keeps working with the device copy,
 * and whatever only the device knew is uploaded the next time the account storage answers.
 */
export function syncedProgressStore(remote: MissionProgressStore, local: MissionProgressStore): MissionProgressStore {
  return {
    async load() {
      const onDevice = await local.load();
      try {
        const merged = mergeProgress(await remote.load(), onDevice);
        await local.save(merged);
        await remote.save(merged);
        return merged;
      } catch {
        return onDevice;
      }
    },
    async save(records) {
      await local.save(records);
      try {
        await remote.save(records);
      } catch {
        // Kept on the device; uploaded on the next successful load.
      }
    },
  };
}
