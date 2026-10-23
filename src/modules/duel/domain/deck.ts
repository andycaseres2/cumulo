import type { DuelCard, ServiceFamily } from './ServiceFamily';

function shuffled<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Up to `count` different scenarios of these families, in random order and with their options shuffled. */
export function drawCards(families: ServiceFamily[], count: number, random: () => number): DuelCard[] {
  return shuffled(
    families.flatMap((family) => family.cards),
    random,
  )
    .slice(0, count)
    .map((card) => ({ ...card, options: shuffled(card.options, random) }));
}
