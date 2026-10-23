import type { Locale } from './locales';

/**
 * One area's copy in every language. The Spanish copy defines the shape; English must provide every
 * key with the same type (texts, or functions for texts with values in them).
 */
export function defineMessages<T>(messages: { es: T; en: NoInfer<T> }): Record<Locale, T> {
  return messages;
}
