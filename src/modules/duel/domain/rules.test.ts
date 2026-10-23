import { describe, expect, it } from 'vitest';
import { drawCards } from './deck';
import { mergeDuelProgress, recordDuelWin, recordPractice, recordTimeAttack, emptyDuelProgress } from './DuelProgress';
import { isRivalUnlocked, type Rival } from './Rival';
import type { DuelCard, ServiceFamily } from './ServiceFamily';
import { TIME_ATTACK_MS, WRONG_PENALTY_MS, answerTimeAttack, startTimeAttack, timeLeft } from './TimeAttack';

const card = (id: string): DuelCard => ({
  id,
  prompt: 'p',
  topicSlug: 't',
  answer: 'A',
  options: [
    { service: 'A', why: '' },
    { service: 'B', why: '' },
    { service: 'C', why: '' },
  ],
});
const family = (id: string, ids: string[]): ServiceFamily => ({ id, title: id, summary: '', services: [], cards: ids.map(card) });
let seed = 1;
const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

describe('drawCards', () => {
  it('draws distinct scenarios from the chosen families only', () => {
    const drawn = drawCards([family('x', ['x-1', 'x-2', 'x-3']), family('y', ['y-1'])], 3, random);
    expect(drawn).toHaveLength(3);
    expect(new Set(drawn.map((c) => c.id)).size).toBe(3);
  });

  it('never draws more scenarios than there are', () => {
    expect(drawCards([family('x', ['x-1', 'x-2'])], 10, random)).toHaveLength(2);
  });

  it('shuffles the options of each scenario without losing any', () => {
    for (const drawn of drawCards([family('x', ['x-1', 'x-2', 'x-3'])], 3, random)) {
      expect(drawn.options.map((o) => o.service).sort()).toEqual(['A', 'B', 'C']);
    }
  });
});

describe('time attack', () => {
  it('starts with a full minute and counts right answers', () => {
    const state = answerTimeAttack(startTimeAttack(0), true, 1000);
    expect(state.score).toBe(1);
    expect(timeLeft(state, 1000)).toBe(TIME_ATTACK_MS - 1000);
  });

  it('takes seconds away for a wrong answer', () => {
    const state = answerTimeAttack(startTimeAttack(0), false, 1000);
    expect(state.score).toBe(0);
    expect(timeLeft(state, 1000)).toBe(TIME_ATTACK_MS - 1000 - WRONG_PENALTY_MS);
  });

  it('never has negative time left', () => {
    expect(timeLeft(startTimeAttack(0), TIME_ATTACK_MS * 2)).toBe(0);
  });
});

describe('duel progress', () => {
  it('remembers beaten rivals once and keeps the best scores', () => {
    let progress = recordDuelWin(emptyDuelProgress(), 'trainee');
    progress = recordDuelWin(progress, 'trainee');
    progress = recordTimeAttack(recordTimeAttack(progress, 12), 8);
    progress = recordPractice(recordPractice(progress, 'storage', 0.9), 'storage', 0.5);
    expect(progress).toEqual({ beatenRivals: ['trainee'], bestTimeAttack: 12, bestPractice: { storage: 0.9 } });
  });

  it('joins the account and the device copies without losing anything', () => {
    const a = { beatenRivals: ['trainee'], bestTimeAttack: 5, bestPractice: { storage: 0.4 } };
    const b = { beatenRivals: ['analyst'], bestTimeAttack: 9, bestPractice: { storage: 0.7, compute: 1 } };
    expect(mergeDuelProgress(a, b)).toEqual({
      beatenRivals: ['trainee', 'analyst'],
      bestTimeAttack: 9,
      bestPractice: { storage: 0.7, compute: 1 },
    });
  });
});

describe('isRivalUnlocked', () => {
  const ladder = ['a', 'b', 'c'].map((id): Rival => ({ id, name: id, title: '', quote: '', families: [], roundSeconds: 10, accuracy: 1, answerMs: [0, 1] }));

  it('opens the first rival and each next one after beating the previous', () => {
    expect(isRivalUnlocked(ladder, 'a', [])).toBe(true);
    expect(isRivalUnlocked(ladder, 'b', [])).toBe(false);
    expect(isRivalUnlocked(ladder, 'b', ['a'])).toBe(true);
    expect(isRivalUnlocked(ladder, 'c', ['a'])).toBe(false);
  });
});
