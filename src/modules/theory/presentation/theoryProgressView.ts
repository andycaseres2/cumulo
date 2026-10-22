import { findExamDomain } from '@/modules/exam/domain/ExamDomain';
import type { TheoryOverview } from '../application/theoryProgress';
import './theoryProgressView.css';

export interface TheoryProgressViewOptions {
  theoryUrl: string;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

/** Renders how much theory the player completed, overall and per exam domain, for the profile. */
export function renderTheoryProgress(host: HTMLElement, overview: TheoryOverview, { theoryUrl }: TheoryProgressViewOptions): void {
  host.replaceChildren(
    el('section', { class: 'theory-progress' }, [
      el('p', { class: 'tp-count' }, [`${overview.completed} de ${overview.total} temas completados`]),
      el('progress', { value: String(overview.completed), max: String(overview.total), 'aria-label': 'Avance en la teoría' }),
      el(
        'ul',
        { class: 'tp-domains' },
        overview.byDomain.map((d) => {
          const domain = findExamDomain(d.domainId);
          return el('li', { class: 'tp-domain', 'data-domain': d.domainId }, [
            el('span', {}, [`${domain?.order}. ${domain?.title}`]),
            el('span', { class: 'tp-domain-count' }, [`${d.completed} de ${d.total}`]),
          ]);
        }),
      ),
      el('a', { class: 'tp-study', href: theoryUrl }, ['Seguir estudiando']),
    ]),
  );
}
