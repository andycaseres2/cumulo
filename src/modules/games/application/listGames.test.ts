import { describe, expect, it } from 'vitest';
import type { Game } from '../domain/Game';
import type { GameCatalog } from '../domain/GameCatalog';
import { getGame } from './getGame';
import { listGames } from './listGames';

const game = (overrides: Partial<Game>): Game => ({
  slug: 'slug',
  title: 'Title',
  tagline: 'Tagline',
  description: 'Description',
  status: 'available',
  level: 'practitioner',
  domains: ['cloud-concepts'],
  ...overrides,
});

const catalog = (games: Game[]): GameCatalog => ({ findAll: async () => games });

describe('listGames', () => {
  it('lists playable games before the ones coming soon, keeping catalog order otherwise', async () => {
    const games = await listGames(
      catalog([
        game({ slug: 'soon-a', status: 'coming-soon' }),
        game({ slug: 'play-a' }),
        game({ slug: 'soon-b', status: 'coming-soon' }),
        game({ slug: 'play-b' }),
      ]),
    );

    expect(games.map((g) => g.slug)).toEqual(['play-a', 'play-b', 'soon-a', 'soon-b']);
  });
});

describe('getGame', () => {
  it('finds a game by slug and returns null when it does not exist', async () => {
    const games = catalog([game({ slug: 'cumulo-city' })]);

    expect((await getGame(games, 'cumulo-city'))?.slug).toBe('cumulo-city');
    await expect(getGame(games, 'missing')).resolves.toBeNull();
  });
});
