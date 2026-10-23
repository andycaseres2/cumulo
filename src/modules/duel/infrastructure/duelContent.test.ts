import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { allInScopeServices } from '@/modules/exam/domain/inScopeServices';
import { FAMILY_ORDER, SERVICE_FAMILIES } from './serviceFamilies';

const inScope = new Set(allInScopeServices());
const cards = SERVICE_FAMILIES.flatMap((family) => family.cards.map((card) => ({ family, card })));

describe('duel content', () => {
  it('has every planned family, in order, and nothing else', () => {
    expect(SERVICE_FAMILIES.map((f) => f.id)).toEqual(FAMILY_ORDER);
  });

  it('gives every family a cheat sheet of in-scope services and at least 12 scenarios', () => {
    for (const family of SERVICE_FAMILIES) {
      expect(family.title.length, family.id).toBeGreaterThan(3);
      expect(family.summary.length, family.id).toBeGreaterThanOrEqual(40);
      expect(family.services.length, family.id).toBeGreaterThanOrEqual(3);
      for (const service of family.services) {
        // Storage classes are features of S3, not services of their own.
        if (family.id !== 's3-classes')
          expect(inScope.has(service.name), `${family.id}: ${service.name} is not an in-scope name`).toBe(true);
        expect(service.summary.length, service.name).toBeGreaterThanOrEqual(30);
      }
      expect(family.cards.length, family.id).toBeGreaterThanOrEqual(12);
    }
  });

  it('builds every scenario from its family, with one answer and a reason for each option', () => {
    for (const { family, card } of cards) {
      const names = family.services.map((s) => s.name);
      const options = card.options.map((o) => o.service);
      expect(card.id.startsWith(`${family.id}-`), card.id).toBe(true);
      expect(card.options.length, card.id).toBeGreaterThanOrEqual(3);
      expect(card.options.length, card.id).toBeLessThanOrEqual(4);
      expect(new Set(options).size, card.id).toBe(options.length);
      for (const option of options) expect(names, `${card.id}: ${option}`).toContain(option);
      expect(options.filter((o) => o === card.answer), card.id).toHaveLength(1);
      for (const option of card.options) expect(option.why.length, `${card.id}: ${option.service}`).toBeGreaterThanOrEqual(40);
      expect(card.prompt.length, card.id).toBeGreaterThanOrEqual(60);
    }
  });

  it('never names a service of the options in the scenario, so the prompt does not give the answer away', () => {
    for (const { card } of cards) {
      for (const option of card.options) {
        const short = option.service.replace(/^(Amazon|AWS) /, '');
        // Whole words only: "Q" (Amazon Q) must not match "¿Qué".
        const escaped = short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const named = new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, 'u');
        expect(named.test(card.prompt),`${card.id} names ${option.service}`).toBe(false);
      }
    }
  });

  it('uses unique ids and points every scenario to an existing theory topic', () => {
    const ids = cards.map(({ card }) => card.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
    for (const { card } of cards) {
      expect(existsSync(join(process.cwd(), 'src/content/theory/es', `${card.topicSlug}.md`)), `${card.id}: ${card.topicSlug}`).toBe(true);
    }
  });

  it('uses every service of a family as the answer at least once', () => {
    for (const family of SERVICE_FAMILIES) {
      const answers = new Set(family.cards.map((card) => card.answer));
      for (const service of family.services) expect(answers.has(service.name), `${family.id}: ${service.name}`).toBe(true);
    }
  });
});
