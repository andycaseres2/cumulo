// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import type { CampaignOverview } from '../application/campaignOverview';
import { secondMission, twoStepMission as firstMission } from '../testing/fixtures';
import { renderProgress } from './progressView';

const options = {
  gameUrl: '/juegos/cumulo-city',
  theoryUrl: (slug: string) => `/teoria/${slug}`,
  buildingName: (id: string) => `Building ${id}`,
  topicTitle: (slug: string) => `Topic ${slug}`,
  trackName: (track: string) => `Track ${track}`,
};

const overview: CampaignOverview = {
  entries: [
    { mission: firstMission, state: 'completed', bestScore: 0.5 },
    { mission: secondMission, state: 'offered', bestScore: null },
  ],
  completed: 1,
  total: 2,
  practicedDomains: ['cloud-concepts'],
};

let host: HTMLElement;
const card = (id: string) => host.querySelector<HTMLElement>(`[data-mission="${id}"]`)!;

describe('progress view', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="host"></div>';
    host = document.getElementById('host')!;
  });

  it('summarizes how many missions are completed', () => {
    renderProgress(host, overview, options);
    expect(host.textContent).toContain('1 de 2 misiones completadas');
    expect(host.querySelector('progress')?.getAttribute('value')).toBe('1');
    expect(host.querySelector('progress')?.getAttribute('max')).toBe('2');
  });

  it('shows each mission with its client, building, state and best score', () => {
    renderProgress(host, overview, options);
    expect(card(firstMission.id).textContent).toContain(firstMission.client.name);
    expect(card(firstMission.id).textContent).toContain(`Building ${firstMission.buildingId}`);
    expect(card(firstMission.id).textContent).toContain('Completada · 50 %');
    expect(card(secondMission.id).textContent).toContain('Disponible');
  });

  it('marks which exam domains were practiced and links the theory of completed missions', () => {
    renderProgress(host, overview, options);
    const domains = [...host.querySelectorAll<HTMLElement>('[data-domain]')];
    expect(domains.filter((d) => d.dataset.practiced === 'true').map((d) => d.dataset.domain)).toEqual(['cloud-concepts']);
    const topic = firstMission.decisions[0].topicSlug;
    expect(card(firstMission.id).querySelector(`a[href="/teoria/${topic}"]`)).not.toBeNull();
  });

  it('groups the missions by district, with how many are completed in each', () => {
    const other = { ...secondMission, id: 'other', track: 'financial' };
    renderProgress(host, { ...overview, entries: [...overview.entries, { mission: other, state: 'locked', bestScore: null }] }, options);
    const groups = [...host.querySelectorAll<HTMLElement>('[data-track]')];
    expect(groups.map((g) => g.dataset.track)).toEqual(['downtown', 'financial']);
    expect(groups[0].querySelector('summary')?.textContent).toContain('Track downtown');
    expect(groups[0].querySelector('summary')?.textContent).toContain('1 de 2');
    expect(groups[1].querySelectorAll('[data-mission]')).toHaveLength(1);
  });

  it('invites the player to keep playing', () => {
    renderProgress(host, overview, options);
    expect(host.querySelector('a[href="/juegos/cumulo-city"]')?.textContent).toContain('Seguir jugando');
  });
});
