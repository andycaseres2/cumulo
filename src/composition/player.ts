/**
 * Composition root for the player module. Client-side only (uses the browser location and Supabase).
 * With Supabase configured players have accounts; otherwise everyone plays as a guest.
 */
import { supabase } from '@/infrastructure/supabase/client';
import { getCurrentPlayer } from '@/modules/player/application/getCurrentPlayer';
import type { PlayerAuth } from '@/modules/player/domain/PlayerAuth';
import { guestPlayerSession } from '@/modules/player/infrastructure/guestPlayerSession';
import { supabasePlayerAuth } from '@/modules/player/infrastructure/supabasePlayerAuth';
import { routes } from '@/ui/routes';

let auth: PlayerAuth | undefined;

export function playerAuth(): PlayerAuth {
  if (!auth) {
    const client = supabase();
    auth = client ? supabasePlayerAuth(client.auth, `${window.location.origin}${routes.signIn}`) : guestPlayerSession;
  }
  return auth;
}

export const currentPlayer = () => getCurrentPlayer(playerAuth());
