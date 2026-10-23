/** What a player achieved in the duel: rivals beaten, best time attack and best training result per family. */
export interface DuelProgress {
  beatenRivals: string[];
  /** Right answers in the best time attack. */
  bestTimeAttack: number;
  /** Best share of right answers (0–1) in a training of each family. */
  bestPractice: Record<string, number>;
}

/** Port: where duel progress is kept. */
export interface DuelProgressStore {
  load(): Promise<DuelProgress>;
  save(progress: DuelProgress): Promise<void>;
}

export function emptyDuelProgress(): DuelProgress {
  return { beatenRivals: [], bestTimeAttack: 0, bestPractice: {} };
}

export function recordDuelWin(progress: DuelProgress, rivalId: string): DuelProgress {
  return progress.beatenRivals.includes(rivalId) ? progress : { ...progress, beatenRivals: [...progress.beatenRivals, rivalId] };
}

export function recordTimeAttack(progress: DuelProgress, score: number): DuelProgress {
  return { ...progress, bestTimeAttack: Math.max(progress.bestTimeAttack, score) };
}

export function recordPractice(progress: DuelProgress, familyId: string, share: number): DuelProgress {
  return { ...progress, bestPractice: { ...progress.bestPractice, [familyId]: Math.max(progress.bestPractice[familyId] ?? 0, share) } };
}

/** Two copies joined: nothing achieved is lost. */
export function mergeDuelProgress(a: DuelProgress, b: DuelProgress): DuelProgress {
  const families = new Set([...Object.keys(a.bestPractice), ...Object.keys(b.bestPractice)]);
  return {
    beatenRivals: [...new Set([...a.beatenRivals, ...b.beatenRivals])],
    bestTimeAttack: Math.max(a.bestTimeAttack, b.bestTimeAttack),
    bestPractice: Object.fromEntries([...families].map((id) => [id, Math.max(a.bestPractice[id] ?? 0, b.bestPractice[id] ?? 0)])),
  };
}
