import type { MissionProgressStore, ProgressRecords } from '../domain/MissionProgress';

export function inMemoryProgressStore(initial: ProgressRecords = {}): MissionProgressStore {
  let records = structuredClone(initial);
  return {
    load: async () => structuredClone(records),
    save: async (next) => {
      records = structuredClone(next);
    },
  };
}
