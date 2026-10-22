import type { MissionProgressStore, ProgressRecords } from '../domain/MissionProgress';
import { mergeProgress } from './syncedProgressStore';

/** Reads progress saved under renamed mission ids as the current ids, joining duplicates like a sync does. */
export function renamedProgressStore(store: MissionProgressStore, rename: (id: string) => string): MissionProgressStore {
  return {
    async load() {
      let renamed: ProgressRecords = {};
      for (const [id, record] of Object.entries(await store.load())) renamed = mergeProgress(renamed, { [rename(id)]: record });
      return renamed;
    },
    save: (records) => store.save(records),
  };
}
