import { describe, expect, it } from 'vitest';
import type { Mission } from './Mission';
import { answer, consultManual, currentDecision, isFinished, jobFee, runResult, satisfaction, startRun, STARTING_SATISFACTION } from './MissionRun';

const option = (id: string, correct = false) => ({ id, label: id.toUpperCase(), definition: `What ${id} is`, explanation: `Why ${id}`, correct });
const mission: Mission = {
  id: 'test-mission',
  track: 'downtown',
  buildingId: 'bakery',
  topicSlug: 'cloud-benefits',
  title: 'Test',
  client: { name: 'Rosa', role: 'Owner' },
  intro: ['Hi'],
  outro: { passed: ['Thanks'], failed: ['Too bad'] },
  passingScore: 0.5,
  decisions: [
    { id: 'd1', prompt: 'First?', options: [option('a', true), option('b'), option('c')], topicSlug: 't', examTasks: ['1.1'] },
    { id: 'd2', prompt: 'Second?', options: [option('d'), option('e', true), option('f')], topicSlug: 't', examTasks: ['1.1'] },
  ],
};

describe('a consulting job', () => {
  it('starts at the first request, with the client neither happy nor upset and the manual closed', () => {
    const run = startRun(mission);
    expect(run).toEqual({ missionId: 'test-mission', answers: [], manualUsed: [] });
    expect(currentDecision(run, mission)?.id).toBe('d1');
    expect(satisfaction(run, mission)).toBe(STARTING_SATISFACTION);
  });

  it('answers each request with immediate feedback, and the client satisfaction follows', () => {
    const first = answer(startRun(mission), mission, 'a');
    expect(first.feedback).toMatchObject({ correct: true, correctOption: { id: 'a' } });
    expect(satisfaction(first.run, mission)).toBeGreaterThan(STARTING_SATISFACTION);
    const second = answer(first.run, mission, 'f');
    expect(second.feedback).toMatchObject({ correct: false, chosen: { id: 'f' }, correctOption: { id: 'e' } });
    expect(satisfaction(second.run, mission)).toBe(STARTING_SATISFACTION);
    expect(isFinished(second.run, mission)).toBe(true);
  });

  it('rejects an option that is not part of the request', () => {
    expect(() => answer(startRun(mission), mission, 'f')).toThrow();
  });

  it('remembers on which requests the manual was opened, once each', () => {
    let run = consultManual(startRun(mission), mission);
    run = consultManual(run, mission);
    expect(run.manualUsed).toEqual(['d1']);
  });

  it('rates a perfect job without the manual with three stars and the full fee', () => {
    let run = answer(startRun(mission), mission, 'a').run;
    run = answer(run, mission, 'e').run;
    const result = runResult(run, mission);
    expect(result).toMatchObject({ correct: 2, total: 2, score: 1, passed: true, stars: 3, satisfaction: 100, fee: jobFee(mission, 3) });
    expect(result.review.map((r) => [r.decision.id, r.chosen.id, r.correctOption.id, r.correct, r.usedManual])).toEqual([
      ['d1', 'a', 'a', true, false],
      ['d2', 'e', 'e', true, false],
    ]);
  });

  it('takes a star away for opening the manual and another for a wrong proposal', () => {
    let run = consultManual(startRun(mission), mission);
    run = answer(run, mission, 'a').run;
    run = answer(run, mission, 'd').run;
    expect(runResult(run, mission)).toMatchObject({ passed: true, stars: 1 });
  });

  it('pays nothing and gives no stars when the client is not satisfied', () => {
    let run = answer(startRun(mission), mission, 'b').run;
    run = answer(run, mission, 'd').run;
    expect(runResult(run, mission)).toMatchObject({ passed: false, stars: 0, fee: 0, satisfaction: 0 });
  });

  it('pays more for bigger jobs and better ratings', () => {
    expect(jobFee(mission, 3)).toBeGreaterThan(jobFee(mission, 1));
    expect(jobFee({ ...mission, decisions: [...mission.decisions, ...mission.decisions] }, 1)).toBeGreaterThan(jobFee(mission, 1));
    expect(jobFee(mission, 0)).toBe(0);
  });
});
