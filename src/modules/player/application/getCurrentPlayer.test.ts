import { describe, expect, it } from 'vitest';
import type { PlayerSession } from '../domain/PlayerSession';
import { GUEST_NAME } from '../domain/Player';
import { getCurrentPlayer } from './getCurrentPlayer';

const sessionWith = (player: Awaited<ReturnType<PlayerSession['currentPlayer']>>): PlayerSession => ({
  currentPlayer: async () => player,
});

describe('getCurrentPlayer', () => {
  it('returns a guest when nobody is signed in', async () => {
    await expect(getCurrentPlayer(sessionWith(null))).resolves.toEqual({ displayName: GUEST_NAME, isGuest: true, character: null });
  });

  it('returns the signed-in player with a trimmed name', async () => {
    const player = await getCurrentPlayer(sessionWith({ displayName: '  Andy  ', isGuest: false, character: 'woman' }));
    expect(player).toEqual({ displayName: 'Andy', isGuest: false, character: 'woman' });
  });

  it('falls back to the guest name when the signed-in name is blank', async () => {
    const player = await getCurrentPlayer(sessionWith({ displayName: '   ', isGuest: false, character: null }));
    expect(player).toEqual({ displayName: GUEST_NAME, isGuest: false, character: null });
  });
});
