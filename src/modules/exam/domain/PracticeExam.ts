import { EXAM_DOMAINS, type ExamDomainId } from './ExamDomain';
import { EXAM_FORMAT } from './ExamFormat';

export interface ExamOption {
  label: string;
  explanation: string;
  correct: boolean;
}

/** A question available for practice exams, with the domain and topic it comes from. */
export interface BankQuestion {
  id: string;
  domainId: ExamDomainId;
  topicSlug: string;
  prompt: string;
  options: ExamOption[];
}

export interface PracticeExam {
  questions: BankQuestion[];
}

export interface DomainScore {
  domainId: ExamDomainId;
  correct: number;
  total: number;
}

export interface PracticeExamResult {
  correct: number;
  total: number;
  /** Estimated score on the exam's 100–1000 scale. */
  score: number;
  passed: boolean;
  byDomain: DomainScore[];
}

/** Splits `total` questions by the domain weights, rounding by largest remainder so they add up. */
export function questionsPerDomain(total: number): Record<ExamDomainId, number> {
  const exact = EXAM_DOMAINS.map((d) => ({ id: d.id, value: (total * d.weight) / 100 }));
  const counts = Object.fromEntries(exact.map((e) => [e.id, Math.floor(e.value)])) as Record<ExamDomainId, number>;
  let missing = total - Object.values(counts).reduce((sum, n) => sum + n, 0);
  for (const e of [...exact].sort((a, b) => (b.value % 1) - (a.value % 1))) {
    if (missing-- <= 0) break;
    counts[e.id] += 1;
  }
  return counts;
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Draws a practice exam from the bank: domain split by weight, questions and options shuffled. */
export function buildPracticeExam(
  bank: BankQuestion[],
  { total = EXAM_FORMAT.questions, random = Math.random }: { total?: number; random?: () => number } = {},
): PracticeExam {
  const perDomain = questionsPerDomain(total);
  const picked = EXAM_DOMAINS.flatMap((d) =>
    shuffle(
      bank.filter((q) => q.domainId === d.id),
      random,
    ).slice(0, perDomain[d.id]),
  );
  return { questions: shuffle(picked, random).map((q) => ({ ...q, options: shuffle(q.options, random) })) };
}

/**
 * Scores the answers (index of the chosen option, or null when unanswered). AWS does not publish its scaling,
 * so the percentage of right answers is mapped linearly onto 100–1000 as an estimate.
 */
export function scorePracticeExam(exam: PracticeExam, answers: (number | null)[]): PracticeExamResult {
  const isRight = exam.questions.map((q, i) => answers[i] !== null && answers[i] !== undefined && q.options[answers[i]!]?.correct === true);
  const correct = isRight.filter(Boolean).length;
  const total = exam.questions.length;
  const score = total === 0 ? EXAM_FORMAT.minScore : Math.round(EXAM_FORMAT.minScore + ((EXAM_FORMAT.maxScore - EXAM_FORMAT.minScore) * correct) / total);
  const byDomain = EXAM_DOMAINS.map((d) => ({
    domainId: d.id,
    correct: exam.questions.filter((q, i) => q.domainId === d.id && isRight[i]).length,
    total: exam.questions.filter((q) => q.domainId === d.id).length,
  })).filter((d) => d.total > 0);
  return { correct, total, score, passed: score >= EXAM_FORMAT.passingScore, byDomain };
}
