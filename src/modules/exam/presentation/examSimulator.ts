import { findExamDomain } from '../domain/ExamDomain';
import { EXAM_FORMAT } from '../domain/ExamFormat';
import { scorePracticeExam, type PracticeExam, type PracticeExamResult } from '../domain/PracticeExam';
import './examSimulator.css';

export interface ExamSimulatorOptions {
  /** Draws a new exam each time the player starts one. */
  createExam: () => PracticeExam;
  /** How many questions each exam has, shown before starting. */
  questionCount: number;
  theoryUrl: (slug: string) => string;
  durationMinutes: number;
  onFinished?: (result: PracticeExamResult) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function button(label: string, onClick: () => void, attrs: Record<string, string> = {}) {
  const node = el('button', { type: 'button', ...attrs }, [label]);
  node.addEventListener('click', onClick);
  return node;
}

const clock = (ms: number) => {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
};

/** Full practice exam: rules, one question at a time with a countdown, then the estimated score and a review. */
export function renderExamSimulator(host: HTMLElement, options: ExamSimulatorOptions): void {
  const root = el('section', { class: 'exam-simulator' });
  host.replaceChildren(root);
  let timer: ReturnType<typeof setInterval> | undefined;

  function showIntro() {
    root.replaceChildren(
      el('div', { class: 'es-card es-intro' }, [
        el('h2', { class: 'es-title' }, ['Simulacro del examen CLF-C02']),
        el('ul', { class: 'es-rules' }, [
          el('li', {}, [`${options.questionCount} preguntas de los cuatro dominios, en la proporción oficial del examen.`]),
          el('li', {}, [`${options.durationMinutes} minutos. Al terminar el tiempo, el examen se entrega solo.`]),
          el('li', {}, ['Puedes avanzar, volver y marcar preguntas para revisarlas antes de terminar.']),
          el('li', {}, [
            `Al final ves un puntaje estimado en la escala ${EXAM_FORMAT.minScore}–${EXAM_FORMAT.maxScore} (se aprueba con ${EXAM_FORMAT.passingScore}) y el repaso de cada pregunta.`,
          ]),
        ]),
        el('p', { class: 'es-note' }, [
          'Es una estimación: el examen real incluye 15 preguntas que no puntúan, preguntas de respuesta múltiple y una escala que AWS no publica.',
        ]),
        button('Empezar simulacro', start, { class: 'es-primary' }),
      ]),
    );
  }

  function start() {
    const exam = options.createExam();
    const answers: (number | null)[] = exam.questions.map(() => null);
    const flagged = new Set<number>();
    let current = 0;
    let finished = false;
    const deadline = Date.now() + options.durationMinutes * 60_000;
    // Closing or reloading the tab mid-exam loses the answers, so the browser asks first.
    const leaving = new AbortController();
    window.addEventListener(
      'beforeunload',
      (event) => {
        // A simulator that was removed from the page no longer holds the visitor back.
        if (root.isConnected) event.preventDefault();
        else leaving.abort();
      },
      { signal: leaving.signal },
    );

    const timerText = el('span', { class: 'es-timer', 'data-exam-timer': '', 'aria-live': 'off' }, [clock(deadline - Date.now())]);
    const body = el('div', { class: 'es-question' });
    const nav = el('div', { class: 'es-nav', role: 'group', 'aria-label': 'Ir a una pregunta' });
    const confirm = el('div', { class: 'es-confirm', role: 'alertdialog', 'aria-live': 'assertive' });
    confirm.hidden = true;

    function renderNav() {
      nav.replaceChildren(
        ...exam.questions.map((_, i) => {
          const state = flagged.has(i) ? 'flagged' : answers[i] !== null ? 'answered' : 'empty';
          const cell = button(String(i + 1), () => go(i), { class: 'es-nav-cell', 'data-exam-nav': '', 'data-state': state, 'aria-label': `Pregunta ${i + 1}` });
          if (i === current) cell.setAttribute('aria-current', 'step');
          cell.dataset.state = state;
          return cell;
        }),
      );
    }

    function renderQuestion() {
      const q = exam.questions[current];
      const domain = findExamDomain(q.domainId);
      body.replaceChildren(
        el('p', { class: 'es-progress' }, [`Pregunta ${current + 1} de ${exam.questions.length}`, el('span', { class: 'es-domain' }, [domain?.title ?? ''])]),
        el('p', { class: 'es-prompt' }, [q.prompt]),
        el(
          'div',
          { class: 'es-options' },
          q.options.map((option, i) => {
            const node = el('button', { type: 'button', class: 'es-option', 'data-exam-option': '', 'aria-pressed': String(answers[current] === i) }, [
              el('span', { class: 'es-letter', 'aria-hidden': 'true' }, [LETTERS[i]]),
              el('span', {}, [option.label]),
            ]);
            node.addEventListener('click', () => {
              answers[current] = i;
              renderQuestion();
            });
            return node;
          }),
        ),
        el('div', { class: 'es-actions' }, [
          button('Anterior', () => go(current - 1), { class: 'es-secondary', ...(current === 0 ? { disabled: '' } : {}) }),
          button(flagged.has(current) ? 'Quitar marca' : 'Marcar para revisar', () => {
            if (flagged.has(current)) flagged.delete(current);
            else flagged.add(current);
            renderQuestion();
          }, { class: 'es-secondary' }),
          current < exam.questions.length - 1
            ? button('Siguiente', () => go(current + 1), { class: 'es-primary' })
            : button('Revisar y terminar', askToFinish, { class: 'es-primary' }),
        ]),
      );
      renderNav();
    }

    function go(index: number) {
      current = Math.min(Math.max(index, 0), exam.questions.length - 1);
      confirm.hidden = true;
      renderQuestion();
    }

    function askToFinish() {
      const unanswered = answers.filter((a) => a === null).length;
      if (unanswered === 0) {
        finish(false);
        return;
      }
      confirm.replaceChildren(
        el('p', {}, [`Tienes ${unanswered} ${unanswered === 1 ? 'pregunta' : 'preguntas'} sin responder. Cuentan como incorrectas.`]),
        el('div', { class: 'es-actions' }, [
          button('Seguir respondiendo', () => (confirm.hidden = true), { class: 'es-secondary' }),
          button('Terminar igual', () => finish(false), { class: 'es-primary' }),
        ]),
      );
      confirm.hidden = false;
    }

    function finish(timeUp: boolean) {
      if (finished) return;
      finished = true;
      clearInterval(timer);
      leaving.abort();
      const result = scorePracticeExam(exam, answers);
      options.onFinished?.(result);
      showResults(exam, answers, result, timeUp);
    }

    root.replaceChildren(
      el('div', { class: 'es-card es-exam' }, [
        el('div', { class: 'es-topbar' }, [
          el('span', { class: 'es-timer-label' }, ['Tiempo restante ', timerText]),
          button('Terminar examen', askToFinish, { class: 'es-secondary' }),
        ]),
        confirm,
        body,
        el('p', { class: 'es-nav-label' }, ['Preguntas']),
        nav,
      ]),
    );
    renderQuestion();

    clearInterval(timer);
    timer = setInterval(() => {
      if (!root.isConnected) {
        clearInterval(timer);
        leaving.abort();
        return;
      }
      const left = deadline - Date.now();
      timerText.textContent = clock(left);
      if (left <= 0) finish(true);
    }, 1000);
  }

  function showResults(exam: PracticeExam, answers: (number | null)[], result: PracticeExamResult, timeUp: boolean) {
    root.replaceChildren(
      el('div', { class: 'es-card es-results' }, [
        ...(timeUp ? [el('p', { class: 'es-timeup' }, ['Se acabó el tiempo: el examen se entregó con tus respuestas hasta ese momento.'])] : []),
        el('p', { class: 'es-score-label' }, ['Puntaje estimado']),
        el('p', { class: result.passed ? 'es-score is-pass' : 'es-score is-fail' }, [
          el('span', { 'data-exam-score': '' }, [String(result.score)]),
          el('span', { class: 'es-verdict' }, [result.passed ? 'Aprobado' : 'No aprobado']),
        ]),
        el('p', { class: 'es-summary' }, [
          `${result.correct} de ${result.total} correctas. Se aprueba con ${EXAM_FORMAT.passingScore}.`,
        ]),
        el(
          'ul',
          { class: 'es-domains' },
          result.byDomain.map((d) =>
            el('li', { class: 'es-domain-row', 'data-domain': d.domainId }, [
              el('span', {}, [`${findExamDomain(d.domainId)?.order}. ${findExamDomain(d.domainId)?.title}`]),
              el('span', { class: 'es-domain-score' }, [`${d.correct} de ${d.total}`]),
            ]),
          ),
        ),
        button('Nuevo simulacro', start, { class: 'es-primary' }),
      ]),
      el('h2', { class: 'es-review-title' }, ['Repaso de las preguntas']),
      el(
        'ol',
        { class: 'es-review' },
        exam.questions.map((q, i) => {
          const chosen = answers[i] === null ? null : q.options[answers[i]!];
          const right = q.options.find((o) => o.correct)!;
          const state = chosen === null ? 'empty' : chosen.correct ? 'right' : 'wrong';
          return el('li', { class: 'es-review-item', 'data-exam-review': '', 'data-state': state }, [
            el('p', { class: 'es-prompt' }, [q.prompt]),
            el('p', { class: 'es-review-answer' }, [
              el('strong', {}, ['Tu respuesta: ']),
              chosen === null ? 'Sin responder' : `${chosen.label} ${chosen.correct ? '✓' : '✗'}`,
            ]),
            ...(chosen?.correct ? [] : [el('p', { class: 'es-review-answer' }, [el('strong', {}, ['Respuesta correcta: ']), right.label])]),
            el('p', { class: 'es-review-why' }, [right.explanation]),
            el('a', { href: options.theoryUrl(q.topicSlug) }, ['Repasar el tema']),
          ]);
        }),
      ),
    );
    root.scrollIntoView?.({ block: 'start' });
  }

  showIntro();
}
