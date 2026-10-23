import { describe, expect, it } from 'vitest';
import { RIVALS, rivalsFor } from './rivals';

describe('rivalsFor', () => {
  it('returns the Spanish ladder for es', () => {
    expect(rivalsFor('es')).toBe(RIVALS);
  });

  it('translates titles and quotes for en and keeps ids, names and stats', () => {
    const english = rivalsFor('en');
    const strip = ({ title: _title, quote: _quote, ...rest }: (typeof RIVALS)[number]) => rest;
    expect(english.map(strip)).toEqual(RIVALS.map(strip));
    expect(english[0].title).toBe('Cloud intern');
    for (const [i, rival] of english.entries()) {
      expect(rival.title).not.toBe(RIVALS[i].title);
      expect(rival.quote).not.toBe(RIVALS[i].quote);
    }
  });
});
