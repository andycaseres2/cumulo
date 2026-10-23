import { playerMessages } from '@/i18n/messages/player';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { MIN_PASSWORD_LENGTH, NAME_LENGTH } from '../application/authenticate';
import type { AuthErrorKind } from '../domain/PlayerAuth';

/** What to tell the player for each account service error, in `locale`. */
export function authMessages(locale: Locale = DEFAULT_LOCALE): Record<AuthErrorKind, string> {
  return playerMessages[locale].auth.errors({ nameMin: NAME_LENGTH.min, nameMax: NAME_LENGTH.max, passwordMin: MIN_PASSWORD_LENGTH });
}

/** Shown after signing up when the account still needs its email confirmed. */
export function confirmEmailMessage(locale: Locale = DEFAULT_LOCALE): string {
  return playerMessages[locale].auth.confirmEmail;
}

export const AUTH_MESSAGES = authMessages();
export const CONFIRM_EMAIL_MESSAGE = confirmEmailMessage();
