import { describe, expect, it } from 'vitest';
import { attemptFrom, examHistory, type ExamAttempt } from './ExamAttempt';

const result = { correct: 50, total: 65, score: 790, passed: true, byDomain: [{ domainId: 'cloud-concepts' as const, correct: 12, total: 16 }] };

describe('attemptFrom', () => {
  it('keeps the result, how long it took and when, under an id of its own', () => {
    const attempt = attemptFrom(result, 61_500, new Date('2026-10-23T10:00:00Z'), 'id-1');
    expect(attempt).toEqual({
      id: 'id-1',
      takenAt: '2026-10-23T10:00:00.000Z',
      score: 790,
      correct: 50,
      total: 65,
      passed: true,
      durationSeconds: 62,
      byDomain: result.byDomain,
    });
  });
});

describe('examHistory', () => {
  const attempt = (id: string, takenAt: string, score: number, passed: boolean): ExamAttempt => ({
    id,
    takenAt,
    score,
    correct: 0,
    total: 65,
    passed,
    durationSeconds: 60,
    byDomain: [],
  });

  it('sums up the attempts, newest first, with the best and the last score', () => {
    const history = examHistory([
      attempt('a', '2026-10-20T10:00:00Z', 640, false),
      attempt('c', '2026-10-22T10:00:00Z', 720, true),
      attempt('b', '2026-10-21T10:00:00Z', 810, true),
    ]);
    expect(history.attempts.map((a) => a.id)).toEqual(['c', 'b', 'a']);
    expect(history).toMatchObject({ count: 3, passed: 2, best: 810, last: 720 });
  });

  it('has no scores without attempts', () => {
    expect(examHistory([])).toMatchObject({ count: 0, passed: 0, best: null, last: null });
  });

  it('counts an attempt saved twice once', () => {
    expect(examHistory([attempt('a', '2026-10-20T10:00:00Z', 640, false), attempt('a', '2026-10-20T10:00:00Z', 640, false)]).count).toBe(1);
  });
});
