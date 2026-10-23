import { describe, expect, it } from 'vitest';
import { localeFromPath, pickLocale, swapLocale } from './locales';

describe('pickLocale', () => {
  it('uses the saved choice first', () => {
    expect(pickLocale('es', ['en-US'])).toBe('es');
    expect(pickLocale('en', ['es-PE'])).toBe('en');
  });

  it('otherwise follows the first browser language the site speaks', () => {
    expect(pickLocale(null, ['en-GB', 'es'])).toBe('en');
    expect(pickLocale(null, ['fr-FR', 'es-MX'])).toBe('es');
  });

  it('falls back to Spanish for browsers in other languages', () => {
    expect(pickLocale(null, ['fr-FR', 'de'])).toBe('es');
    expect(pickLocale('xx', [])).toBe('es');
  });
});

describe('locale paths', () => {
  it('reads the language from the first segment', () => {
    expect(localeFromPath('/en/theory')).toBe('en');
    expect(localeFromPath('/es/')).toBe('es');
    expect(localeFromPath('/theory')).toBeNull();
  });

  it('moves the same page to the other language, keeping query and hash', () => {
    expect(swapLocale('/es/theory/cloud-practitioner/cloud-benefits', 'en')).toBe('/en/theory/cloud-practitioner/cloud-benefits');
    expect(swapLocale('/en/', 'es')).toBe('/es/');
    expect(swapLocale('/en', 'es')).toBe('/es');
    expect(swapLocale('/games?x=1#y', 'en')).toBe('/en/games?x=1#y');
  });
});
