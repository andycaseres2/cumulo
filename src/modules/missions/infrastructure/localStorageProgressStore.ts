import { STORAGE_PREFIX } from '@/infrastructure/storage/renameStoragePrefix';
import type { MissionProgressStore, ProgressRecords } from '../domain/MissionProgress';

/** Key used before progress was tied to an account. */
const LEGACY_KEY = `${STORAGE_PREFIX}mission-progress`;

function read(key: string): ProgressRecords {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as ProgressRecords) : {};
  } catch {
    return {};
  }
}

/**
 * Adapter: progress kept in this browser under `key` (one key per account). Storage can be blocked
 * (private mode, disabled site data), so every access is guarded and the game keeps working without saving.
 */
export function localProgressStore(key: string = LEGACY_KEY): MissionProgressStore {
  return {
    load: async () => read(key),
    save: async (records) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(records));
      } catch {
        // Progress is lost on reload when storage is unavailable; the current session still works.
      }
    },
  };
}

/** Progress saved in this browser before accounts existed; read once and then forgotten. */
export function takeLegacyProgress(): ProgressRecords {
  const records = read(LEGACY_KEY);
  try {
    window.localStorage.removeItem(LEGACY_KEY);
  } catch {
    // Nothing to forget when storage is blocked.
  }
  return records;
}
