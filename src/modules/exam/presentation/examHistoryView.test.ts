// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { examHistory, type ExamAttempt } from '../domain/ExamAttempt';
import { renderExamHistory } from './examHistoryView';

const attempt = (id: string, takenAt: string, score: number, passed: boolean): ExamAttempt => ({
  id,
  takenAt,
  score,
  correct: 48,
  total: 65,
  passed,
  durationSeconds: 3725,
  byDomain: [{ domainId: 'cloud-concepts', correct: 12, total: 16 }],
});
const history = examHistory([attempt('a', '2026-10-20T15:00:00Z', 640, false), attempt('b', '2026-10-22T15:00:00Z', 790, true)]);

describe('renderExamHistory', () => {
  it('lists the attempts newest first with score, result, answers, time and domains', () => {
    const host = document.createElement('div');
    renderExamHistory(host, history);
    expect(host.querySelector('[data-history-summary]')!.textContent).toContain('2 intentos · 1 aprobado');
    expect(host.querySelector('[data-history-best]')!.textContent).toContain('790');
    const items = [...host.querySelectorAll<HTMLElement>('[data-attempt]')];
    expect(items.map((i) => i.dataset.attempt)).toEqual(['b', 'a']);
    expect(items[0].textContent).toContain('790');
    expect(items[0].textContent).toContain('Aprobado');
    expect(items[1].textContent).toContain('No aprobado');
    expect(items[0].textContent).toContain('48 de 65 correctas');
    expect(items[0].textContent).toContain('62 min 05 s');
    expect(items[0].textContent).toContain('Conceptos de la nube 12/16');
  });

  it('shows only the latest attempts and a link when a limit is given', () => {
    const host = document.createElement('div');
    renderExamHistory(host, history, { limit: 1, moreUrl: '/es/practice-exam' });
    expect(host.querySelectorAll('[data-attempt]')).toHaveLength(1);
    expect(host.querySelector('a')!.getAttribute('href')).toBe('/es/practice-exam');
  });

  it('invites to take the first exam when there are no attempts', () => {
    const host = document.createElement('div');
    renderExamHistory(host, examHistory([]));
    expect(host.textContent).toContain('Aún no tienes intentos');
  });

  it('speaks English on English pages', () => {
    const host = document.createElement('div');
    renderExamHistory(host, history, { locale: 'en' });
    expect(host.textContent).toContain('2 attempts · 1 passed');
    expect(host.textContent).toContain('48 of 65 correct');
    expect(host.textContent).toContain('Cloud Concepts 12/16');
  });
});
