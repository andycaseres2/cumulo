// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { QuizQuestion } from '../domain/TheoryProgress';
import { renderTopicQuiz, type TopicQuizOptions } from './topicQuiz';

const question = (n: number, correctIndex: number): QuizQuestion => ({
  prompt: `Question ${n}?`,
  options: [0, 1, 2, 3].map((i) => ({
    label: `Q${n} option ${i}`,
    explanation: `Explanation of Q${n} option ${i}`,
    correct: i === correctIndex,
  })),
});
const questions = [question(1, 2), question(2, 0), question(3, 3)];

let host: HTMLElement;
const flush = () => new Promise((r) => setTimeout(r, 0));
const card = (n: number) => host.querySelectorAll<HTMLElement>('[data-question]')[n - 1];
const choose = (n: number, i: number) => card(n).querySelectorAll<HTMLButtonElement>('[data-answer]')[i].click();
const result = () => host.querySelector<HTMLElement>('[data-quiz-result]')!;

function render(overrides: Partial<TopicQuizOptions> = {}) {
  const options: TopicQuizOptions = {
    questions,
    completed: false,
    signedIn: true,
    onFinished: vi.fn(async ({ correct, total }) => ({ completed: correct === total })),
    onSignIn: vi.fn(),
    ...overrides,
  };
  renderTopicQuiz(host, options);
  return options;
}

describe('topic quiz', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="host"></div>';
    host = document.getElementById('host')!;
  });

  it('shows the three questions with four answers each and no result yet', () => {
    render();
    expect(host.querySelectorAll('[data-question]')).toHaveLength(3);
    expect(card(1).querySelectorAll('[data-answer]')).toHaveLength(4);
    expect(card(1).textContent).toContain('Question 1?');
    expect(result().hidden).toBe(true);
  });

  it('after answering, locks the question and explains the chosen and the correct answer', () => {
    render();
    choose(1, 0);
    const answers = [...card(1).querySelectorAll<HTMLButtonElement>('[data-answer]')];
    expect(answers.every((a) => a.disabled)).toBe(true);
    expect(answers[0].dataset.state).toBe('wrong');
    expect(answers[2].dataset.state).toBe('right');
    expect(card(1).textContent).toContain('Explanation of Q1 option 0');
    expect(card(1).textContent).toContain('Explanation of Q1 option 2');
  });

  it('completes the topic when the three answers are right', async () => {
    const options = render();
    choose(1, 2);
    choose(2, 0);
    choose(3, 3);
    await flush();
    expect(options.onFinished).toHaveBeenCalledWith({ correct: 3, total: 3 });
    expect(result().hidden).toBe(false);
    expect(result().textContent).toContain('3 de 3');
    expect(result().textContent).toContain('Tema completado');
  });

  it('lets the player retry after a mistake', async () => {
    render();
    choose(1, 0);
    choose(2, 0);
    choose(3, 3);
    await flush();
    expect(result().textContent).toContain('2 de 3');
    [...result().querySelectorAll('button')].find((b) => b.textContent?.includes('Intentar de nuevo'))!.click();
    expect(result().hidden).toBe(true);
    expect(card(1).querySelector<HTMLButtonElement>('[data-answer]')!.disabled).toBe(false);
  });

  it('marks a topic completed before and invites guests to sign in to keep their progress', async () => {
    const options = render({ completed: true, signedIn: false });
    expect(host.querySelector('[data-quiz-status]')?.textContent).toContain('Tema completado');
    choose(1, 2);
    choose(2, 0);
    choose(3, 3);
    await flush();
    expect(result().textContent).toContain('se guarda en este navegador');
    [...result().querySelectorAll('button')].find((b) => b.textContent?.includes('Ingresar'))!.click();
    expect(options.onSignIn).toHaveBeenCalledOnce();
  });

  it('speaks English when asked, and the English sign-in button still signs in', async () => {
    const options = render({ signedIn: false, locale: 'en' });
    expect(host.textContent).toContain('Test what you learned');
    choose(1, 2);
    choose(2, 0);
    choose(3, 3);
    await flush();
    expect(result().textContent).toContain('3 of 3 correct');
    [...result().querySelectorAll('button')].find((b) => b.textContent === 'Sign in')!.click();
    expect(options.onSignIn).toHaveBeenCalledOnce();
  });
});
