export const CHARACTERS = ['man', 'woman'] as const;
/** The playable character chosen once on the selection screen. */
export type Character = (typeof CHARACTERS)[number];

export function isCharacter(value: unknown): value is Character {
  return CHARACTERS.includes(value as Character);
}

export interface Player {
  displayName: string;
  /** Account email; guests have none. */
  email?: string;
  isGuest: boolean;
  /** Null until the player picks a character. */
  character: Character | null;
}

export const GUEST_NAME = 'Invitado';

export function createGuestPlayer(): Player {
  return { displayName: GUEST_NAME, isGuest: true, character: null };
}

/** Up to two letters for the avatar: first and last word of the name ("Andy Caseres" → "AC"). */
export function initials(displayName: string): string {
  const words = displayName.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const first = [...words[0]][0];
  const last = words.length > 1 ? [...words[words.length - 1]][0] : '';
  return (first + last).toLocaleUpperCase('es');
}

/** A player is always shown with a non-empty, trimmed name. */
export function normalizePlayer(player: Player): Player {
  const displayName = player.displayName.trim();
  return { ...player, displayName: displayName === '' ? GUEST_NAME : displayName };
}
