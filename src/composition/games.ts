/** Composition root for the games module. */
import { getGame } from '@/modules/games/application/getGame';
import { listGames } from '@/modules/games/application/listGames';
import { staticGameCatalog } from '@/modules/games/infrastructure/staticGameCatalog';

export const games = {
  list: () => listGames(staticGameCatalog),
  find: (slug: string) => getGame(staticGameCatalog, slug),
};
