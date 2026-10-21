import { findExamDomain, type ExamDomain } from '@/modules/exam/domain/ExamDomain';
import { compareTopics, type Topic } from '../domain/Topic';
import type { TopicRepository } from '../domain/TopicRepository';

export interface TopicNavigation {
  topic: Topic;
  domain: ExamDomain;
  previous: Topic | null;
  next: Topic | null;
}

/** A topic with its domain and its neighbours in the overall study order. */
export async function getTopicNavigation(repository: TopicRepository, slug: string): Promise<TopicNavigation | null> {
  const topics = (await repository.findAll()).sort(compareTopics);
  const index = topics.findIndex((topic) => topic.slug === slug);
  if (index === -1) return null;
  const topic = topics[index];
  const domain = findExamDomain(topic.domainId);
  if (!domain) return null;
  return {
    topic,
    domain,
    previous: topics[index - 1] ?? null,
    next: topics[index + 1] ?? null,
  };
}
