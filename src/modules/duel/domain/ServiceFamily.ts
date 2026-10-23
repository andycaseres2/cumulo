/** One option of a scenario: a service of the family and why it is (or is not) the answer. */
export interface DuelOption {
  /** Canonical service name, as listed in the family. */
  service: string;
  why: string;
}

/** A scenario where the player picks the right service among similar ones. */
export interface DuelCard {
  id: string;
  prompt: string;
  /** Three or four services of the family; one of them is the answer. */
  options: DuelOption[];
  answer: string;
  /** Theory topic to review this difference. */
  topicSlug: string;
}

export interface DuelService {
  name: string;
  /** What the service is for, in one line: the cheat sheet of the family. */
  summary: string;
}

/** Services the exam likes to confuse with each other, and the scenarios that tell them apart. */
export interface ServiceFamily {
  id: string;
  title: string;
  summary: string;
  services: DuelService[];
  cards: DuelCard[];
}

export function answerOption(card: DuelCard): DuelOption {
  return card.options.find((option) => option.service === card.answer)!;
}
