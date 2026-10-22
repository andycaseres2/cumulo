export type PlayableCharacter = 'man' | 'woman';

/**
 * First scene after loading: the character selection until the player has picked one,
 * then straight to the city. The `?play=man|woman` development shortcut always wins.
 */
export function startScene(
  chosen: PlayableCharacter | null,
  quickStart: string | null,
): { scene: 'select' } | { scene: 'city'; playerKey: string } {
  const character = quickStart === 'man' || quickStart === 'woman' ? quickStart : chosen;
  return character ? { scene: 'city', playerKey: `player-${character}` } : { scene: 'select' };
}
