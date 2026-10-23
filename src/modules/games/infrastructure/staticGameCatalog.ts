import { catalogMessages } from '@/i18n/messages/catalog';
import type { Locale } from '@/i18n/locales';
import type { Game } from '../domain/Game';
import type { GameCatalog } from '../domain/GameCatalog';

type GameSlug = keyof (typeof catalogMessages)['es']['games'];

/** What a game is, whatever the language; its title, tagline and description come from the catalog copy. */
const GAMES: (Omit<Game, 'title' | 'tagline' | 'description'> & { slug: GameSlug })[] = [
  {
    slug: 'cumulo-city',
    status: 'available',
    level: 'practitioner',
    domains: ['cloud-concepts', 'security-compliance', 'technology-services', 'billing-pricing-support'],
  },
  {
    slug: 'service-duel',
    status: 'available',
    level: 'practitioner',
    domains: ['technology-services'],
  },
];

/** Adapter: the game catalog lives in code until games are managed elsewhere. */
export function staticGameCatalog(locale: Locale): GameCatalog {
  return {
    findAll: async () => GAMES.map((game) => ({ ...game, ...catalogMessages[locale].games[game.slug] })),
  };
}
