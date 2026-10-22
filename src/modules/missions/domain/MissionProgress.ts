export interface MissionRecord {
  bestScore: number;
  completed: boolean;
  /** Missing in progress saved before missions had to be accepted; read as false. */
  accepted?: boolean;
}

export type ProgressRecords = Record<string, MissionRecord>;

/** Port: where mission progress is kept (this device today, a player account later). */
export interface MissionProgressStore {
  load(): Promise<ProgressRecords>;
  save(records: ProgressRecords): Promise<void>;
}

/**
 * Where a mission stands in the campaign. Missions are played in catalog order:
 * the first one not completed is offered, and becomes active once the player accepts it.
 */
export type MissionState = 'locked' | 'offered' | 'active' | 'completed';
