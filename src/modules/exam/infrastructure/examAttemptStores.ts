import { EXAM_DOMAIN_IDS } from '../domain/ExamDomain';
import type { ExamAttempt, ExamAttemptStore } from '../domain/ExamAttempt';
import type { DomainScore } from '../domain/PracticeExam';

interface ExamAttemptRow {
  id: string;
  user_id: string;
  taken_at: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  duration_seconds: number;
  by_domain: DomainScore[];
}

/** The two queries this adapter needs on the `exam_attempts` table (kept narrow so tests can fake them). */
export interface ExamAttemptTable {
  /** Row Level Security limits the result to the signed-in player's rows. */
  select(): Promise<{ data: unknown[] | null; error: { message: string } | null }>;
  upsert(row: ExamAttemptRow): Promise<{ error: { message: string } | null }>;
}

const isDomainScore = (value: unknown): value is DomainScore => {
  const score = value as Partial<DomainScore>;
  return EXAM_DOMAIN_IDS.includes(score?.domainId as never) && typeof score.correct === 'number' && typeof score.total === 'number';
};

/** An attempt read from storage or the network; null when it is not well formed. */
function parseAttempt(value: unknown): ExamAttempt | null {
  const a = value as Partial<ExamAttempt>;
  if (typeof a?.id !== 'string' || typeof a.takenAt !== 'string' || typeof a.score !== 'number') return null;
  return {
    id: a.id,
    takenAt: a.takenAt,
    score: a.score,
    correct: Number(a.correct) || 0,
    total: Number(a.total) || 0,
    passed: Boolean(a.passed),
    durationSeconds: Number(a.durationSeconds) || 0,
    byDomain: Array.isArray(a.byDomain) ? a.byDomain.filter(isDomainScore) : [],
  };
}

/** Adapter: the player's attempts in the Supabase table `exam_attempts` (see supabase/migrations). */
export function supabaseExamAttemptStore(table: ExamAttemptTable, userId: string): ExamAttemptStore {
  return {
    async list() {
      const { data, error } = await table.select();
      if (error) throw new Error(`Could not read exam_attempts: ${error.message}`);
      return ((data ?? []) as Partial<ExamAttemptRow>[]).flatMap((row) => {
        const attempt = parseAttempt({
          id: row.id,
          takenAt: row.taken_at,
          score: row.score,
          correct: row.correct,
          total: row.total,
          passed: row.passed,
          durationSeconds: row.duration_seconds,
          byDomain: row.by_domain,
        });
        return attempt ? [attempt] : [];
      });
    },
    async add(attempt) {
      const { error } = await table.upsert({
        id: attempt.id,
        user_id: userId,
        taken_at: attempt.takenAt,
        score: attempt.score,
        correct: attempt.correct,
        total: attempt.total,
        passed: attempt.passed,
        duration_seconds: attempt.durationSeconds,
        by_domain: attempt.byDomain,
      });
      if (error) throw new Error(`Could not save exam_attempts: ${error.message}`);
    },
  };
}

/** Attempts finished while the account was unreachable, kept in this browser under `key` until uploaded. */
export function localAttemptQueue(key: string) {
  const read = (): ExamAttempt[] => {
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]');
      return Array.isArray(parsed) ? parsed.flatMap((value) => parseAttempt(value) ?? []) : [];
    } catch {
      return [];
    }
  };
  const write = (attempts: ExamAttempt[]) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(attempts));
    } catch {
      // Without storage the attempt only lasts while the page is open.
    }
  };
  return {
    list: async () => read(),
    add: async (attempt: ExamAttempt) => write([...read().filter((a) => a.id !== attempt.id), attempt]),
    remove: async (ids: string[]) => write(read().filter((a) => !ids.includes(a.id))),
  };
}

/**
 * Account history (`remote`) with a device queue: an attempt that cannot reach the account waits on the
 * device and is uploaded on the next read; the ids make the upload safe to repeat.
 */
export function syncedExamAttemptStore(remote: ExamAttemptStore, queue: ReturnType<typeof localAttemptQueue>): ExamAttemptStore {
  return {
    async list() {
      const pending = await queue.list();
      try {
        const uploaded: string[] = [];
        for (const attempt of pending) {
          await remote.add(attempt);
          uploaded.push(attempt.id);
        }
        await queue.remove(uploaded);
        return await remote.list();
      } catch {
        return pending;
      }
    },
    async add(attempt) {
      try {
        await remote.add(attempt);
      } catch {
        await queue.add(attempt);
      }
    },
  };
}
