import type Phaser from 'phaser';
import { gameMessages } from '@/i18n/messages/game';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/locales';
import { REGISTRY } from '../config';

/** Language the host page mounted the game in. */
export function gameLocale(scene: Phaser.Scene): Locale {
  const locale = scene.registry.get(REGISTRY.locale);
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

/** The game's own copy in the language of the game. */
export function gameText(scene: Phaser.Scene) {
  return gameMessages[gameLocale(scene)];
}
