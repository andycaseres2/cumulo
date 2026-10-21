import { createGuestPlayer, normalizePlayer, type Player } from '../domain/Player';
import type { PlayerSession } from '../domain/PlayerSession';

export async function getCurrentPlayer(session: PlayerSession): Promise<Player> {
  const player = await session.currentPlayer();
  return player ? normalizePlayer(player) : createGuestPlayer();
}
