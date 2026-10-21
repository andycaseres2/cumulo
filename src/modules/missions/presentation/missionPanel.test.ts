// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { twoStepMission as mission } from '../testing/fixtures';
import { openMissionPanel } from './missionPanel';

const theoryUrl = (slug: string) => `/teoria/${slug}`;

function host(): HTMLElement {
  document.body.innerHTML = '<div id="host"></div>';
  return document.getElementById('host')!;
}

const panel = () => document.querySelector<HTMLElement>('[data-mission-panel]')!;
const button = (text: string) =>
  [...panel().querySelectorAll('button')].find((b) => b.textContent?.includes(text)) as HTMLButtonElement;
const options = () => [...panel().querySelectorAll<HTMLButtonElement>('[data-option]')];
const option = (id: string) => panel().querySelector<HTMLButtonElement>(`[data-option="${id}"]`)!;

describe('mission panel', () => {
  beforeEach(() => host());

  it('starts by letting the player choose between learning and practice', () => {
    void openMissionPanel({ mission, host: document.getElementById('host')!, theoryUrl });
    expect(panel().textContent).toContain('Test mission');
    expect(button('Aprender')).toBeDefined();
    expect(button('Práctica')).toBeDefined();
  });

  it('in learning mode, shows definitions before choosing and explains right after answering', async () => {
    const result = openMissionPanel({ mission, host: document.getElementById('host')!, theoryUrl });
    button('Aprender').click();

    expect(panel().textContent).toContain('First question');
    expect(options()).toHaveLength(4);
    expect(panel().querySelectorAll('details')).toHaveLength(4);
    expect(panel().textContent).toContain('What a is');

    option('b').click();
    const feedback = panel().querySelector('[data-feedback]')!.textContent!;
    expect(feedback).toContain('No es la mejor opción');
    expect(feedback).toContain('Why b does not fit');
    expect(feedback).toContain('Why a fits');
    expect(panel().querySelector<HTMLAnchorElement>('[data-theory-link]')!.getAttribute('href')).toBe('/teoria/beneficios-de-la-nube');
    expect(options().every((o) => o.disabled)).toBe(true);

    button('Siguiente').click();
    option('f').click();
    expect(panel().querySelector('[data-feedback]')!.textContent).toContain('¡Correcto!');
    button('Ver resultado').click();

    expect(panel().textContent).toContain('1 de 2');
    button('Volver a la oficina').click();
    await expect(result).resolves.toMatchObject({ correct: 1, total: 2, passed: false });
    expect(document.querySelector('[data-mission-panel]')).toBeNull();
  });

  it('in practice mode, hides definitions and feedback until the end, then reviews every answer', async () => {
    const result = openMissionPanel({ mission, host: document.getElementById('host')!, theoryUrl });
    button('Práctica').click();

    expect(panel().querySelectorAll('details')).toHaveLength(0);
    option('a').click();
    expect(panel().querySelector('[data-feedback]')).toBeNull();
    expect(panel().textContent).toContain('Second question');
    option('f').click();

    const review = panel().textContent!;
    expect(review).toContain('2 de 2');
    expect(review).toContain('Why a fits');
    expect(review).toContain('Why f fits');
    button('Volver a la oficina').click();
    await expect(result).resolves.toMatchObject({ correct: 2, passed: true });
  });

  it('can be left before finishing, which saves nothing', async () => {
    const result = openMissionPanel({ mission, host: document.getElementById('host')!, theoryUrl });
    button('Salir').click();
    await expect(result).resolves.toBeNull();
    expect(document.querySelector('[data-mission-panel]')).toBeNull();
  });

  it('lets the player answer with the number keys', () => {
    void openMissionPanel({ mission, host: document.getElementById('host')!, theoryUrl });
    button('Práctica').click();
    panel().dispatchEvent(new KeyboardEvent('keydown', { key: '1', bubbles: true }));
    expect(panel().textContent).toContain('Second question');
  });
});
