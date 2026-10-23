// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { emptyDuelProgress, type DuelProgress } from '../domain/DuelProgress';
import type { Rival } from '../domain/Rival';
import type { DuelCard, ServiceFamily } from '../domain/ServiceFamily';
import { TIME_ATTACK_MS } from '../domain/TimeAttack';
import { renderDuelGame, TRAINING_CARDS, type DuelGameOptions } from './duelGame';

const card = (id: string): DuelCard => ({
  id,
  prompt: `Escenario ${id}`,
  topicSlug: 'topic',
  answer: 'Right',
  options: [
    { service: 'Right', why: 'Es la correcta por este motivo.' },
    { service: 'Wrong', why: 'No sirve para este caso.' },
    { service: 'Other', why: 'Tampoco sirve aquí.' },
  ],
});
const family: ServiceFamily = {
  id: 'storage',
  title: 'Almacenamiento',
  summary: 'Resumen',
  services: [{ name: 'Right', summary: 'Sirve para esto' }],
  cards: Array.from({ length: 14 }, (_, i) => card(`storage-${i + 1}`)),
};
const rival = (id: string, accuracy: number, answerMs: [number, number]): Rival => ({
  id,
  name: `Rival ${id}`,
  title: 'Título',
  quote: 'Hola',
  families: [],
  roundSeconds: 10,
  accuracy,
  answerMs,
});

let clock = 0;
let host: HTMLElement;
let saved: DuelProgress[];
let dispose: () => void;

function mount(overrides: Partial<DuelGameOptions> = {}) {
  dispose = renderDuelGame(host, {
    families: [family],
    rivals: [rival('slow', 0, [9000, 9000]), rival('fast', 1, [500, 500])],
    progress: emptyDuelProgress(),
    playerName: 'Andrea',
    onProgress: (p) => saved.push(p),
    theoryUrl: (slug) => `/theory/cloud-practitioner/${slug}`,
    random: () => 0.5,
    now: () => clock,
    ...overrides,
  });
}

const click = (selector: string) => host.querySelector<HTMLButtonElement>(selector)!.click();
const pick = (service: string) => click(`[data-service="${service}"]`);
const advance = (ms: number) => {
  clock += ms;
  vi.advanceTimersByTime(ms);
};

beforeEach(() => {
  vi.useFakeTimers();
  clock = 0;
  saved = [];
  host = document.createElement('div');
  document.body.replaceChildren(host);
});

afterEach(() => {
  dispose();
  vi.useRealTimers();
});

describe('menu', () => {
  it('opens the first rival and locks the next one until the first is beaten', () => {
    mount();
    expect(host.querySelector('[data-rival="slow"]')!.className).toContain('is-open');
    expect(host.querySelector('[data-rival="fast"]')!.className).toContain('is-locked');
    dispose();
    mount({ progress: { ...emptyDuelProgress(), beatenRivals: ['slow'] } });
    expect(host.querySelector('[data-rival="slow"]')!.className).toContain('is-beaten');
    expect(host.querySelector('[data-rival="fast"]')!.className).toContain('is-open');
  });
});

