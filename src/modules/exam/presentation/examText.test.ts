import { describe, expect, it } from 'vitest';
import { EXAM_DOMAINS } from '../domain/ExamDomain';
import { EXAM_TASKS } from '../domain/ExamTask';
import { domainText, taskTitle } from './examText';

describe('exam text', () => {
  it('keeps the Spanish domain data in Spanish and uses the official guide wording in English', () => {
    const [first] = EXAM_DOMAINS;
    expect(domainText(first, 'es').title).toBe(first.title);
    expect(domainText(first, 'en').title).toBe('Cloud Concepts');
  });

  it('has an English title for every task statement', () => {
    for (const task of EXAM_TASKS) expect(taskTitle(task, 'en'), task.id).not.toBe(task.title);
  });
});
