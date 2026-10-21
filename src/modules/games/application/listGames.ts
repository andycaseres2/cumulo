import { isPlayable, type Game } from '../domain/Game';
import type { GameCatalog } from '../domain/GameCatalog';

/** Playable games first; catalog order is kept within each group. */
export async function listGames(catalog: GameCatalog): Promise<Game[]> {
  const games = await catalog.findAll();
  return [...games.filter(isPlayable), ...games.filter((game) => !isPlayable(game))];
}
