import { theoryViewMessages } from '@/i18n/messages/theoryViews';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { findExamDomain } from '@/modules/exam/domain/ExamDomain';
import { domainText } from '@/modules/exam/presentation/examText';
import type { TheoryOverview } from '../application/theoryProgress';
import './theoryProgressView.css';

export interface TheoryProgressViewOptions {
  theoryUrl: string;
  /** Language of the copy; Spanish when omitted. */
  locale?: Locale;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

/** Renders how much theory the player completed, overall and per exam domain, for the profile. */
export function renderTheoryProgress(host: HTMLElement, overview: TheoryOverview, { theoryUrl, locale = DEFAULT_LOCALE }: TheoryProgressViewOptions): void {
  const t = theoryViewMessages[locale].progress;
  host.replaceChildren(
    el('section', { class: 'theory-progress' }, [
      el('p', { class: 'tp-count' }, [t.count(overview.completed, overview.total)]),
      el('progress', { value: String(overview.completed), max: String(overview.total), 'aria-label': t.label }),
      el(
        'ul',
        { class: 'tp-domains' },
        overview.byDomain.map((d) => {
          const domain = findExamDomain(d.domainId);
          return el('li', { class: 'tp-domain', 'data-domain': d.domainId }, [
            el('span', {}, [domain ? `${domain.order}. ${domainText(domain, locale).title}` : '']),
            el('span', { class: 'tp-domain-count' }, [t.domainCount(d.completed, d.total)]),
          ]);
        }),
      ),
      el('a', { class: 'tp-study', href: theoryUrl }, [t.keepStudying]),
    ]),
  );
}
