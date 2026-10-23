import { describe, expect, it } from 'vitest';
import type { ServiceFamily } from '../domain/ServiceFamily';
import { FAMILY_ORDER, SERVICE_FAMILIES, familiesFor } from './serviceFamilies';

const modules = import.meta.glob<Record<string, ServiceFamily>>('./translations/en/*.ts', { eager: true });
const english = Object.values(modules).flatMap((module) => Object.values(module));
const spanish = new Map(SERVICE_FAMILIES.map((family) => [family.id, family]));

/** Same whole-word rule as duelContent.test.ts: the prompt must not give the answer away. */
function names(prompt: string, service: string): boolean {
  const short = service.replace(/^(Amazon|AWS) /, '');
  const escaped = short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, 'u').test(prompt);
}

describe('duel translations (en)', () => {
  it('translates every family, once each', () => {
    expect(english.map((family) => family.id).sort()).toEqual([...FAMILY_ORDER].sort());
  });

  it('mirrors the structure of the Spanish original: services, cards, answers, topics and options in order', () => {
    for (const family of english) {
      const original = spanish.get(family.id);
      expect(original, family.id).toBeDefined();
      if (!original) continue;
      expect(family.services.map((s) => s.name), family.id).toEqual(original.services.map((s) => s.name));
      const shape = (f: ServiceFamily) =>
        f.cards.map((card) => ({
          id: card.id,
          answer: card.answer,
          topicSlug: card.topicSlug,
          options: card.options.map((o) => o.service),
        }));
      expect(shape(family), family.id).toEqual(shape(original));
    }
  });

  it('actually translates the text', () => {
    for (const family of english) {
      const original = spanish.get(family.id)!;
      expect(family.title, family.id).not.toBe(original.title);
      expect(family.summary, family.id).not.toBe(original.summary);
      family.services.forEach((service, i) => expect(service.summary, service.name).not.toBe(original.services[i].summary));
      family.cards.forEach((card, i) => {
        expect(card.prompt, card.id).not.toBe(original.cards[i].prompt);
        card.options.forEach((option, j) =>
          expect(option.why, `${card.id}: ${option.service}`).not.toBe(original.cards[i].options[j].why),
        );
      });
    }
  });

  it('never names a service of the options in the scenario', () => {
    for (const family of english) {
      for (const card of family.cards) {
        for (const option of card.options) expect(names(card.prompt, option.service), `${card.id} names ${option.service}`).toBe(false);
      }
    }
  });

  it('serves the English families for the en locale and the originals for es', () => {
    expect(familiesFor('en').map((f) => f.title)).toEqual(
      FAMILY_ORDER.map((id) => english.find((family) => family.id === id)!.title),
    );
    expect(familiesFor('es')).toEqual(SERVICE_FAMILIES);
  });
});
