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
