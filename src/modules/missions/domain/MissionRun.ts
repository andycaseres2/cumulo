import type { Decision, Mission, MissionOption } from './Mission';

/** How the client feels before the first proposal (0–100). */
export const STARTING_SATISFACTION = 50;
/** Fee units per request of the job, and the bonus per star. */
const FEE_PER_REQUEST = 50;
const FEE_PER_STAR = 50;

/** The player's way through a job: one chosen option id per answered request, and where the manual was opened. */
export interface MissionRun {
  missionId: string;
  answers: string[];
  /** Ids of the requests (decisions) where the player consulted the manual. */
  manualUsed: string[];
}

export interface AnswerFeedback {
  correct: boolean;
  chosen: MissionOption;
  correctOption: MissionOption;
}

export interface ReviewEntry extends AnswerFeedback {
  decision: Decision;
  usedManual: boolean;
}

export interface MissionResult {
  correct: number;
  total: number;
  /** Fraction of correct answers, 0–1. */
  score: number;
  passed: boolean;
  /** Client satisfaction at the end, 0–100. */
  satisfaction: number;
  /** 0 when the client is not satisfied; 1–3 otherwise. */
  stars: number;
  /** Credits paid for the job; nothing when it is not approved. */
  fee: number;
  review: ReviewEntry[];
}

export function startRun(mission: Mission): MissionRun {
  return { missionId: mission.id, answers: [], manualUsed: [] };
}

export function currentDecision(run: MissionRun, mission: Mission): Decision | null {
  return mission.decisions[run.answers.length] ?? null;
}

export function isFinished(run: MissionRun, mission: Mission): boolean {
  return run.answers.length >= mission.decisions.length;
}

/** Opens the manual on the current request (definitions of every option); counted once per request. */
export function consultManual(run: MissionRun, mission: Mission): MissionRun {
  const decision = currentDecision(run, mission);
  if (!decision || run.manualUsed.includes(decision.id)) return run;
  return { ...run, manualUsed: [...run.manualUsed, decision.id] };
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

/** Proposes an option for the current request. Returns a new run; the given one is not modified. */
export function answer(run: MissionRun, mission: Mission, optionId: string): { run: MissionRun; feedback: AnswerFeedback } {
  const decision = currentDecision(run, mission);
  if (!decision) throw new Error(`Mission ${mission.id} is already finished`);
  const feedback = feedbackFor(decision, optionId);
  return { run: { ...run, answers: [...run.answers, optionId] }, feedback };
}

/** Each right proposal makes the client happier and each wrong one less so: all right is 100, all wrong is 0. */
export function satisfaction(run: MissionRun, mission: Mission): number {
  const total = mission.decisions.length;
  if (total === 0) return STARTING_SATISFACTION;
  const right = run.answers.filter((optionId, i) => feedbackFor(mission.decisions[i], optionId).correct).length;
  const wrong = run.answers.length - right;
  const step = (100 - STARTING_SATISFACTION) / total;
  return Math.round(Math.min(100, Math.max(0, STARTING_SATISFACTION + (right - wrong) * step)));
}

/** Credits for a job: bigger jobs and better ratings pay more; a rejected job (0 stars) pays nothing. */
export function jobFee(mission: Mission, stars: number): number {
  return stars === 0 ? 0 : mission.decisions.length * FEE_PER_REQUEST + stars * FEE_PER_STAR;
}

export function runResult(run: MissionRun, mission: Mission): MissionResult {
  const review = run.answers.map((optionId, i) => {
    const decision = mission.decisions[i];
    return { decision, usedManual: run.manualUsed.includes(decision.id), ...feedbackFor(decision, optionId) };
  });
  const correct = review.filter((r) => r.correct).length;
  const total = mission.decisions.length;
  const score = total === 0 ? 0 : correct / total;
  const passed = score >= mission.passingScore;
  const stars = passed ? 1 + (correct === total ? 1 : 0) + (run.manualUsed.length === 0 ? 1 : 0) : 0;
  return { correct, total, score, passed, satisfaction: satisfaction(run, mission), stars, fee: jobFee(mission, stars), review };
}
