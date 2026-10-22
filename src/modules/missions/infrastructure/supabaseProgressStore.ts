import type { MissionProgressStore, ProgressRecords } from '../domain/MissionProgress';

interface ProgressRow {
  mission_id: string;
  best_score: number;
  completed: boolean;
  accepted: boolean;
}

/** The two queries this adapter needs on the `mission_progress` table (kept narrow so tests can fake them). */
export interface ProgressTable {
  /** Row Level Security limits the result to the signed-in player's rows. */
  select(): Promise<{ data: unknown[] | null; error: { message: string } | null }>;
  upsert(rows: (ProgressRow & { user_id: string })[]): Promise<{ error: { message: string } | null }>;
}

/** Adapter: mission progress in the player's Supabase account (table `mission_progress`, see supabase/migrations). */
export function supabaseProgressStore(table: ProgressTable, userId: string): MissionProgressStore {
  return {
    async load() {
      const { data, error } = await table.select();
      if (error) throw new Error(`Could not read mission_progress: ${error.message}`);
      const records: ProgressRecords = {};
      for (const row of (data ?? []) as ProgressRow[]) {
        records[row.mission_id] = { bestScore: row.best_score, completed: row.completed, accepted: row.accepted };
      }
      return records;
    },
    async save(records) {
      const rows = Object.entries(records).map(([missionId, record]) => ({
        user_id: userId,
        mission_id: missionId,
        best_score: record.bestScore,
        completed: record.completed,
        accepted: record.accepted ?? false,
      }));
      if (rows.length === 0) return;
      const { error } = await table.upsert(rows);
      if (error) throw new Error(`Could not save mission_progress: ${error.message}`);
    },
  };
}
