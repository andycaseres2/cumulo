/**
 * Contract over the real Markdown content: domains with questions must have them in every topic.
 * The content schema already checks each quiz (3 questions, 4 options, exactly one correct).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const CONTENT_DIR = join(process.cwd(), 'src/content/theory');
/** Domains whose topics already end with a quiz; grows as questions are written. */
const DOMAINS_WITH_QUIZ = ['cloud-concepts'];

const topics = readdirSync(CONTENT_DIR)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const frontmatter = readFileSync(join(CONTENT_DIR, file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const domain = frontmatter.match(/^domain:\s*"?([\w-]+)"?/m)?.[1] ?? '';
    const quiz = frontmatter.split(/^quiz:\s*$/m)[1] ?? '';
    // Position (0–3) of the correct option in each question.
    const positions = quiz
      .split(/^ {2}- prompt:/m)
      .slice(1)
      .map((question) => question.split(/^ {6}- label:/m).slice(1).findIndex((option) => /^ {8}correct: true\s*$/m.test(option)));
    return { file, domain, positions };
  });

describe.each(topics.filter((t) => DOMAINS_WITH_QUIZ.includes(t.domain)).map((t) => [t.file, t] as const))('quiz of %s', (_, topic) => {
  it('has three questions, each with a correct option', () => {
    expect(topic.positions).toHaveLength(3);
    expect(topic.positions.every((p) => p >= 0)).toBe(true);
  });

  it('does not always put the correct option in the same position', () => {
    expect(new Set(topic.positions).size).toBeGreaterThan(1);
  });
});
