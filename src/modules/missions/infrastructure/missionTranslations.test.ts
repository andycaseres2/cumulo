/** Contract over mission translations: same structure and right answers as the Spanish original, only the text changes. */
import { describe, expect, it } from 'vitest';
import type { Mission } from '../domain/Mission';

const load = (modules: Record<string, Record<string, Mission>>) =>
  Object.values(modules).flatMap((exports) => Object.values(exports));

const spanishById = new Map(
  load(import.meta.glob<Record<string, Mission>>('./content/**/*.ts', { eager: true })).map((m) => [m.id, m]),
);
const english = load(import.meta.glob<Record<string, Mission>>('./translations/en/**/*.ts', { eager: true }));

/** Everything a translation must keep: ids, order, scores, links to theory and exam, right answers. */
const structure = (m: Mission) => ({
  id: m.id,
  track: m.track,
  buildingId: m.buildingId,
  topicSlug: m.topicSlug,
  clientName: m.client.name,
  introPages: m.intro.length,
  outroPages: { passed: m.outro.passed.length, failed: m.outro.failed.length },
  passingScore: m.passingScore,
  decisions: m.decisions.map((d) => ({
    id: d.id,
    topicSlug: d.topicSlug,
    examTasks: d.examTasks,
    options: d.options.map((o) => ({ id: o.id, correct: o.correct })),
  })),
});

describe('English mission translations', () => {
  it('only translate missions that exist in Spanish', () => {
    const unknown = english.map((m) => m.id).filter((id) => !spanishById.has(id));
    expect(unknown).toEqual([]);
  });

  it('translate each mission at most once', () => {
    const ids = english.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe.each(english.map((m) => [m.id, m] as const))('%s', (id, translated) => {
    const original = spanishById.get(id);

    it('keeps the structure and right answers of the Spanish original', () => {
      expect(original).toBeDefined();
      expect(structure(translated)).toEqual(structure(original as Mission));
    });

    it('translates the title, the client role and every prompt', () => {
      const spanish = original as Mission;
      expect(translated.title).not.toBe(spanish.title);
      expect(translated.client.role).not.toBe(spanish.client.role);
      translated.decisions.forEach((d, i) => expect(d.prompt, d.id).not.toBe(spanish.decisions[i].prompt));
      translated.intro.forEach((page, i) => expect(page).not.toBe(spanish.intro[i]));
    });

    it('defines and explains every option', () => {
      for (const o of translated.decisions.flatMap((d) => d.options)) {
        expect(o.label.length, o.id).toBeGreaterThan(0);
        expect(o.definition.length, o.id).toBeGreaterThan(30);
        expect(o.explanation.length, o.id).toBeGreaterThan(30);
        const source = (original as Mission).decisions.flatMap((d) => d.options).find((s) => s.id === o.id);
        expect(o.explanation, o.id).not.toBe(source?.explanation);
      }
    });
  });
});