describe('duel', () => {
  it('beats a rival that never answers right and saves the win', () => {
    mount();
    click('[data-rival="slow"] button');
    click('[data-start-duel]');
    for (let round = 0; round < 12 && !host.querySelector('[data-outcome]'); round++) {
      advance(1000);
      pick('Right');
      click('[data-next]');
    }
    expect(host.querySelector('[data-outcome]')!.getAttribute('data-outcome')).toBe('won');
    expect(saved.at(-1)!.beatenRivals).toEqual(['slow']);
    expect(host.querySelector('[data-next-rival]')!.textContent).toContain('Rival fast');
  });

  it('loses the round when the rival answers right first, and shows who answered what', () => {
    mount({ progress: { ...emptyDuelProgress(), beatenRivals: ['slow'] } });
    click('[data-rival="fast"] button');
    click('[data-start-duel]');
    advance(600);
    expect(host.querySelector('.sd-rival-thinking')!.textContent).toContain('respondió primero');
    expect(host.querySelector('[data-hp="player"] .sd-hp-value')!.textContent).toBe('80');
    expect(host.querySelector('[data-service="Right"]')!.className).toContain('is-answer');
    expect(host.querySelector('[data-service="Right"] .sd-tag.is-rival')).not.toBeNull();
  });

  it('answers with the number keys and explains the answer with a link to the theory', () => {
    mount();
    click('[data-rival="slow"] button');
    click('[data-start-duel]');
    const index = [...host.querySelectorAll<HTMLElement>('.sd-option')].findIndex((b) => b.dataset.service === 'Wrong');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: String(index + 1) }));
    expect(host.querySelector('[data-service="Wrong"]')!.className).toContain('is-wrong');
    expect(host.querySelector('.sd-explanation')!.textContent).toContain('Es la correcta por este motivo.');
    expect(host.querySelector('.sd-explanation')!.textContent).toContain('No sirve para este caso.');
    expect(host.querySelector('.sd-explanation a')!.getAttribute('href')).toBe('/theory/cloud-practitioner/topic');
  });
});

describe('time attack', () => {
  it('counts right answers until the clock runs out and keeps the record', () => {
    mount();
    click('[data-start-time-attack]');
    pick('Right');
    pick('Right');
    pick('Wrong');
    advance(TIME_ATTACK_MS);
    expect(host.querySelector('[data-outcome="time-attack"] .sd-title')!.textContent).toBe('2 aciertos');
    expect(saved.at(-1)!.bestTimeAttack).toBe(2);
    expect(host.querySelector('.sd-review')!.children).toHaveLength(1);
  });
});

describe('training', () => {
  it('shows the cheat sheet, explains every option and saves the share of right answers', () => {
    mount();
    click('[data-family="storage"]');
    expect(host.querySelector('.sd-cheatsheet')!.textContent).toContain('Sirve para esto');
    click('[data-start-training]');
    for (let i = 0; i < TRAINING_CARDS; i++) {
      pick(i < 5 ? 'Right' : 'Other');
      if (i === 0) expect(host.querySelectorAll('.sd-explanation li')).toHaveLength(3);
      click('[data-next]');
    }
    expect(host.querySelector('[data-outcome="training"] .sd-title')!.textContent).toBe(`5 de ${TRAINING_CARDS} correctas`);
    expect(saved.at(-1)!.bestPractice).toEqual({ storage: 0.5 });
  });
});

describe('english', () => {
  it('shows the menu, the duel and the result in English when the locale is en', () => {
    mount({ locale: 'en' });
    expect(host.textContent).toContain('Time attack');
    expect(host.querySelector('[data-rival="slow"]')!.textContent).toContain('Available');
    expect(host.querySelector('[data-rival="fast"]')!.textContent).toContain('Beat the previous rival');
    click('[data-rival="slow"] button');
    expect(host.querySelector('[data-start-duel]')!.textContent).toBe('Duel on!');
    click('[data-start-duel]');
    expect(host.querySelector('.sd-round')!.textContent).toBe('Round 1 of 12');
    expect(host.querySelector('.sd-rival-thinking')!.textContent).toBe('Rival slow is thinking…');
    pick('Right');
    expect(host.querySelector('.sd-rival-thinking')!.textContent).toContain('Hit!');
    expect(host.querySelector('.sd-explanation a')!.textContent).toBe('Review the topic →');
  });

  it('counts time attack answers in English', () => {
    mount({ locale: 'en' });
    click('[data-start-time-attack]');
    pick('Right');
    advance(TIME_ATTACK_MS);
    expect(host.querySelector('[data-outcome="time-attack"] .sd-title')!.textContent).toBe('1 right');
    expect(host.textContent).toContain('New record!');
  });
});
