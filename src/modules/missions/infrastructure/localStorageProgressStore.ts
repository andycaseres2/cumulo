import type { MissionProgressStore, ProgressRecords } from '../domain/MissionProgress';

const KEY = 'nimbus-city:mission-progress';

/**
 * Adapter: progress kept in this browser. Storage can be blocked (private mode, disabled site data),
 * so every access is guarded and the game keeps working without saving.
 */
export const localStorageProgressStore: MissionProgressStore = {
  load: async () => {
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as ProgressRecords) : {};
    } catch {
      return {};
    }
  },
  save: async (records) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(records));
    } catch {
      // Progress is lost on reload when storage is unavailable; the current session still works.
    }
  },
};
