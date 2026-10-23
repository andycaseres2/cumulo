/** Languages of the site. Spanish is the original and the fallback. */
export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

/** Browser storage key of the language the visitor picked by hand. */
export const LOCALE_STORAGE_KEY = 'cumulo:locale';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** The visitor's saved choice, else the first browser language the site speaks, else Spanish. */
export function pickLocale(saved: string | null, browserLanguages: readonly string[]): Locale {
  if (isLocale(saved)) return saved;
  for (const language of browserLanguages) {
    const base = language.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function localeFromPath(pathname: string): Locale | null {
  const first = pathname.split('/')[1];
  return isLocale(first) ? first : null;
}

/** The same page in another language: replaces the language segment, or adds it to an unprefixed path. */
export function swapLocale(url: string, locale: Locale): string {
  const match = /^([^?#]*)(.*)$/.exec(url)!;
  const [path, rest] = [match[1], match[2]];
  const segments = path.split('/');
  if (isLocale(segments[1])) segments[1] = locale;
  else segments.splice(1, 0, locale);
  return segments.join('/').replace(/\/(?=\/)/g, '') + rest;
}
