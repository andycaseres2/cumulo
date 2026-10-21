import type { Decision, Mission, MissionMode, MissionOption } from './Mission';

/** The player's way through a mission: one chosen option id per answered decision. */
export interface MissionRun {
  missionId: string;
  mode: MissionMode;
  answers: string[];
}

export interface AnswerFeedback {
  correct: boolean;
  chosen: MissionOption;
  correctOption: MissionOption;
}

export interface ReviewEntry extends AnswerFeedback {
  decision: Decision;
}

export interface MissionResult {
  correct: number;
  total: number;
  /** Fraction of correct answers, 0–1. */
  score: number;
  passed: boolean;
  review: ReviewEntry[];
}

export function startRun(mission: Mission, mode: MissionMode): MissionRun {
  return { missionId: mission.id, mode, answers: [] };
}

export function currentDecision(run: MissionRun, mission: Mission): Decision | null {
  return mission.decisions[run.answers.length] ?? null;
}

export function isFinished(run: MissionRun, mission: Mission): boolean {
  return run.answers.length >= mission.decisions.length;
}

function correctOptionOf(decision: Decision): MissionOption {
  const option = decision.options.find((o) => o.correct);
  if (!option) throw new Error(`Decision ${decision.id} has no correct option`);
  return option;
}

function feedbackFor(decision: Decision, optionId: string): AnswerFeedback {
  const chosen = decision.options.find((o) => o.id === optionId);
  if (!chosen) throw new Error(`Option ${optionId} does not belong to decision ${decision.id}`);
  return { correct: chosen.correct, chosen, correctOption: correctOptionOf(decision) };
}

/** Answers the current decision. Returns a new run; the given one is not modified. */
export function answer(run: MissionRun, mission: Mission, optionId: string): { run: MissionRun; feedback: AnswerFeedback } {
  const decision = currentDecision(run, mission);
  if (!decision) throw new Error(`Mission ${mission.id} is already finished`);
  const feedback = feedbackFor(decision, optionId);
  return { run: { ...run, answers: [...run.answers, optionId] }, feedback };
}

export function runResult(run: MissionRun, mission: Mission): MissionResult {
  const review = run.answers.map((optionId, i) => {
    const decision = mission.decisions[i];
    return { decision, ...feedbackFor(decision, optionId) };
  });
  const correct = review.filter((r) => r.correct).length;
  const total = mission.decisions.length;
  const score = total === 0 ? 0 : correct / total;
  return { correct, total, score, passed: score >= mission.passingScore, review };
}
