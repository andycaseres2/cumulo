export const CHARACTERS = ['man', 'woman'] as const;
/** The playable character chosen once on the selection screen. */
export type Character = (typeof CHARACTERS)[number];

export function isCharacter(value: unknown): value is Character {
  return CHARACTERS.includes(value as Character);
}

export interface Player {
  displayName: string;
  isGuest: boolean;
  /** Null until the player picks a character. */
  character: Character | null;
}

export const GUEST_NAME = 'Invitado';

export function createGuestPlayer(): Player {
  return { displayName: GUEST_NAME, isGuest: true, character: null };
}

/** A player is always shown with a non-empty, trimmed name. */
export function normalizePlayer(player: Player): Player {
  const displayName = player.displayName.trim();
  return { ...player, displayName: displayName === '' ? GUEST_NAME : displayName };
}
