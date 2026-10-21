import type { Topic } from '../domain/Topic';
import type { TopicRepository } from '../domain/TopicRepository';

export function topic(overrides: Partial<Topic> & Pick<Topic, 'slug'>): Topic {
  return {
    title: overrides.slug,
    summary: 'Summary',
    domainId: 'cloud-concepts',
    order: 1,
    services: [],
    readingMinutes: 5,
    ...overrides,
  };
}

export function inMemoryTopics(topics: Topic[]): TopicRepository {
  return { findAll: async () => [...topics] };
}
