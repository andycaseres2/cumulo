import type { TheoryProgressStore } from '../domain/TheoryProgress';

/** Reads completed topics saved under renamed slugs as the current slugs, so the rename loses no progress. */
export function renamedTheoryProgressStore(store: TheoryProgressStore, rename: (slug: string) => string): TheoryProgressStore {
  return {
    load: async () => [...new Set((await store.load()).map(rename))],
    save: (slugs) => store.save(slugs),
  };
}
