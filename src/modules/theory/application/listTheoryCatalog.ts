import { EXAM_DOMAINS, type ExamDomain } from '@/modules/exam/domain/ExamDomain';
import { compareTopics, type Topic } from '../domain/Topic';
import type { TopicRepository } from '../domain/TopicRepository';

export interface DomainSection {
  domain: ExamDomain;
  topics: Topic[];
}

/** Every exam domain, in exam order, with its topics in study order. */
export async function listTheoryCatalog(repository: TopicRepository): Promise<DomainSection[]> {
  const topics = (await repository.findAll()).sort(compareTopics);
  return EXAM_DOMAINS.map((domain) => ({
    domain,
    topics: topics.filter((topic) => topic.domainId === domain.id),
  }));
}
