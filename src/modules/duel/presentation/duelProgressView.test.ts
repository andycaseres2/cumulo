// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import type { Rival } from '../domain/Rival';
import { renderDuelProgress } from './duelProgressView';

const rival = (id: string, name: string): Rival => ({ id, name, title: '', quote: '', families: [], roundSeconds: 10, accuracy: 1, answerMs: [0, 1] });
const rivals = [rival('a', 'Ana'), rival('b', 'Beto'), rival('c', 'Cata')];

describe('renderDuelProgress', () => {
  it('shows the rivals beaten, the time attack record and the families trained', () => {
    const host = document.createElement('div');
    renderDuelProgress(host, { beatenRivals: ['a'], bestTimeAttack: 14, bestPractice: { storage: 1, compute: 0.5 } }, {
      rivals,
      familyCount: 13,
      gameUrl: '/games/service-duel',
    });
    expect(host.querySelector('.dp-count')!.textContent).toBe('1 de 3 rivales vencidos');
    expect([...host.querySelectorAll('[data-rival]')].map((r) => r.className)).toEqual(['is-beaten', '', '']);
    expect(host.textContent).toContain('Récord en contrarreloj: 14 aciertos');
    expect(host.textContent).toContain('2 de 13 familias entrenadas, 1 dominada');
    expect(host.querySelector('a')!.getAttribute('href')).toBe('/games/service-duel');
  });

  it('invites to play when there is no progress yet', () => {
    const host = document.createElement('div');
    renderDuelProgress(host, { beatenRivals: [], bestTimeAttack: 0, bestPractice: {} }, { rivals, familyCount: 13, gameUrl: '/g' });
    expect(host.textContent).toContain('Aún no juegas contrarreloj');
    expect(host.querySelector('a')!.textContent).toBe('Jugar el duelo');
  });
});
