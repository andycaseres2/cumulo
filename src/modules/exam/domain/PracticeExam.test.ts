import { describe, expect, it } from 'vitest';
import type { ExamDomainId } from './ExamDomain';
import { buildPracticeExam, questionsPerDomain, scorePracticeExam, type BankQuestion } from './PracticeExam';

function bank(domainId: ExamDomainId, count: number): BankQuestion[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${domainId}-${i}`,
    domainId,
    topicSlug: `${domainId}-topic`,
    prompt: `Question ${i} of ${domainId}?`,
    options: [0, 1, 2, 3].map((o) => ({ label: `Option ${o}`, explanation: `Why ${o}`, correct: o === 0 })),
  }));
}

const fullBank = [
  ...bank('cloud-concepts', 18),
  ...bank('security-compliance', 30),
  ...bank('technology-services', 60),
  ...bank('billing-pricing-support', 18),
];

// Deterministic pseudo-random numbers so shuffles are repeatable in tests.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

describe('questionsPerDomain', () => {
  it('splits 65 questions by the official domain weights', () => {
    expect(questionsPerDomain(65)).toEqual({
      'cloud-concepts': 16,
      'security-compliance': 19,
      'technology-services': 22,
      'billing-pricing-support': 8,
    });
  });
});

describe('buildPracticeExam', () => {
  it('draws 65 different questions with the domain split', () => {
    const exam = buildPracticeExam(fullBank, { total: 65, random: seeded(7) });
    expect(exam.questions).toHaveLength(65);
    expect(new Set(exam.questions.map((q) => q.id)).size).toBe(65);
    const count = (d: ExamDomainId) => exam.questions.filter((q) => q.domainId === d).length;
    expect([count('cloud-concepts'), count('security-compliance'), count('technology-services'), count('billing-pricing-support')]).toEqual([16, 19, 22, 8]);
  });

  it('shuffles the questions and their options, keeping exactly one correct option', () => {
    const exam = buildPracticeExam(fullBank, { total: 65, random: seeded(3) });
    expect(exam.questions.map((q) => q.domainId).slice(0, 16).every((d) => d === 'cloud-concepts')).toBe(false);
    expect(exam.questions.every((q) => q.options.filter((o) => o.correct).length === 1)).toBe(true);
    expect(new Set(exam.questions.map((q) => q.options.findIndex((o) => o.correct))).size).toBeGreaterThan(1);
  });

  it('uses what the bank has when a domain is short', () => {
    const exam = buildPracticeExam([...bank('cloud-concepts', 2), ...bank('technology-services', 50)], { total: 65, random: seeded(1) });
    expect(exam.questions.filter((q) => q.domainId === 'cloud-concepts')).toHaveLength(2);
    expect(exam.questions).toHaveLength(24);
  });
});

describe('scorePracticeExam', () => {
  const exam = buildPracticeExam(fullBank, { total: 65, random: seeded(11) });
  const correctIndex = (i: number) => exam.questions[i].options.findIndex((o) => o.correct);
  const wrongIndex = (i: number) => (correctIndex(i) + 1) % 4;

  it('maps all right to 1000 and passes', () => {
    const result = scorePracticeExam(exam, exam.questions.map((_, i) => correctIndex(i)));
    expect(result).toMatchObject({ correct: 65, total: 65, score: 1000, passed: true });
  });

  it('counts unanswered questions as wrong and maps the percentage linearly from 100', () => {
    const answers = exam.questions.map((_, i) => (i < 39 ? correctIndex(i) : null));
    const result = scorePracticeExam(exam, answers);
    expect(result.correct).toBe(39);
    expect(result.score).toBe(Math.round(100 + (900 * 39) / 65));
    expect(result.passed).toBe(false);
  });

  it('passes from 700 and reports each domain in exam order', () => {
    // 43 of 65 right → 100 + 900 * 43 / 65 = 695 (fail); 44 → 709 (pass).
    const answersWith = (n: number) => exam.questions.map((_, i) => (i < n ? correctIndex(i) : wrongIndex(i)));
    expect(scorePracticeExam(exam, answersWith(43)).passed).toBe(false);
    expect(scorePracticeExam(exam, answersWith(44)).passed).toBe(true);

    const byDomain = scorePracticeExam(exam, answersWith(65)).byDomain;
    expect(byDomain.map((d) => [d.domainId, d.correct, d.total])).toEqual([
      ['cloud-concepts', 16, 16],
      ['security-compliance', 19, 19],
      ['technology-services', 22, 22],
      ['billing-pricing-support', 8, 8],
    ]);
  });
});
