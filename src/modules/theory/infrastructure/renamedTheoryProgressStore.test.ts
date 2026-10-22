import { describe, expect, it } from 'vitest';
import type { TheoryProgressStore } from '../domain/TheoryProgress';
import { renamedTheoryProgressStore } from './renamedTheoryProgressStore';

const memory = (slugs: string[]): TheoryProgressStore & { saved: string[] } => {
  const store = { saved: slugs, load: async () => store.saved, save: async (s: string[]) => void (store.saved = s) };
  return store;
};
const rename = (slug: string) => ({ 'viejo-tema': 'new-topic' })[slug] ?? slug;

describe('renamedTheoryProgressStore', () => {
  it('reads old slugs as the new ones, once each', async () => {
    const store = renamedTheoryProgressStore(memory(['viejo-tema', 'new-topic', 'other']), rename);
    expect(await store.load()).toEqual(['new-topic', 'other']);
  });

  it('saves slugs untouched', async () => {
    const inner = memory([]);
    await renamedTheoryProgressStore(inner, rename).save(['new-topic']);
    expect(inner.saved).toEqual(['new-topic']);
  });
});
