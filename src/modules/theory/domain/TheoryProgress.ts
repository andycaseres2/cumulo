/** One answer of a topic quiz. */
export interface QuizOption {
  label: string;
  /** Why this option is right or wrong, always shown after answering. */
  explanation: string;
  correct: boolean;
}

/** A question at the end of a theory topic. */
export interface QuizQuestion {
  prompt: string;
  options: QuizOption[];
}

/** Port: where the slugs of the topics a player completed are kept. */
export interface TheoryProgressStore {
  load(): Promise<string[]>;
  save(completedSlugs: string[]): Promise<void>;
}
