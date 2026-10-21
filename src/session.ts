/**
 * Player identity. Single place the game reads it from, so plugging in real
 * authentication later (e.g. Supabase Auth) does not touch the scenes.
 */
export function getPlayerName(): string {
  return 'Invitado';
}
