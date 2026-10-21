import { describe, expect, it } from 'vitest';
import { clientOffer, clientOutro, ACCEPT, LATER } from './missionTalk';
import type { MissionBrief } from './missions';

const brief: MissionBrief = {
  id: 'bakery-elasticity',
  title: 'La Navidad que tumbó la web',
  client: { name: 'Rosa Quispe', role: 'Dueña' },
  intro: ['Uno', 'Dos', 'Tres'],
  outro: { passed: ['Gracias'], failed: ['Vuelve pronto'] },
};
const portrait = { key: 'npc-0', frame: '1' };

describe('mission talk', () => {
  it('tells the whole story and then offers the job with accept / not now', () => {
    const pages = clientOffer(brief, 'available', portrait);

    expect(pages.map((p) => p.text).slice(0, 3)).toEqual(['Uno', 'Dos', 'Tres']);
    expect(pages.every((p) => p.title === 'Rosa Quispe' && p.portrait === portrait)).toBe(true);
    expect(pages.at(-1)?.choices?.map((c) => c.id)).toEqual([ACCEPT, LATER]);
    expect(pages.at(-1)?.choices?.[0].label).toBe('Acepto el trabajo');
  });

  it('after completing the job, greets the player again and offers to replay', () => {
    const pages = clientOffer(brief, 'completed', portrait);

    expect(pages).toHaveLength(1);
    expect(pages[0].choices?.map((c) => c.label)).toEqual(['Jugar otra vez', 'Ahora no']);
  });

  it('closes with the passed or failed lines of the mission', () => {
    expect(clientOutro(brief, true, portrait).map((p) => p.text)).toEqual(['Gracias']);
    expect(clientOutro(brief, false, portrait).map((p) => p.text)).toEqual(['Vuelve pronto']);
  });
});
