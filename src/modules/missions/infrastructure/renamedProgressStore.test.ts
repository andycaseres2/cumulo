import { describe, expect, it } from 'vitest';
import type { MissionProgressStore, ProgressRecords } from '../domain/MissionProgress';
import { renamedProgressStore } from './renamedProgressStore';

const memory = (records: ProgressRecords): MissionProgressStore & { saved: ProgressRecords } => {
  const store = { saved: records, load: async () => store.saved, save: async (r: ProgressRecords) => void (store.saved = r) };
  return store;
};
const rename = (id: string) => ({ 'viejo-1': 'new-1' })[id] ?? id;

describe('renamedProgressStore', () => {
  it('reads records saved under old ids as the new ids', async () => {
    const store = renamedProgressStore(memory({ 'viejo-1': { bestScore: 80, completed: true, accepted: true } }), rename);
    expect(await store.load()).toEqual({ 'new-1': { bestScore: 80, completed: true, accepted: true } });
  });

  it('joins an old and a new record of the same mission without losing the best result', async () => {
    const store = renamedProgressStore(
      memory({
        'viejo-1': { bestScore: 90, completed: true, accepted: true },
        'new-1': { bestScore: 40, completed: false, accepted: true },
      }),
      rename,
    );
    expect(await store.load()).toEqual({ 'new-1': { bestScore: 90, completed: true, accepted: true } });
  });

  it('saves records untouched', async () => {
    const inner = memory({});
    await renamedProgressStore(inner, rename).save({ 'new-1': { bestScore: 10, completed: false, accepted: true } });
    expect(Object.keys(inner.saved)).toEqual(['new-1']);
  });
});
