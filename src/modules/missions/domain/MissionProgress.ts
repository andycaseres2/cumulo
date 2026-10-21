export interface MissionRecord {
  bestScore: number;
  completed: boolean;
}

export type ProgressRecords = Record<string, MissionRecord>;

/** Port: where mission progress is kept (this device today, a player account later). */
export interface MissionProgressStore {
  load(): Promise<ProgressRecords>;
  save(records: ProgressRecords): Promise<void>;
}
