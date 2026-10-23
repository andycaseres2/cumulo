import { describe, expect, it } from 'vitest';
import { initials } from './Player';

describe('initials', () => {
  it.each([
    ['Andy Caseres', 'AC'],
    ['andy', 'A'],
    ['  María José  Pérez Soto ', 'MS'],
    ['Ángel', 'Á'],
    ['ñandú veloz', 'ÑV'],
    ['', '?'],
  ])('of "%s" is "%s"', (name, expected) => {
    expect(initials(name)).toBe(expected);
  });
});
