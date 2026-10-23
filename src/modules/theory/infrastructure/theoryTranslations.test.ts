/**
 * Contract over the English translations of the theory topics: every file in `en/` keeps the structure
 * of its Spanish original (same metadata, same questions and options, same right answers) and is
 * actually translated. The content schema already validates each file on its own.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const THEORY_DIR = join(process.cwd(), 'src/content/theory');
const ES_DIR = join(THEORY_DIR, 'es');
const EN_DIR = join(THEORY_DIR, 'en');

function frontmatterOf(path: string): string {
  return readFileSync(path, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
}

/** The value of a top-level single-line frontmatter key. */
function scalar(frontmatter: string, key: string): string | undefined {
  return frontmatter.match(new RegExp(`^${key}:[ \\t]*(.*)$`, 'm'))?.[1].trim();
}

/** The indented YAML block under a top-level frontmatter key, up to the next top-level key. */
function block(frontmatter: string, key: string): string {
  return frontmatter.match(new RegExp(`^${key}:\\s*\\n((?:(?: .*)?\\n?)*)`, 'm'))?.[1] ?? '';
}

function questions(yaml: string) {
  return yaml
    .split(/^ {2}- prompt:/m)
    .slice(1)
    .map((question) => {
      const options = question.split(/^ {6}- label:/m).slice(1);
      return {
        prompt: question.split('\n')[0].trim(),
        options: options.length,
        // Position of the correct option.
        correct: options.findIndex((option) => /^ {8}correct: true\s*$/m.test(option)),
      };
    });
}

function topic(path: string) {
  const frontmatter = frontmatterOf(path);
  return {
    title: scalar(frontmatter, 'title'),
    summary: scalar(frontmatter, 'summary'),
    metadata: ['domain', 'order', 'examTasks', 'services', 'readingMinutes'].map((key) => scalar(frontmatter, key)),
    sources: block(frontmatter, 'sources').trim(),
    quiz: questions(block(frontmatter, 'quiz')),
    practice: questions(block(frontmatter, 'practice')),
  };
}

const translated = existsSync(EN_DIR) ? readdirSync(EN_DIR).filter((file) => file.endsWith('.md')) : [];

describe.skipIf(translated.length === 0).each(translated)('English translation of %s', (file) => {
  const en = topic(join(EN_DIR, file));
  const esPath = join(ES_DIR, file);

  it('has a Spanish original with the same file name', () => {
    expect(existsSync(esPath)).toBe(true);
  });

  const es = existsSync(esPath) ? topic(esPath) : undefined;

  it('keeps domain, order, exam tasks, services, reading time and sources', () => {
    expect(en.metadata).toEqual(es?.metadata);
    expect(en.sources).toBe(es?.sources);
  });

  it('keeps the same questions, option counts and right answers', () => {
    const shape = (t: typeof en | undefined) =>
      t && { quiz: t.quiz.map((q) => [q.options, q.correct]), practice: t.practice.map((q) => [q.options, q.correct]) };
    expect(en.quiz.length).toBeGreaterThan(0);
    expect(shape(en)).toEqual(shape(es));
  });

  // A title can be a proper name in both languages (e.g. "AWS Cloud Adoption Framework (AWS CAF)"),
  // so the summary is what proves the heading copy was translated.
  it('is actually translated: summary and every prompt differ from Spanish', () => {
    expect(en.title).toBeTruthy();
    expect(en.summary).not.toBe(es?.summary);
    const enPrompts = [...en.quiz, ...en.practice].map((q) => q.prompt);
    const esPrompts = new Set([...(es?.quiz ?? []), ...(es?.practice ?? [])].map((q) => q.prompt));
    expect(enPrompts.filter((prompt) => esPrompts.has(prompt))).toEqual([]);
  });
});
