/** Contract over the real mission content: every decision is fair, explained and linked to theory. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findExamTask } from '@/modules/exam/domain/ExamTask';
import { districtOf } from '@/modules/games/cumulo-city/world/districts';
import { staticMissionCatalog, UNPLANNED_MISSIONS } from './staticMissionCatalog';

const missions = await staticMissionCatalog.all();
const theoryFile = (slug: string) => join(process.cwd(), 'src/content/theory', `${slug}.md`);
const topicDomain = (slug: string) => readFileSync(theoryFile(slug), 'utf8').match(/^domain:\s*"?([\w-]+)"?/m)?.[1];

describe.each(missions.map((m) => [m.id, m] as const))('mission %s', (_, mission) => {
  it('belongs to a building of its district, about a topic of that district’s exam domain', () => {
    const district = districtOf(mission.buildingId);
    expect(district?.id, mission.buildingId).toBe(mission.track);
    expect(existsSync(theoryFile(mission.topicSlug)), mission.topicSlug).toBe(true);
    expect(topicDomain(mission.topicSlug)).toBe(district?.domainId);
  });

  it('has a story to tell', () => {
    expect(mission.intro.length).toBeGreaterThanOrEqual(3);
    expect(mission.outro.passed.length).toBeGreaterThan(0);
    expect(mission.outro.failed.length).toBeGreaterThan(0);
  });

  it('gives every decision four options with exactly one correct answer', () => {
    for (const d of mission.decisions) {
      expect(d.options, d.id).toHaveLength(4);
      expect(d.options.filter((o) => o.correct), d.id).toHaveLength(1);
      expect(new Set(d.options.map((o) => o.id)).size, d.id).toBe(4);
    }
  });

  it('defines and explains every option', () => {
    for (const o of mission.decisions.flatMap((d) => d.options)) {
      expect(o.definition.length, o.id).toBeGreaterThan(30);
      expect(o.explanation.length, o.id).toBeGreaterThan(30);
    }
  });

  it('does not always put the correct answer in the same position', () => {
    const positions = mission.decisions.map((d) => d.options.findIndex((o) => o.correct));
    expect(new Set(positions).size).toBeGreaterThan(1);
  });

  it('links every decision to an existing theory topic and real exam tasks', () => {
    for (const d of mission.decisions) {
      expect(existsSync(theoryFile(d.topicSlug)), d.topicSlug).toBe(true);
      expect(d.examTasks.length, d.id).toBeGreaterThan(0);
      for (const task of d.examTasks) expect(findExamTask(task), `${d.id}: ${task}`).toBeDefined();
    }
  });
});

describe('mission catalog', () => {
  it('starts the Centro campaign with the bakery and finds missions by building', async () => {
    expect(missions.find((m) => m.track === 'centro')?.id).toBe('bakery-elasticity');
    expect((await staticMissionCatalog.inBuilding('bank')).map((m) => m.id)).toContain('bank-access');
    await expect(staticMissionCatalog.inBuilding('nowhere')).resolves.toEqual([]);
  });

  it('uses unique mission ids, and every mission file is in the campaign order', () => {
    expect(new Set(missions.map((m) => m.id)).size).toBe(missions.length);
    expect(UNPLANNED_MISSIONS).toEqual([]);
  });

  it('gives every client a name of their own in the whole city', () => {
    const names = missions.map((m) => m.client.name);
    expect(names.filter((name, i) => names.indexOf(name) !== i)).toEqual([]);
  });

  it('gives every theory topic two missions, each with its own client and case', () => {
    const topics = readdirSync(join(process.cwd(), 'src/content/theory')).map((f) => f.replace(/\.md$/, ''));
    for (const topic of topics) {
      const about = missions.filter((m) => m.topicSlug === topic);
      expect(about.length, topic).toBe(2);
      expect(new Set(about.map((m) => m.client.name)).size, topic).toBe(2);
      expect(new Set(about.map((m) => m.title)).size, topic).toBe(2);
    }
  });

  it('practices all four exam domains across the campaign', () => {
    const domains = new Set(missions.flatMap((m) => m.decisions.flatMap((d) => d.examTasks.map((t) => t[0]))));
    expect([...domains].sort()).toEqual(['1', '2', '3', '4']);
  });
});
