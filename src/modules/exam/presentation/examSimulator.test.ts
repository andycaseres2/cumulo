// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PracticeExam } from '../domain/PracticeExam';
import { renderExamSimulator } from './examSimulator';

const exam: PracticeExam = {
  questions: [
    { domainId: 'cloud-concepts', topicSlug: 'topic-a' },
    { domainId: 'security-compliance', topicSlug: 'topic-b' },
    { domainId: 'technology-services', topicSlug: 'topic-c' },
  ].map((q, n) => ({
    ...q,
    id: `q${n}`,
    domainId: q.domainId as PracticeExam['questions'][number]['domainId'],
    prompt: `Question ${n + 1}?`,
    options: [0, 1, 2, 3].map((o) => ({ label: `Q${n + 1} option ${o}`, explanation: `Why Q${n + 1} option ${o}`, correct: o === 1 })),
  })),
};

let host: HTMLElement;
const button = (text: string) => [...host.querySelectorAll('button')].find((b) => b.textContent?.trim().startsWith(text)) as HTMLButtonElement;
const answers = () => [...host.querySelectorAll<HTMLButtonElement>('[data-exam-option]')];
const text = () => host.textContent ?? '';

function start(overrides = {}) {
  const onFinished = vi.fn();
  renderExamSimulator(host, { createExam: () => exam, questionCount: 3, theoryUrl: (s) => `/teoria/${s}`, durationMinutes: 90, onFinished, ...overrides });
  button('Empezar simulacro').click();
  return onFinished;
}

describe('exam simulator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="host"></div>';
    host = document.getElementById('host')!;
  });
  afterEach(() => vi.useRealTimers());

  it('explains the rules before starting', () => {
    renderExamSimulator(host, { createExam: () => exam, questionCount: 3, theoryUrl: (s) => s, durationMinutes: 90 });
    expect(text()).toContain('3 preguntas');
    expect(text()).toContain('90 minutos');
    expect(button('Empezar simulacro')).toBeDefined();
  });

  it('shows one question at a time with a countdown, and remembers the chosen answer', () => {
    start();
    expect(text()).toContain('Pregunta 1 de 3');
    expect(host.querySelector('[data-exam-timer]')?.textContent).toBe('90:00');
    answers()[2].click();
    expect(answers()[2].getAttribute('aria-pressed')).toBe('true');

    button('Siguiente').click();
    expect(text()).toContain('Question 2?');
    button('Anterior').click();
    expect(answers()[2].getAttribute('aria-pressed')).toBe('true');

    vi.advanceTimersByTime(61_000);
    expect(host.querySelector('[data-exam-timer]')?.textContent).toBe('88:59');
  });

  it('marks questions for review and shows the state of each one in the navigator', () => {
    start();
    answers()[1].click();
    button('Siguiente').click();
    button('Marcar para revisar').click();
    const cells = [...host.querySelectorAll<HTMLButtonElement>('[data-exam-nav]')];
    expect(cells.map((c) => c.dataset.state)).toEqual(['answered', 'flagged', 'empty']);
    cells[2].click();
    expect(text()).toContain('Pregunta 3 de 3');
  });

  it('asks for confirmation when finishing with unanswered questions, then shows the results and review', () => {
    const onFinished = start();
    answers()[1].click();
    button('Terminar examen').click();
    expect(text()).toContain('2 preguntas sin responder');
    button('Terminar igual').click();

    expect(onFinished).toHaveBeenCalledWith(expect.objectContaining({ correct: 1, total: 3 }));
    expect(host.querySelector('[data-exam-score]')?.textContent).toBe('400');
    expect(text()).toContain('No aprobado');
    expect(host.querySelectorAll('[data-exam-review]')).toHaveLength(3);
    const second = host.querySelectorAll<HTMLElement>('[data-exam-review]')[1];
    expect(second.textContent).toContain('Sin responder');
    expect(second.textContent).toContain('Why Q2 option 1');
    expect(second.querySelector('a[href="/teoria/topic-b"]')).not.toBeNull();
  });

  it('submits on its own when the time runs out', () => {
    const onFinished = start({ durationMinutes: 1 });
    vi.advanceTimersByTime(60_000);
    expect(onFinished).toHaveBeenCalledOnce();
    expect(text()).toContain('Se acabó el tiempo');
  });

  it('asks the browser to confirm leaving only while an exam is in progress', () => {
    const leave = () => {
      const event = new Event('beforeunload', { cancelable: true });
      window.dispatchEvent(event);
      return event.defaultPrevented;
    };
    start();
    expect(leave()).toBe(true);
    button('Terminar examen').click();
    button('Terminar igual').click();
    expect(leave()).toBe(false);
  });

  it('starts a new exam from the results', () => {
    const createExam = vi.fn(() => exam);
    start({ createExam });
    button('Terminar examen').click();
    button('Terminar igual').click();
    button('Nuevo simulacro').click();
    expect(createExam).toHaveBeenCalledTimes(2);
    expect(text()).toContain('Pregunta 1 de 3');
  });
});
