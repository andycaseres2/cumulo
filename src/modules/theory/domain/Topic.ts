import { findExamDomain, type ExamDomainId } from '@/modules/exam/domain/ExamDomain';

export interface Topic {
  slug: string;
  title: string;
  summary: string;
  domainId: ExamDomainId;
  /** Position inside its exam domain, starting at 1. */
  order: number;
  services: string[];
  readingMinutes: number;
}

/** Study order: exam domain first, then the topic's order inside it. */
export function compareTopics(a: Topic, b: Topic): number {
  const byDomain = (findExamDomain(a.domainId)?.order ?? 0) - (findExamDomain(b.domainId)?.order ?? 0);
  return byDomain !== 0 ? byDomain : a.order - b.order;
}
