/**
 * Composition root for the practice exam history. Client-side only.
 * Attempts are kept in the player's Supabase account; one that cannot be uploaded waits in the browser.
 */
import { STORAGE_PREFIX } from '@/infrastructure/storage/renameStoragePrefix';
import { supabase } from '@/infrastructure/supabase/client';
import type { ExamAttemptStore } from '@/modules/exam/domain/ExamAttempt';
import { localAttemptQueue, supabaseExamAttemptStore, syncedExamAttemptStore } from '@/modules/exam/infrastructure/examAttemptStores';

let store: Promise<ExamAttemptStore | null> | undefined;

async function createStore(): Promise<ExamAttemptStore | null> {
  const client = supabase();
  const userId = client ? (await client.auth.getSession()).data.session?.user.id : undefined;
  if (!client || !userId) return null;
  const remote = supabaseExamAttemptStore(
    {
      select: async () =>
        await client
          .from('exam_attempts')
          .select('id, taken_at, score, correct, total, passed, duration_seconds, by_domain')
          .order('taken_at', { ascending: false })
          .limit(50),
      // Attempts are never edited: saving one again (a retried upload) is ignored.
      upsert: async (row) => await client.from('exam_attempts').upsert(row, { onConflict: 'id', ignoreDuplicates: true }),
    },
    userId,
  );
  return syncedExamAttemptStore(remote, localAttemptQueue(`${STORAGE_PREFIX}exam-attempts:${userId}`));
}

/** The signed-in player's practice exam history, or null for guests (the exam needs an account). */
export function examAttemptStore(): Promise<ExamAttemptStore | null> {
  store ??= createStore();
  return store;
}
