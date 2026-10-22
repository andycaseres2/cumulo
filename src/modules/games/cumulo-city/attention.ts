import type { MissionCardContent } from './missionCard';

/** Without any key, click or wheel for this long, the game asks whether the player is still there. */
export const IDLE_AFTER_MS = 120_000;
/** An accepted mission nobody has started yet gets its first reminder after this long... */
export const NUDGE_AFTER_MS = 60_000;
/** ...and then one more every this often, until the player starts it. */
export const NUDGE_EVERY_MS = 15_000;

export function isIdle(lastInputAt: number, now: number): boolean {
  return now - lastInputAt >= IDLE_AFTER_MS;
}

/** `activeSince` is when the shown mission became active, or null when no mission is active. */
export function nudgeDue(activeSince: number | null, lastNudgeAt: number | null, now: number): boolean {
  if (activeSince === null) return false;
  if (lastNudgeAt === null) return now - activeSince >= NUDGE_AFTER_MS;
  return now - lastNudgeAt >= NUDGE_EVERY_MS;
}

/** Identifies what the card announces, so a refresh with the same content does not replay its entrance. */
export function cardKey(content: MissionCardContent): string {
  return `${content.heading}\u0000${content.title}`;
}
