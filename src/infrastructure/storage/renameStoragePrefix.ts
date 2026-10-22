/**
 * Moves every browser-storage key under `from` to `to`, so data saved before a rename is kept.
 * A value already saved under the new key wins. Storage can be blocked, so failures are ignored.
 */
export function renameStoragePrefix(from: string, to: string): void {
  try {
    const storage = window.localStorage;
    const oldKeys = Array.from({ length: storage.length }, (_, i) => storage.key(i)).filter(
      (key): key is string => key !== null && key.startsWith(from),
    );
    for (const oldKey of oldKeys) {
      const newKey = to + oldKey.slice(from.length);
      const value = storage.getItem(oldKey);
      if (storage.getItem(newKey) === null && value !== null) storage.setItem(newKey, value);
      storage.removeItem(oldKey);
    }
  } catch {
    // Nothing to move when storage is unavailable.
  }
}

/** The platform was called Nimbus City before; its browser data moves to the current prefix. */
export const STORAGE_PREFIX = 'cumulo:';
export const migrateLegacyStorage = () => renameStoragePrefix('nimbus-city:', STORAGE_PREFIX);
