// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import type { ExamAttempt, ExamAttemptStore } from '../domain/ExamAttempt';
import { localAttemptQueue, supabaseExamAttemptStore, syncedExamAttemptStore, type ExamAttemptTable } from './examAttemptStores';

const attempt = (id: string, score = 700): ExamAttempt => ({
  id,
  takenAt: '2026-10-23T10:00:00.000Z',
  score,
  correct: 50,
  total: 65,
  passed: score >= 700,
  durationSeconds: 3000,
  byDomain: [{ domainId: 'cloud-concepts', correct: 12, total: 16 }],
});

function fakeTable(rows: Record<string, unknown>[] = [], failing = false): ExamAttemptTable & { rows: Record<string, unknown>[] } {
  return {
    rows,
    async select() {
      return failing ? { data: null, error: { message: 'offline' } } : { data: rows, error: null };
    },
    async upsert(row) {
      if (failing) return { error: { message: 'offline' } };
      rows.push({ ...row });
      return { error: null };
    },
  };
}

describe('supabaseExamAttemptStore', () => {
  it('saves an attempt with the player id and reads the rows back as attempts', async () => {
    const table = fakeTable();
    const store = supabaseExamAttemptStore(table, 'user-1');
    await store.add(attempt('a', 790));
    expect(table.rows[0]).toMatchObject({ id: 'a', user_id: 'user-1', score: 790, by_domain: attempt('a').byDomain, duration_seconds: 3000 });
    expect(await store.list()).toEqual([attempt('a', 790)]);
  });

  it('fails loudly when the table cannot be read', async () => {
    await expect(supabaseExamAttemptStore(fakeTable([], true), 'u').list()).rejects.toThrow('offline');
  });
});

describe('localAttemptQueue', () => {
  beforeEach(() => window.localStorage.clear());

  it('keeps attempts waiting to be uploaded, per key, until they are taken', async () => {
    const queue = localAttemptQueue('k');
    await queue.add(attempt('a'));
    expect((await queue.list()).map((a) => a.id)).toEqual(['a']);
    await queue.remove(['a']);
    expect(await queue.list()).toEqual([]);
  });
});

describe('syncedExamAttemptStore', () => {
  beforeEach(() => window.localStorage.clear());

  it('saves straight to the account when it answers', async () => {
    const table = fakeTable();
    const queue = localAttemptQueue('k');
    await syncedExamAttemptStore(supabaseExamAttemptStore(table, 'u'), queue).add(attempt('a'));
    expect(table.rows).toHaveLength(1);
    expect(await queue.list()).toEqual([]);
  });

  it('keeps the attempt on the device when the account is unavailable, and uploads it on the next read', async () => {
    const queue = localAttemptQueue('k');
    const offline: ExamAttemptStore = supabaseExamAttemptStore(fakeTable([], true), 'u');
    await syncedExamAttemptStore(offline, queue).add(attempt('a'));
    expect((await syncedExamAttemptStore(offline, queue).list()).map((a) => a.id)).toEqual(['a']);

    const table = fakeTable();
    const online = syncedExamAttemptStore(supabaseExamAttemptStore(table, 'u'), queue);
    expect((await online.list()).map((a) => a.id)).toEqual(['a']);
    expect(table.rows.map((r) => r.id)).toEqual(['a']);
    expect(await queue.list()).toEqual([]);
  });
});
