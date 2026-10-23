import { emptyDuelProgress, mergeDuelProgress, type DuelProgress, type DuelProgressStore } from '../domain/DuelProgress';

/** Progress read from storage or the network, keeping only well-formed values. */
export function parseDuelProgress(value: unknown): DuelProgress {
  const raw = (value ?? {}) as Partial<Record<keyof DuelProgress, unknown>>;
  const practice = raw.bestPractice && typeof raw.bestPractice === 'object' ? (raw.bestPractice as Record<string, unknown>) : {};
  return {
    beatenRivals: Array.isArray(raw.beatenRivals) ? raw.beatenRivals.filter((id): id is string => typeof id === 'string') : [],
    bestTimeAttack: typeof raw.bestTimeAttack === 'number' && raw.bestTimeAttack >= 0 ? raw.bestTimeAttack : 0,
    bestPractice: Object.fromEntries(
      Object.entries(practice).filter((entry): entry is [string, number] => typeof entry[1] === 'number' && entry[1] >= 0 && entry[1] <= 1),
    ),
  };
}

/** Adapter: duel progress in this browser under `key`. Storage can be blocked, so every access is guarded. */
export function localDuelProgressStore(key: string): DuelProgressStore {
  return {
    async load() {
      try {
        return parseDuelProgress(JSON.parse(window.localStorage.getItem(key) ?? 'null'));
      } catch {
        return emptyDuelProgress();
      }
    },
    async save(progress) {
      try {
        window.localStorage.setItem(key, JSON.stringify(progress));
      } catch {
        // Lost on reload when storage is unavailable; the current page still works.
      }
    },
  };
}

interface DuelProgressRow {
  user_id: string;
  beaten_rivals: string[];
  best_time_attack: number;
  best_practice: Record<string, number>;
}

/** The two queries this adapter needs on the `duel_progress` table (kept narrow so tests can fake them). */
export interface DuelProgressTable {
  /** Row Level Security limits the result to the signed-in player's row. */
  select(): Promise<{ data: unknown[] | null; error: { message: string } | null }>;
  upsert(row: DuelProgressRow): Promise<{ error: { message: string } | null }>;
}

/** Adapter: one row per player in the Supabase table `duel_progress` (see supabase/migrations). */
export function supabaseDuelProgressStore(table: DuelProgressTable, userId: string): DuelProgressStore {
  return {
    async load() {
      const { data, error } = await table.select();
      if (error) throw new Error(`Could not read duel_progress: ${error.message}`);
      const row = (data?.[0] ?? null) as Partial<DuelProgressRow> | null;
      return parseDuelProgress(row && { beatenRivals: row.beaten_rivals, bestTimeAttack: row.best_time_attack, bestPractice: row.best_practice });
    },
    async save(progress) {
      const { error } = await table.upsert({
        user_id: userId,
        beaten_rivals: progress.beatenRivals,
        best_time_attack: progress.bestTimeAttack,
        best_practice: progress.bestPractice,
      });
      if (error) throw new Error(`Could not save duel_progress: ${error.message}`);
    },
  };
}

/**
 * Account copy (`remote`) plus device copy (`local`), joined on every load so nothing achieved is lost.
 * When the account is unavailable (no table yet, offline) the device copy keeps working and is uploaded later.
 */
export function syncedDuelProgressStore(remote: DuelProgressStore, local: DuelProgressStore): DuelProgressStore {
  return {
    async load() {
      const onDevice = await local.load();
      try {
        const joined = mergeDuelProgress(await remote.load(), onDevice);
        await local.save(joined);
        await remote.save(joined);
        return joined;
      } catch {
        return onDevice;
      }
    },
    async save(progress) {
      await local.save(progress);
      try {
        await remote.save(progress);
      } catch {
        // Kept on the device; uploaded on the next successful load.
      }
    },
  };
}
