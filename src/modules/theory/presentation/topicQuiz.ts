import type { QuizQuestion } from '../domain/TheoryProgress';
import './topicQuiz.css';

export interface TopicQuizOptions {
  questions: QuizQuestion[];
  /** Whether the player already completed this topic. */
  completed: boolean;
  /** Guests keep their progress in the browser and are invited to sign in. */
  signedIn: boolean;
  /** Saves the attempt; resolves with whether the topic is now completed. */
  onFinished: (result: { correct: number; total: number }) => Promise<{ completed: boolean }>;
  onSignIn: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

const COMPLETED_BADGE = '✓ Tema completado';

/** The three questions at the end of a theory topic: answer, read why, and complete the topic with all of them right. */
export function renderTopicQuiz(host: HTMLElement, options: TopicQuizOptions): void {
  const { questions } = options;
  const answers: (boolean | null)[] = questions.map(() => null);
  const status = el('p', { class: 'tq-status', 'data-quiz-status': '' }, options.completed ? [COMPLETED_BADGE] : []);
  status.hidden = !options.completed;
  const result = el('div', { class: 'tq-result', 'data-quiz-result': '', role: 'status' });
  result.hidden = true;
  const list = el('ol', { class: 'tq-questions' });

  function renderQuestion(index: number): HTMLElement {
    const q = questions[index];
    const feedback = el('div', { class: 'tq-feedback' });
    const buttons = q.options.map((option, i) =>
      el('button', { type: 'button', class: 'tq-answer', 'data-answer': '' }, [
        el('span', { class: 'tq-letter', 'aria-hidden': 'true' }, [LETTERS[i]]),
        el('span', {}, [option.label]),
      ]),
    );
    buttons.forEach((button, i) =>
      button.addEventListener('click', () => {
        const chosen = q.options[i];
        answers[index] = chosen.correct;
        q.options.forEach((option, j) => {
          buttons[j].disabled = true;
          if (option.correct) buttons[j].dataset.state = 'right';
          else if (j === i) buttons[j].dataset.state = 'wrong';
        });
        const right = q.options.find((o) => o.correct)!;
        feedback.replaceChildren(
          el('p', { class: chosen.correct ? 'tq-verdict is-right' : 'tq-verdict is-wrong' }, [chosen.correct ? '¡Correcto!' : 'No es correcto.']),
          el('p', {}, [chosen.explanation]),
          ...(chosen.correct ? [] : [el('p', {}, [el('strong', {}, [`${right.label}: `]), right.explanation])]),
        );
        if (answers.every((a) => a !== null)) void finish();
      }),
    );
    return el('li', { class: 'tq-question', 'data-question': '' }, [
      el('p', { class: 'tq-prompt' }, [q.prompt]),
      el('div', { class: 'tq-answers' }, buttons),
      feedback,
    ]);
  }

  function reset() {
    answers.fill(null);
    list.replaceChildren(...questions.map((_, i) => renderQuestion(i)));
    result.hidden = true;
  }

  async function finish() {
    const correct = answers.filter(Boolean).length;
    const total = questions.length;
    const { completed } = await options.onFinished({ correct, total });
    const children: (Node | string)[] = [el('p', { class: 'tq-score' }, [`${correct} de ${total} correctas`])];
    if (correct === total) {
      children.push(el('p', {}, ['¡Tema completado! Dominas lo esencial de este tema.']));
    } else {
      children.push(
        el('p', {}, ['Repasa las explicaciones y vuelve a intentarlo: el tema se completa con todas las respuestas correctas.']),
        el('button', { type: 'button', class: 'tq-action' }, ['Intentar de nuevo']),
      );
    }
    if (completed && !options.signedIn) {
      children.push(
        el('div', { class: 'tq-guest' }, [
          el('p', {}, ['Tu avance se guarda en este navegador. Ingresa para guardarlo en tu cuenta y verlo en cualquier dispositivo.']),
          el('button', { type: 'button', class: 'tq-action' }, ['Ingresar']),
        ]),
      );
    }
    result.replaceChildren(...children);
    for (const button of result.querySelectorAll('button')) {
      button.addEventListener('click', () => (button.textContent === 'Ingresar' ? options.onSignIn() : reset()));
    }
    result.hidden = false;
    if (completed) {
      status.replaceChildren(COMPLETED_BADGE);
      status.hidden = false;
    }
  }

  host.replaceChildren(
    el('section', { class: 'topic-quiz', 'aria-labelledby': 'topic-quiz-title' }, [
      el('div', { class: 'tq-header' }, [
        el('h2', { id: 'topic-quiz-title', class: 'tq-title' }, ['Pon a prueba lo que aprendiste']),
        status,
      ]),
      el('p', { class: 'tq-intro' }, ['Responde las tres preguntas. Si aciertas todas, el tema queda completado en tu progreso.']),
      list,
      result,
    ]),
  );
  reset();
}
