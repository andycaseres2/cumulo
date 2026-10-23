/** A computer opponent of the duel ladder. */
export interface Rival {
  id: string;
  name: string;
  title: string;
  /** What the rival says before the duel. */
  quote: string;
  /** Families its scenarios come from; empty means every family. */
  families: string[];
  /** Seconds the player has to answer each round. */
  roundSeconds: number;
  /** Chance that the rival answers right. */
  accuracy: number;
  /** The rival answers somewhere in this range of milliseconds after the round starts. */
  answerMs: [min: number, max: number];
}

/** The first rival is always open; every other one opens after beating the previous one. */
export function isRivalUnlocked(ladder: Rival[], rivalId: string, beaten: string[]): boolean {
  const index = ladder.findIndex((rival) => rival.id === rivalId);
  return index === 0 || (index > 0 && beaten.includes(ladder[index - 1].id));
}
