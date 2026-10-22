import { EXAM_DOMAINS, type ExamDomainId } from '@/modules/exam/domain/ExamDomain';
import type { TheoryProgressStore } from '../domain/TheoryProgress';
import type { Topic } from '../domain/Topic';

/** Records a quiz attempt. A topic is completed when every question was answered right, and stays completed. */
export async function recordQuizResult(
  store: TheoryProgressStore,
  slug: string,
  { correct, total }: { correct: number; total: number },
): Promise<{ completed: boolean }> {
  const completed = await store.load();
  if (completed.includes(slug)) return { completed: true };
  if (correct < total) return { completed: false };
  await store.save([...completed, slug]);
  return { completed: true };
}

export interface DomainProgress {
  domainId: ExamDomainId;
  completed: number;
  total: number;
}

export interface TheoryOverview {
  completed: number;
  total: number;
  /** Completed slugs of topics that still exist. */
  completedSlugs: string[];
  /** Exam domains that have topics, in exam order. */
  byDomain: DomainProgress[];
}

/** How much of the theory the player completed, overall and per exam domain. */
export async function getTheoryOverview(store: TheoryProgressStore, topics: Topic[]): Promise<TheoryOverview> {
  const saved = new Set(await store.load());
  const done = topics.filter((t) => saved.has(t.slug));
  const byDomain = EXAM_DOMAINS.map((d) => ({
    domainId: d.id,
    completed: done.filter((t) => t.domainId === d.id).length,
    total: topics.filter((t) => t.domainId === d.id).length,
  })).filter((d) => d.total > 0);
  return { completed: done.length, total: topics.length, completedSlugs: done.map((t) => t.slug), byDomain };
}
