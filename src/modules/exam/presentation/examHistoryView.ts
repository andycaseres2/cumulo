import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { examHistoryMessages } from '@/i18n/messages/examHistory';
import { findExamDomain } from '../domain/ExamDomain';
import type { ExamHistory } from '../domain/ExamAttempt';
import { domainText } from './examText';
import './examHistoryView.css';

export interface ExamHistoryViewOptions {
  locale?: Locale;
  /** Shows only the latest attempts (e.g. in the profile). */
  limit?: number;
  /** Link to the full history, shown with `limit`. */
  moreUrl?: string;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

/** The player's practice exam attempts: totals, best and latest score, then one row per attempt. */
export function renderExamHistory(host: HTMLElement, history: ExamHistory, options: ExamHistoryViewOptions = {}): void {
  const locale = options.locale ?? DEFAULT_LOCALE;
  const t = examHistoryMessages[locale];
  const date = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });

  if (history.count === 0) {
    host.replaceChildren(el('section', { class: 'exam-history is-empty' }, [el('p', {}, [t.empty])]));
    return;
  }

  const shown = options.limit ? history.attempts.slice(0, options.limit) : history.attempts;
  const rows = shown.map((attempt) =>
    el('li', { class: `eh-attempt ${attempt.passed ? 'is-passed' : 'is-failed'}`, 'data-attempt': attempt.id }, [
      el('div', { class: 'eh-score' }, [
        el('strong', {}, [String(attempt.score)]),
        el('span', { class: 'eh-badge' }, [attempt.passed ? t.passed : t.failed]),
      ]),
      el('div', { class: 'eh-details' }, [
        el('p', { class: 'eh-date' }, [date.format(new Date(attempt.takenAt))]),
        el('p', {}, [`${t.correct(attempt.correct, attempt.total)} · ${t.duration(Math.floor(attempt.durationSeconds / 60), attempt.durationSeconds % 60)}`]),
        el('p', { class: 'eh-domains' }, [
          `${t.byDomain}: `,
          attempt.byDomain
            .map((score) => {
              const domain = findExamDomain(score.domainId);
              return `${domain ? domainText(domain, locale).title : score.domainId} ${score.correct}/${score.total}`;
            })
            .join(' · '),
        ]),
      ]),
    ]),
  );

  host.replaceChildren(
    el('section', { class: 'exam-history' }, [
      el('div', { class: 'eh-summary' }, [
        el('p', { 'data-history-summary': '' }, [t.summary(history.count, history.passed)]),
        el('p', { 'data-history-best': '' }, [`${t.best}: `, el('strong', {}, [String(history.best)])]),
        el('p', {}, [`${t.last}: `, el('strong', {}, [String(history.last)])]),
      ]),
      el('ol', { class: 'eh-list' }, rows),
      ...(options.limit && options.moreUrl ? [el('a', { class: 'eh-more', href: options.moreUrl }, [t.seeAll])] : []),
    ]),
  );
}
