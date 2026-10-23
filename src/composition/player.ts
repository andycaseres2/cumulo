/**
 * Composition root for the player module. Client-side only (uses the browser location and Supabase).
 * With Supabase configured players have accounts; otherwise everyone plays as a guest.
 */
import { migrateLegacyStorage, STORAGE_PREFIX } from '@/infrastructure/storage/renameStoragePrefix';
import { supabase } from '@/infrastructure/supabase/client';
import { getCurrentPlayer } from '@/modules/player/application/getCurrentPlayer';
import type { Character } from '@/modules/player/domain/Player';
import type { PlayerAuth } from '@/modules/player/domain/PlayerAuth';
import { guestPlayerSession } from '@/modules/player/infrastructure/guestPlayerSession';
import { supabasePlayerAuth } from '@/modules/player/infrastructure/supabasePlayerAuth';
import { currentLocale } from '@/i18n/client';
import { routesFor } from '@/ui/routes';

let auth: PlayerAuth | undefined;

export function playerAuth(): PlayerAuth {
  if (!auth) {
    const client = supabase();
    auth = client ? supabasePlayerAuth(client.auth, `${window.location.origin}${routesFor(currentLocale()).signIn}`) : guestPlayerSession;
  }
  return auth;
}

export const currentPlayer = () => getCurrentPlayer(playerAuth());

const CHARACTER_HINT = `${STORAGE_PREFIX}has-character`;

/**
 * Whether a character was picked on this device. Used before signing in (when the account is unknown)
 * to choose the background of the sign-in modal. Storage may be blocked, so failures read as "no".
 */
export function deviceHasCharacter(): boolean {
  try {
    migrateLegacyStorage();
    return window.localStorage.getItem(CHARACTER_HINT) === 'yes';
  } catch {
    return false;
  }
}

export function rememberCharacterOnDevice() {
  try {
    window.localStorage.setItem(CHARACTER_HINT, 'yes');
  } catch {
    // Only affects the sign-in background next time.
  }
}

/** Saves the character in the account and remembers on this device that one was picked. */
export async function chooseCharacter(character: Character) {
  rememberCharacterOnDevice();
  await playerAuth().saveCharacter(character);
}
