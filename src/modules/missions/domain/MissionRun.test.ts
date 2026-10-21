import { describe, expect, it } from 'vitest';
import { twoStepMission as mission } from '../testing/fixtures';
import { answer, currentDecision, isFinished, runResult, startRun } from './MissionRun';

describe('mission run', () => {
  it('starts at the first decision with no answers, in the chosen mode', () => {
    const run = startRun(mission, 'learn');
    expect(run).toEqual({ missionId: 'test-mission', mode: 'learn', answers: [] });
    expect(currentDecision(run, mission)?.id).toBe('first');
  });

  it('records an answer, tells whether it was right, and moves to the next decision', () => {
    const { run, feedback } = answer(startRun(mission, 'learn'), mission, 'b');

    expect(feedback.correct).toBe(false);
    expect(feedback.chosen.id).toBe('b');
    expect(feedback.correctOption.id).toBe('a');
    expect(currentDecision(run, mission)?.id).toBe('second');
  });

  it('finishes after the last decision and refuses further answers', () => {
    let run = startRun(mission, 'practice');
    run = answer(run, mission, 'a').run;
    run = answer(run, mission, 'f').run;

    expect(isFinished(run, mission)).toBe(true);
    expect(currentDecision(run, mission)).toBeNull();
    expect(() => answer(run, mission, 'a')).toThrow();
  });

  it('rejects an option that does not belong to the current decision', () => {
    expect(() => answer(startRun(mission, 'learn'), mission, 'f')).toThrow();
  });

  it('scores the run and reviews every decision with the chosen and the correct option', () => {
    let run = startRun(mission, 'practice');
    run = answer(run, mission, 'a').run;
    run = answer(run, mission, 'g').run;

    const result = runResult(run, mission);

    expect(result).toMatchObject({ correct: 1, total: 2, score: 0.5, passed: false });
    expect(result.review.map((r) => [r.decision.id, r.chosen.id, r.correctOption.id, r.correct])).toEqual([
      ['first', 'a', 'a', true],
      ['second', 'g', 'f', false],
    ]);
  });
});
