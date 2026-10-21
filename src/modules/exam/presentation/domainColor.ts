import type { ExamDomainId } from '@/modules/exam/domain/ExamDomain';

/** Each exam domain has its own design token color. */
export function domainColor(id: ExamDomainId): string {
  return `var(--color-domain-${id})`;
}
