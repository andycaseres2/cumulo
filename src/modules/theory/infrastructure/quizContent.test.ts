/**
 * Contract over the real Markdown content: every topic ends with its quiz and carries extra questions
 * for the practice exam. The content schema already checks each question (4 options, exactly one correct).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const CONTENT_DIR = join(process.cwd(), 'src/content/theory');

/** The indented YAML block under a top-level frontmatter key, up to the next top-level key. */
function block(frontmatter: string, key: string): string {
  return frontmatter.match(new RegExp(`^${key}:\\s*\\n((?:(?: .*)?\\n?)*)`, 'm'))?.[1] ?? '';
}

function questions(yaml: string) {
  return yaml
    .split(/^ {2}- prompt:/m)
    .slice(1)
    .map((question) => ({
      prompt: question.split('\n')[0].trim(),
      // Position (0–3) of the correct option.
      correct: question.split(/^ {6}- label:/m).slice(1).findIndex((option) => /^ {8}correct: true\s*$/m.test(option)),
    }));
}

const topics = readdirSync(CONTENT_DIR)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const frontmatter = readFileSync(join(CONTENT_DIR, file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    return { file, quiz: questions(block(frontmatter, 'quiz')), practice: questions(block(frontmatter, 'practice')) };
  });

describe.each(topics.map((t) => [t.file, t] as const))('questions of %s', (_, topic) => {
  it('ends with a quiz of three questions, each with a correct option', () => {
    expect(topic.quiz).toHaveLength(3);
    expect(topic.quiz.every((q) => q.correct >= 0)).toBe(true);
    expect(new Set(topic.quiz.map((q) => q.correct)).size).toBeGreaterThan(1);
  });

  it('has six more questions for the practice exam, with the correct option in varied positions', () => {
    expect(topic.practice).toHaveLength(6);
    expect(topic.practice.every((q) => q.correct >= 0)).toBe(true);
    expect(new Set(topic.practice.map((q) => q.correct)).size).toBeGreaterThanOrEqual(3);
  });
});

describe('question bank', () => {
  it('never repeats a question', () => {
    const prompts = topics.flatMap((t) => [...t.quiz, ...t.practice].map((q) => q.prompt));
    expect(prompts.length - new Set(prompts).size).toBe(0);
  });
});
