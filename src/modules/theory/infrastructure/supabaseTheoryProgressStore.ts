import type { TheoryProgressStore } from '../domain/TheoryProgress';

interface TheoryProgressRow {
  user_id: string;
  topic_slug: string;
}

/** The two queries this adapter needs on the `theory_progress` table (kept narrow so tests can fake them). */
export interface TheoryProgressTable {
  /** Row Level Security limits the result to the signed-in player's rows. */
  select(): Promise<{ data: unknown[] | null; error: { message: string } | null }>;
  upsert(rows: TheoryProgressRow[]): Promise<{ error: { message: string } | null }>;
}

/** Adapter: completed topics in the player's Supabase account (table `theory_progress`, see supabase/migrations). */
export function supabaseTheoryProgressStore(table: TheoryProgressTable, userId: string): TheoryProgressStore {
  return {
    async load() {
      const { data, error } = await table.select();
      if (error) throw new Error(`Could not read theory_progress: ${error.message}`);
      return ((data ?? []) as Pick<TheoryProgressRow, 'topic_slug'>[]).map((row) => row.topic_slug);
    },
    async save(slugs) {
      if (slugs.length === 0) return;
      const { error } = await table.upsert(slugs.map((slug) => ({ user_id: userId, topic_slug: slug })));
      if (error) throw new Error(`Could not save theory_progress: ${error.message}`);
    },
  };
}
