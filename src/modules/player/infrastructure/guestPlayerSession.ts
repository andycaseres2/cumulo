import type { PlayerAuth } from '../domain/PlayerAuth';

/** Adapter used while accounts are not configured: everyone plays as a guest and sign-in is unavailable. */
export const guestPlayerSession: PlayerAuth = {
  currentPlayer: async () => null,
  signUp: async () => ({ ok: false, error: 'unavailable' }),
  signIn: async () => ({ ok: false, error: 'unavailable' }),
  signOut: async () => {},
  onChange: () => () => {},
};
