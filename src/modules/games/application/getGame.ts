import type { Game } from '../domain/Game';
import type { GameCatalog } from '../domain/GameCatalog';

export async function getGame(catalog: GameCatalog, slug: string): Promise<Game | null> {
  return (await catalog.findAll()).find((game) => game.slug === slug) ?? null;
}
