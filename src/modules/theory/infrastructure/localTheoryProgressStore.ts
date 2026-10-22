import type { TheoryProgressStore } from '../domain/TheoryProgress';

/**
 * Adapter: completed topics kept in this browser under `key` (one key per account, one for guests).
 * Storage can be blocked (private mode, disabled site data), so every access is guarded.
 */
export function localTheoryProgressStore(key: string): TheoryProgressStore {
  return {
    async load() {
      try {
        const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]');
        return Array.isArray(parsed) ? parsed.filter((slug): slug is string => typeof slug === 'string') : [];
      } catch {
        return [];
      }
    },
    async save(slugs) {
      try {
        window.localStorage.setItem(key, JSON.stringify(slugs));
      } catch {
        // Lost on reload when storage is unavailable; the current page still works.
      }
    },
  };
}
