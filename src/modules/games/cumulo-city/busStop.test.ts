import { describe, expect, it } from 'vitest';
import { STAY, busStopTalk } from './busStop';

describe('bus stop', () => {
  it('offers the other three districts, each with the exam domain its clients need, and staying', () => {
    const talk = busStopTalk('downtown');
    expect(talk.title).toBe('Parada de bus');
    expect(talk.text).toContain('Distrito Centro');
    expect(talk.choices).toEqual([
      { id: 'financial', label: 'Distrito Financiero · Seguridad y cumplimiento' },
      { id: 'tech', label: 'Distrito Tecnológico · Tecnología y servicios de la nube' },
      { id: 'market', label: 'Distrito Mercado · Facturación, precios y soporte' },
      { id: STAY, label: 'Quedarme aquí' },
    ]);
  });

  it('never offers the district the player is already in', () => {
    expect(busStopTalk('market').choices?.map((c) => c.id)).toEqual(['downtown', 'financial', 'tech', STAY]);
  });
});

describe('bus stop in English', () => {
  it('asks in English, with English district names and exam domain titles', () => {
    const talk = busStopTalk('downtown', 'en');
    expect(talk.title).toBe('Bus stop');
    expect(talk.text).toBe("You're in the Downtown District. Which district do you want to go to?");
    expect(talk.choices).toEqual([
      { id: 'financial', label: 'Financial District · Security and Compliance' },
      { id: 'tech', label: 'Tech District · Cloud Technology and Services' },
      { id: 'market', label: 'Market District · Billing, Pricing, and Support' },
      { id: STAY, label: 'Stay here' },
    ]);
  });
});
