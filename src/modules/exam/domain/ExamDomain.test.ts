import { describe, expect, it } from 'vitest';
import { EXAM_DOMAINS, findExamDomain } from './ExamDomain';

describe('CLF-C02 exam domains', () => {
  it('lists the four domains in exam order with their official weights', () => {
    expect(EXAM_DOMAINS.map((d) => [d.id, d.weight])).toEqual([
      ['cloud-concepts', 24],
      ['security-compliance', 30],
      ['technology-services', 34],
      ['billing-pricing-support', 12],
    ]);
  });

  it('weights add up to 100 percent', () => {
    expect(EXAM_DOMAINS.reduce((sum, d) => sum + d.weight, 0)).toBe(100);
  });

  it('finds a domain by id and returns undefined for unknown ids', () => {
    expect(findExamDomain('security-compliance')?.title).toBe('Seguridad y cumplimiento');
    expect(findExamDomain('unknown')).toBeUndefined();
  });
});
