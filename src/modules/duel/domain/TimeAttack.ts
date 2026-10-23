export const TIME_ATTACK_MS = 60_000;
export const WRONG_PENALTY_MS = 3_000;

export interface TimeAttackState {
  startedAt: number;
  /** Time taken away by wrong answers. */
  penaltyMs: number;
  score: number;
  answered: number;
}

export function startTimeAttack(now: number): TimeAttackState {
  return { startedAt: now, penaltyMs: 0, score: 0, answered: 0 };
}

/** A right answer scores a point; a wrong one takes seconds off the clock. */
export function answerTimeAttack(state: TimeAttackState, correct: boolean, _now: number): TimeAttackState {
  return {
    ...state,
    answered: state.answered + 1,
    score: state.score + (correct ? 1 : 0),
    penaltyMs: state.penaltyMs + (correct ? 0 : WRONG_PENALTY_MS),
  };
}

export function timeLeft(state: TimeAttackState, now: number): number {
  return Math.max(0, TIME_ATTACK_MS - (now - state.startedAt) - state.penaltyMs);
}
