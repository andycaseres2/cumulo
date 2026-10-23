// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { jobFee } from '../domain/MissionRun';
import { twoStepMission as mission } from '../testing/fixtures';
import { openMissionPanel } from './missionPanel';

const theoryUrl = (slug: string) => `/theory/cloud-practitioner/${slug}`;

function host(): HTMLElement {
  document.body.innerHTML = '<div id="host"></div>';
  return document.getElementById('host')!;
}

const open = (locale?: 'es' | 'en') => openMissionPanel({ mission, host: document.getElementById('host')!, theoryUrl, locale });
const panel = () => document.querySelector<HTMLElement>('[data-mission-panel]')!;
const click = (selector: string) => panel().querySelector<HTMLButtonElement>(selector)!.click();
const option = (id: string) => panel().querySelector<HTMLButtonElement>(`[data-option="${id}"]`)!;
const satisfaction = () => Number(panel().querySelector<HTMLElement>('[data-satisfaction]')!.dataset.satisfaction);
const definitionsShown = () => [...panel().querySelectorAll<HTMLElement>('[data-definition]')].filter((d) => !d.hidden).length;

describe('mission panel: a consulting job', () => {
  beforeEach(() => host());

  it('opens with a work order: the client, what they told you, the terms and one button to take the job', () => {
    void open();
    const text = panel().textContent!;
    expect(text).toContain('Orden de trabajo');
    expect(text).toContain('Rosa · Owner');
    expect(text).toContain('Hello');
    expect(text).toContain(`hasta ${jobFee(mission, 3)} créditos`);
    expect(text).not.toContain('Aprender');
    expect(text).not.toContain('Práctica');
    expect(panel().querySelector('[data-take-job]')).not.toBeNull();
  });

  it('shows each request as the client speaking, with the satisfaction meter and the proposals', () => {
    void open();
    click('[data-take-job]');
    const text = panel().textContent!;
    expect(text).toContain('Pedido 1 de 2');
    expect(text).toContain('First question');
    expect(panel().querySelector('.mp-chat')!.textContent).toContain('Rosa');
    expect(satisfaction()).toBe(50);
    expect(definitionsShown()).toBe(0);
  });

  it('answers a proposal at once: right or wrong, the client reaction, the senior note and the meter', () => {
    void open();
    click('[data-take-job]');
    option('b').click();
    const feedback = panel().querySelector<HTMLElement>('[data-feedback]')!;
    expect(feedback.textContent).toContain('No era lo que necesitaba');
    expect(feedback.querySelector('.mp-chat.is-upset')).not.toBeNull();
    expect(feedback.textContent).toContain('Nota del consultor senior');
    expect(feedback.textContent).toContain('Why b does not fit');
    expect(feedback.textContent).toContain('La propuesta indicada era Option a.');
    expect(feedback.querySelector('a')!.getAttribute('href')).toBe('/theory/cloud-practitioner/cloud-benefits');
    expect(option('a').className).toContain('is-correct');
    expect(option('b').className).toContain('is-wrong');
    expect(satisfaction()).toBeLessThan(50);
  });

  it('opens the manual on demand, showing what every option is', () => {
    void open();
    click('[data-take-job]');
    click('[data-manual]');
    expect(definitionsShown()).toBe(4);
    expect(panel().textContent).toContain('What a is');
    expect(panel().querySelector<HTMLButtonElement>('[data-manual]')!.disabled).toBe(true);
  });

  it('closes a perfect job with three stars and the full fee, and saves it when going back', async () => {
    const result = open();
    click('[data-take-job]');
    option('a').click();
    click('[data-next]');
    option('f').click();
    click('[data-next]');
    const report = panel().querySelector<HTMLElement>('[data-report]')!;
    expect(report.dataset.report).toBe('approved');
    expect(report.querySelector<HTMLElement>('[data-stars]')!.dataset.stars).toBe('3');
    expect(report.querySelector<HTMLElement>('[data-fee]')!.dataset.fee).toBe(String(jobFee(mission, 3)));
    expect(report.textContent).toContain('Lo que aprendiste');
    expect(report.textContent).toContain('Why f fits');
    click('[data-back]');
    await expect(result).resolves.toMatchObject({ passed: true, stars: 3, fee: jobFee(mission, 3), correct: 2 });
    expect(document.querySelector('[data-mission-panel]')).toBeNull();
  });

  it('rates a job done with the manual lower', async () => {
    const result = open();
    click('[data-take-job]');
    click('[data-manual]');
    option('a').click();
    click('[data-next]');
    option('f').click();
    click('[data-next]');
    click('[data-back]');
    await expect(result).resolves.toMatchObject({ passed: true, stars: 2 });
  });

  it('pays nothing when the client is not satisfied, and lets the player try the job again', () => {
    void open();
    click('[data-take-job]');
    option('b').click();
    click('[data-next]');
    option('e').click();
    click('[data-next]');
    const report = panel().querySelector<HTMLElement>('[data-report]')!;
    expect(report.dataset.report).toBe('rejected');
    expect(report.querySelector<HTMLElement>('[data-stars]')!.dataset.stars).toBe('0');
    expect(report.textContent).toContain('Sin honorarios');
    click('[data-retry]');
    expect(panel().querySelector('[data-take-job]')).not.toBeNull();
  });

  it('can be left before finishing, which saves nothing', async () => {
    const result = open();
    click('[data-take-job]');
    click('.mp-close');
    await expect(result).resolves.toBeNull();
  });

  it('lets the player propose with the number keys', () => {
    void open();
    click('[data-take-job]');
    panel().dispatchEvent(new KeyboardEvent('keydown', { key: '1', bubbles: true }));
    expect(panel().querySelector('[data-feedback]')!.textContent).toContain('¡Buena propuesta!');
  });

  it('speaks English when asked', () => {
    void open('en');
    expect(panel().textContent).toContain('Work order');
    expect(panel().textContent).toContain('Take the job');
    click('[data-take-job]');
    expect(panel().textContent).toContain('Request 1 of 2');
    expect(panel().textContent).toContain('Client satisfaction');
  });
});
