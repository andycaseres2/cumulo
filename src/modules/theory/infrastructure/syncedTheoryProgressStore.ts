import type { TheoryProgressStore } from '../domain/TheoryProgress';

const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];

/**
 * Adapter that keeps completed topics in the account (`remote`) and a copy on this device (`local`).
 * A completed topic is never lost: both sides are joined. When the account storage is unavailable
 * (no table yet, offline) the device copy keeps working and is uploaded on the next successful load.
 */
export function syncedTheoryProgressStore(remote: TheoryProgressStore, local: TheoryProgressStore): TheoryProgressStore {
  return {
    async load() {
      const onDevice = await local.load();
      try {
        const joined = union(await remote.load(), onDevice);
        await local.save(joined);
        await remote.save(joined);
        return joined;
      } catch {
        return onDevice;
      }
    },
    async save(slugs) {
      await local.save(slugs);
      try {
        await remote.save(slugs);
      } catch {
        // Kept on the device; uploaded on the next successful load.
      }
    },
  };
}
