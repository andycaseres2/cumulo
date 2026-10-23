import { DEFAULT_LOCALE, isLocale, type Locale } from './locales';

/** Language of the current page in the browser, as rendered in `<html lang>`. */
export function currentLocale(): Locale {
  const lang = document.documentElement.lang;
  return isLocale(lang) ? lang : DEFAULT_LOCALE;
}
