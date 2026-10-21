import type { Player } from './Player';

/** Port: where the signed-in player comes from (guest today, an auth provider later). */
export interface PlayerSession {
  currentPlayer(): Promise<Player | null>;
}
