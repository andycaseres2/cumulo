import { describe, expect, it } from 'vitest';
import { EXAM_TASKS } from '@/modules/exam/domain/ExamTask';
import { allInScopeServices } from '@/modules/exam/domain/inScopeServices';
import { inMemoryTopics, topic } from '../testing/fakes';
import { getTheoryCoverage } from './getTheoryCoverage';

describe('getTheoryCoverage', () => {
  it('reports which exam tasks have no topic yet and which topics cover each task', async () => {
    const coverage = await getTheoryCoverage(
      inMemoryTopics([
        topic({ slug: 'benefits', examTasks: ['1.1'] }),
        topic({ slug: 'deployment', examTasks: ['1.1', '3.1'] }),
      ]),
    );

    expect(coverage.tasks.find((t) => t.task.id === '1.1')?.topics.map((t) => t.slug)).toEqual(['benefits', 'deployment']);
    expect(coverage.missingTasks.map((t) => t.id)).not.toContain('1.1');
    expect(coverage.missingTasks.map((t) => t.id)).toContain('2.1');
    expect(coverage.missingTasks).toHaveLength(EXAM_TASKS.length - 2);
  });

  it('counts in-scope services mentioned by topics and lists the missing ones', async () => {
    const coverage = await getTheoryCoverage(
      inMemoryTopics([topic({ slug: 'storage', services: ['Amazon S3', 'Amazon EBS', 'Not In Scope'] })]),
    );

    expect(coverage.totalServices).toBe(allInScopeServices().length);
    expect(coverage.coveredServices).toBe(2);
    expect(coverage.missingServices).not.toContain('Amazon S3');
    expect(coverage.missingServices).toContain('AWS Lambda');
  });

  it('is complete when every task and service is covered', async () => {
    const coverage = await getTheoryCoverage(
      inMemoryTopics([
        topic({ slug: 'everything', examTasks: EXAM_TASKS.map((t) => t.id), services: allInScopeServices() }),
      ]),
    );

    expect(coverage.isComplete).toBe(true);
  });
});
