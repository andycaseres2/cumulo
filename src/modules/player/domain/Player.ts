export interface Player {
  displayName: string;
  isGuest: boolean;
}

export const GUEST_NAME = 'Invitado';

export function createGuestPlayer(): Player {
  return { displayName: GUEST_NAME, isGuest: true };
}

/** A player is always shown with a non-empty, trimmed name. */
export function normalizePlayer(player: Player): Player {
  const displayName = player.displayName.trim();
  return { ...player, displayName: displayName === '' ? GUEST_NAME : displayName };
}
