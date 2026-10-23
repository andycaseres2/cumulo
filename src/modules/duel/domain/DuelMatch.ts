import type { Rival } from './Rival';
import type { DuelCard } from './ServiceFamily';

export const MAX_HP = 100;
export const MAX_ROUNDS = 12;
/** Damage of a won round; the player adds a speed bonus and a combo bonus on top. */
export const BASE_DAMAGE = 20;
export const MAX_SPEED_BONUS = 10;
export const COMBO_BONUS = 5;
export const MAX_COMBO_BONUS = 15;

export interface MatchState {
  /** Rounds played so far. */
  round: number;
  playerHp: number;
  rivalHp: number;
  /** Rounds the player won in a row. */
  streak: number;
}

/** What the rival will do in a round, decided before it starts. */
export interface RivalPlan {
  atMs: number;
  choice: string;
  correct: boolean;
}

export interface PlayerAnswer {
  choice: string;
  atMs: number;
}

export interface RoundResult {
  card: DuelCard;
  winner: 'player' | 'rival' | 'none';
  /** Null when the player did not answer in time. */
  playerChoice: string | null;
  playerCorrect: boolean;
  rival: RivalPlan;
  damage: number;
}

export type MatchOutcome = 'playing' | 'won' | 'lost' | 'draw';

export function startMatch(): MatchState {
  return { round: 0, playerHp: MAX_HP, rivalHp: MAX_HP, streak: 0 };
}

export function planRivalAnswer(rival: Rival, card: DuelCard, random: () => number): RivalPlan {
  const correct = random() < rival.accuracy;
  const wrong = card.options.filter((option) => option.service !== card.answer);
  const choice = correct ? card.answer : wrong[Math.floor(random() * wrong.length)].service;
  const [min, max] = rival.answerMs;
  return { atMs: Math.round(min + random() * (max - min)), choice, correct };
}

/** Faster right answers hit harder: the full bonus at once, nothing at the time limit. */
function speedBonus(atMs: number, limitMs: number): number {
  return Math.round(MAX_SPEED_BONUS * Math.max(0, 1 - atMs / limitMs));
}

/**
 * The first right answer wins the round and hits the other side; a wrong answer only loses the chance.
 * Ties go to the player. Answers after `limitMs` count as no answer.
 */
export function playRound(
  state: MatchState,
  card: DuelCard,
  rival: RivalPlan,
  player: PlayerAnswer | null,
  limitMs: number,
): { state: MatchState; result: RoundResult } {
  const answered = player && player.atMs <= limitMs ? player : null;
  const playerCorrect = answered?.choice === card.answer;
  const playerAt = playerCorrect ? answered!.atMs : Infinity;
  const rivalAt = rival.correct && rival.atMs <= limitMs ? rival.atMs : Infinity;
  const winner = playerAt === Infinity && rivalAt === Infinity ? 'none' : playerAt <= rivalAt ? 'player' : 'rival';

  const streak = winner === 'player' ? state.streak + 1 : 0;
  const damage =
    winner === 'player'
      ? BASE_DAMAGE + speedBonus(playerAt, limitMs) + Math.min(MAX_COMBO_BONUS, COMBO_BONUS * (streak - 1))
      : winner === 'rival'
        ? BASE_DAMAGE
        : 0;

  return {
    state: {
      round: state.round + 1,
      streak,
      playerHp: winner === 'rival' ? Math.max(0, state.playerHp - damage) : state.playerHp,
      rivalHp: winner === 'player' ? Math.max(0, state.rivalHp - damage) : state.rivalHp,
    },
    result: { card, winner, playerChoice: answered?.choice ?? null, playerCorrect, rival, damage },
  };
}

export function matchResult(state: MatchState): MatchOutcome {
  if (state.rivalHp <= 0) return 'won';
  if (state.playerHp <= 0) return 'lost';
  if (state.round < MAX_ROUNDS) return 'playing';
  return state.playerHp > state.rivalHp ? 'won' : state.playerHp < state.rivalHp ? 'lost' : 'draw';
}
