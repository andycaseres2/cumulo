/** Contract over the real mission content: every decision is fair, explained and linked to theory. */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findExamTask } from '@/modules/exam/domain/ExamTask';
import { BUILDINGS } from '@/modules/games/nimbus-city/world/cityMap';
import { staticMissionCatalog } from './staticMissionCatalog';

const missions = await staticMissionCatalog.all();
const theoryFile = (slug: string) => join(process.cwd(), 'src/content/theory', `${slug}.md`);

describe.each(missions.map((m) => [m.id, m] as const))('mission %s', (_, mission) => {
  it('belongs to a building of the city and has a story to tell', () => {
    expect(BUILDINGS.map((b) => b.id)).toContain(mission.buildingId);
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
  it('has the bakery mission and finds it by building', async () => {
    expect((await staticMissionCatalog.findByBuilding('bakery'))?.id).toBe('bakery-elasticity');
    expect(await staticMissionCatalog.findByBuilding('gym')).toBeNull();
  });
});
