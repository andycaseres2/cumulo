import { describe, expect, it } from 'vitest';
import { revealedText } from './typewriter';

describe('revealedText', () => {
  const text = 'Hola, consultor.';

  it('shows nothing at the start and grows with time at the given speed', () => {
    expect(revealedText(text, 0, 40)).toBe('');
    expect(revealedText(text, 100, 40)).toBe('Hola');
  });

  it('never goes past the full text', () => {
    expect(revealedText(text, 60_000, 40)).toBe(text);
  });
});
