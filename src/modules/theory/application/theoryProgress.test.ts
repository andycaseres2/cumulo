import { describe, expect, it } from 'vitest';
import type { TheoryProgressStore } from '../domain/TheoryProgress';
import { topic } from '../testing/fakes';
import { getTheoryOverview, recordQuizResult } from './theoryProgress';

function memoryStore(initial: string[] = []): TheoryProgressStore & { saved: string[] } {
  const state = { saved: [...initial] };
  return {
    get saved() {
      return state.saved;
    },
    load: async () => [...state.saved],
    save: async (slugs) => {
      state.saved = [...slugs];
    },
  };
}

describe('recordQuizResult', () => {
  it('completes the topic only when every question was answered right', async () => {
    const store = memoryStore();
    await expect(recordQuizResult(store, 'iam', { correct: 2, total: 3 })).resolves.toEqual({ completed: false });
    expect(store.saved).toEqual([]);

    await expect(recordQuizResult(store, 'iam', { correct: 3, total: 3 })).resolves.toEqual({ completed: true });
    expect(store.saved).toEqual(['iam']);
  });

  it('never loses a completed topic, even after a worse attempt', async () => {
    const store = memoryStore(['iam']);
    await expect(recordQuizResult(store, 'iam', { correct: 1, total: 3 })).resolves.toEqual({ completed: true });
    expect(store.saved).toEqual(['iam']);
  });
});

describe('getTheoryOverview', () => {
  it('counts completed topics in total and per exam domain, in exam order', async () => {
    const topics = [
      topic({ slug: 'a', domainId: 'cloud-concepts' }),
      topic({ slug: 'b', domainId: 'cloud-concepts' }),
      topic({ slug: 'c', domainId: 'security-compliance' }),
    ];
    const overview = await getTheoryOverview(memoryStore(['b', 'c', 'removed-topic']), topics);

    expect(overview).toMatchObject({ completed: 2, total: 3 });
    expect(overview.completedSlugs).toEqual(['b', 'c']);
    expect(overview.byDomain.map((d) => [d.domainId, d.completed, d.total])).toEqual([
      ['cloud-concepts', 1, 2],
      ['security-compliance', 1, 1],
    ]);
  });
});
