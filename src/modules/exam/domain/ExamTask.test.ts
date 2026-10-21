import { describe, expect, it } from 'vitest';
import { EXAM_DOMAIN_IDS } from './ExamDomain';
import { EXAM_TASKS, findExamTask } from './ExamTask';
import { IN_SCOPE_SERVICES, allInScopeServices } from './inScopeServices';

describe('CLF-C02 task statements', () => {
  it('lists the 19 task statements of the official guide, grouped by domain', () => {
    const perDomain = EXAM_DOMAIN_IDS.map((id) => EXAM_TASKS.filter((task) => task.domainId === id).length);
    expect(perDomain).toEqual([4, 4, 8, 3]);
    expect(EXAM_TASKS.map((task) => task.id)).toEqual([
      '1.1', '1.2', '1.3', '1.4',
      '2.1', '2.2', '2.3', '2.4',
      '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8',
      '4.1', '4.2', '4.3',
    ]);
  });

  it('finds a task by id and returns undefined for unknown ids', () => {
    expect(findExamTask('3.6')?.domainId).toBe('technology-services');
    expect(findExamTask('5.1')).toBeUndefined();
  });
});

describe('in-scope services', () => {
  it('has no duplicated service across categories', () => {
    const all = allInScopeServices();
    expect(new Set(all).size).toBe(all.length);
  });

  it('keeps every category non-empty', () => {
    expect(IN_SCOPE_SERVICES.every((category) => category.services.length > 0)).toBe(true);
  });
});
