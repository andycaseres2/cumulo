import type { Player } from '../domain/Player';
import { routes } from '@/ui/routes';

/** Where to send a player who needs an account to be here, or null when they can stay. */
export function requireAccount(player: Player, here: string): string | null {
  return player.isGuest ? `${routes.signIn}?next=${encodeURIComponent(here)}` : null;
}
