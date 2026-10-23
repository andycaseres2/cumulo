import type { DomainScore, PracticeExamResult } from './PracticeExam';

/** One finished practice exam, as kept in the player's history. */
export interface ExamAttempt {
  /** Made on the device, so saving the same attempt again never duplicates it. */
  id: string;
  /** ISO date. */
  takenAt: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  durationSeconds: number;
  byDomain: DomainScore[];
}

/** Port: where the practice exam history is kept. */
export interface ExamAttemptStore {
  list(): Promise<ExamAttempt[]>;
  add(attempt: ExamAttempt): Promise<void>;
}

export function attemptFrom(result: PracticeExamResult, elapsedMs: number, takenAt: Date, id: string): ExamAttempt {
  return {
    id,
    takenAt: takenAt.toISOString(),
    score: result.score,
    correct: result.correct,
    total: result.total,
    passed: result.passed,
    durationSeconds: Math.round(elapsedMs / 1000),
    byDomain: result.byDomain,
  };
}

export interface ExamHistory {
  /** Newest first. */
  attempts: ExamAttempt[];
  count: number;
  passed: number;
  best: number | null;
  last: number | null;
}

export function examHistory(attempts: ExamAttempt[]): ExamHistory {
  const unique = [...new Map(attempts.map((attempt) => [attempt.id, attempt])).values()];
  const newestFirst = unique.sort((a, b) => b.takenAt.localeCompare(a.takenAt));
  return {
    attempts: newestFirst,
    count: newestFirst.length,
    passed: newestFirst.filter((attempt) => attempt.passed).length,
    best: newestFirst.length > 0 ? Math.max(...newestFirst.map((attempt) => attempt.score)) : null,
    last: newestFirst[0]?.score ?? null,
  };
}
