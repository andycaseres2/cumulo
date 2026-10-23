import { examSimulatorMessages } from '@/i18n/messages/examSimulator';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { findExamDomain, type ExamDomainId } from '../domain/ExamDomain';
import { EXAM_FORMAT } from '../domain/ExamFormat';
import { scorePracticeExam, type PracticeExam, type PracticeExamResult } from '../domain/PracticeExam';
import { domainText } from './examText';
import './examSimulator.css';

export interface ExamSimulatorOptions {
  /** Draws a new exam each time the player starts one. */
  createExam: () => PracticeExam;
  /** How many questions each exam has, shown before starting. */
  questionCount: number;
  theoryUrl: (slug: string) => string;
  durationMinutes: number;
  /** Called once per exam with its result and how long the player took. */
  onFinished?: (result: PracticeExamResult, details: { elapsedMs: number }) => void;
  /** Language of the copy; Spanish when omitted. */
  locale?: Locale;
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
  const locale = options.locale ?? DEFAULT_LOCALE;
  const t = examSimulatorMessages[locale];
  const domainTitle = (id: ExamDomainId) => {
    const domain = findExamDomain(id);
    return domain ? domainText(domain, locale).title : '';
  };
  const root = el('section', { class: 'exam-simulator' });
  host.replaceChildren(root);
  let timer: ReturnType<typeof setInterval> | undefined;

  function showIntro() {
    root.replaceChildren(
      el('div', { class: 'es-card es-intro' }, [
        el('h2', { class: 'es-title' }, [t.title]),
        el('ul', { class: 'es-rules' }, [
          el('li', {}, [t.rules.questions(options.questionCount)]),
          el('li', {}, [t.rules.time(options.durationMinutes)]),
          el('li', {}, [t.rules.navigation]),
          el('li', {}, [t.rules.score({ min: EXAM_FORMAT.minScore, max: EXAM_FORMAT.maxScore, passing: EXAM_FORMAT.passingScore })]),
        ]),
        el('p', { class: 'es-note' }, [t.note]),
        button(t.start, start, { class: 'es-primary' }),
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
    const nav = el('div', { class: 'es-nav', role: 'group', 'aria-label': t.navLabel });
    const confirm = el('div', { class: 'es-confirm', role: 'alertdialog', 'aria-live': 'assertive' });
    confirm.hidden = true;

    function renderNav() {
      nav.replaceChildren(
        ...exam.questions.map((_, i) => {
          const state = flagged.has(i) ? 'flagged' : answers[i] !== null ? 'answered' : 'empty';
          const cell = button(String(i + 1), () => go(i), { class: 'es-nav-cell', 'data-exam-nav': '', 'data-state': state, 'aria-label': t.questionLabel(i + 1) });
          if (i === current) cell.setAttribute('aria-current', 'step');
          cell.dataset.state = state;
          return cell;
        }),
      );
    }

    function renderQuestion() {
      const q = exam.questions[current];
            body.replaceChildren(
        el('p', { class: 'es-progress' }, [t.progress(current + 1, exam.questions.length), el('span', { class: 'es-domain' }, [domainTitle(q.domainId)])]),
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
          button(t.previous, () => go(current - 1), { class: 'es-secondary', ...(current === 0 ? { disabled: '' } : {}) }),
          button(flagged.has(current) ? t.unflag : t.flag, () => {
            if (flagged.has(current)) flagged.delete(current);
            else flagged.add(current);
            renderQuestion();
          }, { class: 'es-secondary' }),
          current < exam.questions.length - 1
            ? button(t.next, () => go(current + 1), { class: 'es-primary' })
            : button(t.reviewAndFinish, askToFinish, { class: 'es-primary' }),
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
        el('p', {}, [t.unanswered(unanswered)]),
        el('div', { class: 'es-actions' }, [
          button(t.keepAnswering, () => (confirm.hidden = true), { class: 'es-secondary' }),
          button(t.finishAnyway, () => finish(false), { class: 'es-primary' }),
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
      const durationMs = options.durationMinutes * 60_000;
      options.onFinished?.(result, { elapsedMs: Math.min(durationMs, durationMs - Math.max(0, deadline - Date.now())) });
      showResults(exam, answers, result, timeUp);
    }

    root.replaceChildren(
      el('div', { class: 'es-card es-exam' }, [
        el('div', { class: 'es-topbar' }, [
          el('span', { class: 'es-timer-label' }, [t.timeLeft, timerText]),
          button(t.finishExam, askToFinish, { class: 'es-secondary' }),
        ]),
        confirm,
        body,
        el('p', { class: 'es-nav-label' }, [t.questions]),
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
        ...(timeUp ? [el('p', { class: 'es-timeup' }, [t.timeUp])] : []),
        el('p', { class: 'es-score-label' }, [t.scoreLabel]),
        el('p', { class: result.passed ? 'es-score is-pass' : 'es-score is-fail' }, [
          el('span', { 'data-exam-score': '' }, [String(result.score)]),
          el('span', { class: 'es-verdict' }, [result.passed ? t.passed : t.failed]),
        ]),
        el('p', { class: 'es-summary' }, [t.summary(result.correct, result.total, EXAM_FORMAT.passingScore)]),
        el(
          'ul',
          { class: 'es-domains' },
          result.byDomain.map((d) =>
            el('li', { class: 'es-domain-row', 'data-domain': d.domainId }, [
              el('span', {}, [`${findExamDomain(d.domainId)?.order}. ${domainTitle(d.domainId)}`]),
              el('span', { class: 'es-domain-score' }, [t.domainScore(d.correct, d.total)]),
            ]),
          ),
        ),
        button(t.newExam, start, { class: 'es-primary' }),
      ]),
      el('h2', { class: 'es-review-title' }, [t.reviewTitle]),
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
              el('strong', {}, [t.yourAnswer]),
              chosen === null ? t.noAnswer : `${chosen.label} ${chosen.correct ? '✓' : '✗'}`,
            ]),
            ...(chosen?.correct ? [] : [el('p', { class: 'es-review-answer' }, [el('strong', {}, [t.rightAnswer]), right.label])]),
            el('p', { class: 'es-review-why' }, [right.explanation]),
            el('a', { href: options.theoryUrl(q.topicSlug) }, [t.reviewTopic]),
          ]);
        }),
      ),
    );
    root.scrollIntoView?.({ block: 'start' });
  }

  showIntro();
}
