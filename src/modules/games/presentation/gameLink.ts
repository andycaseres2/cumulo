import { routes } from '@/ui/routes';

/** Games that live on a page of their own instead of /games/<slug>, and are open to guests. */
const OWN_PAGES: Record<string, string> = {
  'practice-exam': routes.practiceExam,
};

/** Where "Jugar ahora" leads, and whether the game asks for an account first. */
export function gameLink(slug: string): { href: string; needsAccount: boolean } {
  const ownPage = OWN_PAGES[slug];
  return ownPage ? { href: ownPage, needsAccount: false } : { href: routes.game(slug), needsAccount: true };
}
