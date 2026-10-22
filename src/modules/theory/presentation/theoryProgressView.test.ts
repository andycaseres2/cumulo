// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import type { TheoryOverview } from '../application/theoryProgress';
import { renderTheoryProgress } from './theoryProgressView';

const overview: TheoryOverview = {
  completed: 3,
  total: 42,
  completedSlugs: ['a', 'b', 'c'],
  byDomain: [
    { domainId: 'cloud-concepts', completed: 2, total: 6 },
    { domainId: 'security-compliance', completed: 1, total: 10 },
  ],
};

let host: HTMLElement;

describe('theory progress view', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="host"></div>';
    host = document.getElementById('host')!;
  });

  it('summarizes completed topics overall and per exam domain', () => {
    renderTheoryProgress(host, overview, { theoryUrl: '/teoria' });
    expect(host.textContent).toContain('3 de 42 temas completados');
    expect(host.querySelector('progress')?.getAttribute('value')).toBe('3');
    const rows = [...host.querySelectorAll<HTMLElement>('[data-domain]')];
    expect(rows.map((r) => r.dataset.domain)).toEqual(['cloud-concepts', 'security-compliance']);
    expect(rows[0].textContent).toContain('Conceptos de la nube');
    expect(rows[0].textContent).toContain('2 de 6');
  });

  it('links to the theory to keep studying', () => {
    renderTheoryProgress(host, overview, { theoryUrl: '/teoria' });
    expect(host.querySelector('a[href="/teoria"]')?.textContent).toContain('Seguir estudiando');
  });
});
