import { DEFAULT_LOCALE, LOCALES, isLocale, localeFromPath, type Locale } from './locales';

/** `getStaticPaths` entries for a page that exists once per language. */
export function localePaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

/** Language of the page being rendered (pages and components): the `[lang]` segment of its URL. */
export function localeOf(astro: { params: Record<string, string | undefined>; url: URL }): Locale {
  const lang = astro.params.lang;
  return isLocale(lang) ? lang : (localeFromPath(astro.url.pathname) ?? DEFAULT_LOCALE);
}
