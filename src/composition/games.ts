/** Composition root for the games module. */
import type { Locale } from '@/i18n/locales';
import { getGame } from '@/modules/games/application/getGame';
import { listGames } from '@/modules/games/application/listGames';
import { staticGameCatalog } from '@/modules/games/infrastructure/staticGameCatalog';

export const games = {
  list: (locale: Locale) => listGames(staticGameCatalog(locale)),
  find: (slug: string, locale: Locale) => getGame(staticGameCatalog(locale), slug),
};
