import { describe, expect, it } from 'vitest';
import { BASE_DAMAGE, MAX_HP, MAX_ROUNDS, matchResult, planRivalAnswer, playRound, startMatch, type RivalPlan } from './DuelMatch';
import type { DuelCard } from './ServiceFamily';
import type { Rival } from './Rival';

const card: DuelCard = {
  id: 'c1',
  prompt: 'Prompt',
  topicSlug: 't',
  answer: 'Amazon S3',
  options: [
    { service: 'Amazon S3', why: 'right' },
    { service: 'Amazon EBS', why: 'no' },
    { service: 'Amazon EFS', why: 'no' },
  ],
};
const rival: Rival = { id: 'r', name: 'R', title: '', quote: '', families: [], roundSeconds: 10, accuracy: 0.5, answerMs: [2000, 6000] };
const rivalAt = (atMs: number, correct = true): RivalPlan => ({ atMs, choice: correct ? 'Amazon S3' : 'Amazon EBS', correct });
const limit = 10_000;

describe('playRound', () => {
  it('the player who answers right first hits the rival, faster answers hit harder', () => {
    const slow = playRound(startMatch(), card, rivalAt(9000), { choice: 'Amazon S3', atMs: 8000 }, limit);
    const fast = playRound(startMatch(), card, rivalAt(9000), { choice: 'Amazon S3', atMs: 1000 }, limit);
    expect(slow.result.winner).toBe('player');
    expect(MAX_HP - slow.state.rivalHp).toBeGreaterThanOrEqual(BASE_DAMAGE);
    expect(fast.state.rivalHp).toBeLessThan(slow.state.rivalHp);
    expect(slow.state.playerHp).toBe(MAX_HP);
  });

  it('the rival wins the round when it answers right before the player', () => {
    const { state, result } = playRound(startMatch(), card, rivalAt(2000), { choice: 'Amazon S3', atMs: 3000 }, limit);
    expect(result.winner).toBe('rival');
    expect(state.playerHp).toBe(MAX_HP - BASE_DAMAGE);
    expect(state.rivalHp).toBe(MAX_HP);
  });

  it('a wrong answer never wins, even when it is the first one', () => {
    const { result, state } = playRound(startMatch(), card, rivalAt(5000), { choice: 'Amazon EFS', atMs: 1000 }, limit);
    expect(result.winner).toBe('rival');
    expect(result.playerCorrect).toBe(false);
    expect(state.streak).toBe(0);
  });

  it('nobody is hit when both miss or time runs out', () => {
    const { result, state } = playRound(startMatch(), card, rivalAt(3000, false), null, limit);
    expect(result.winner).toBe('none');
    expect([state.playerHp, state.rivalHp]).toEqual([MAX_HP, MAX_HP]);
  });

  it('a streak of won rounds adds a combo bonus', () => {
    let state = startMatch();
    const hits: number[] = [];
    for (let i = 0; i < 3; i++) {
      const before = state.rivalHp;
      state = playRound(state, card, rivalAt(9000), { choice: 'Amazon S3', atMs: 5000 }, limit).state;
      hits.push(before - state.rivalHp);
    }
    expect(hits[1]).toBeGreaterThan(hits[0]);
    expect(hits[2]).toBeGreaterThan(hits[1]);
    expect(state.streak).toBe(3);
  });

  it('a player answer after the time limit counts as no answer', () => {
    const { result } = playRound(startMatch(), card, rivalAt(9999, false), { choice: 'Amazon S3', atMs: limit + 1 }, limit);
    expect(result.winner).toBe('none');
  });
});

describe('matchResult', () => {
  it('is over when someone runs out of health', () => {
    expect(matchResult({ ...startMatch(), rivalHp: 0 })).toBe('won');
    expect(matchResult({ ...startMatch(), playerHp: 0 })).toBe('lost');
    expect(matchResult(startMatch())).toBe('playing');
  });

  it('after the last round, more health wins and equal health is a draw', () => {
    const last = { ...startMatch(), round: MAX_ROUNDS };
    expect(matchResult({ ...last, playerHp: 60, rivalHp: 40 })).toBe('won');
    expect(matchResult({ ...last, playerHp: 40, rivalHp: 60 })).toBe('lost');
    expect(matchResult({ ...last, playerHp: 50, rivalHp: 50 })).toBe('draw');
  });
});

describe('planRivalAnswer', () => {
  it('answers right as often as its accuracy, inside its time range', () => {
    const right = planRivalAnswer(rival, card, () => 0.2);
    const wrong = planRivalAnswer(rival, card, () => 0.9);
    expect(right).toMatchObject({ correct: true, choice: 'Amazon S3' });
    expect(wrong.correct).toBe(false);
    expect(wrong.choice).not.toBe('Amazon S3');
    for (const plan of [right, wrong]) {
      expect(plan.atMs).toBeGreaterThanOrEqual(2000);
      expect(plan.atMs).toBeLessThanOrEqual(6000);
    }
  });
});
