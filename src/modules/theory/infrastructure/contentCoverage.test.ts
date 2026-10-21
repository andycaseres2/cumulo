/**
 * Contract test over the real Markdown content: the theory must cover the whole
 * official CLF-C02 guide (every task statement and every in-scope service).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { EXAM_DOMAIN_IDS } from '@/modules/exam/domain/ExamDomain';
import { EXAM_TASKS, findExamTask } from '@/modules/exam/domain/ExamTask';
import { allInScopeServices } from '@/modules/exam/domain/inScopeServices';

const CONTENT_DIR = join(process.cwd(), 'src/content/theory');

interface Frontmatter {
  file: string;
  domain: string;
  order: number;
  examTasks: string[];
  services: string[];
}

function readFrontmatter(file: string): Frontmatter {
  const text = readFileSync(join(CONTENT_DIR, file), 'utf8');
  const block = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const field = (name: string) => block.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? '';
  const list = (name: string): string[] => {
    const raw = field(name);
    return raw.startsWith('[') ? JSON.parse(raw) : [];
  };
  return {
    file,
    domain: field('domain').replace(/"/g, ''),
    order: Number(field('order')),
    examTasks: list('examTasks'),
    services: list('services'),
  };
}

const topics = readdirSync(CONTENT_DIR)
  .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
  .map(readFrontmatter);

describe('theory content coverage (CLF-C02)', () => {
  it('covers every task statement of the official exam guide', () => {
    const covered = new Set(topics.flatMap((t) => t.examTasks));
    expect(EXAM_TASKS.filter((task) => !covered.has(task.id)).map((task) => task.id)).toEqual([]);
  });

  it('mentions every in-scope service in at least one topic', () => {
    const covered = new Set(topics.flatMap((t) => t.services));
    expect(allInScopeServices().filter((service) => !covered.has(service))).toEqual([]);
  });

  it('only references task statements that exist', () => {
    const unknown = topics.flatMap((t) => t.examTasks.filter((id) => !findExamTask(id)).map((id) => `${t.file}: ${id}`));
    expect(unknown).toEqual([]);
  });

  it('declares at least one task per topic and uses unique orders inside each domain', () => {
    expect(topics.filter((t) => t.examTasks.length === 0).map((t) => t.file)).toEqual([]);
    for (const domain of EXAM_DOMAIN_IDS) {
      const orders = topics.filter((t) => t.domain === domain).map((t) => t.order);
      expect(new Set(orders).size, domain).toBe(orders.length);
    }
  });
});
