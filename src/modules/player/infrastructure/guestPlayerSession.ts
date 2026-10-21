import type { PlayerSession } from '../domain/PlayerSession';

/** Adapter used until authentication exists: nobody is ever signed in. */
export const guestPlayerSession: PlayerSession = {
  currentPlayer: async () => null,
};
