/** One answer the player can pick for a decision. */
export interface MissionOption {
  id: string;
  label: string;
  /** Neutral description of the service or concept, shown before choosing in learning mode. */
  definition: string;
  /** Why this option fits the client's situation or not, always shown after answering. */
  explanation: string;
  correct: boolean;
}

/** A moment of the story where the client needs the player to choose. */
export interface Decision {
  id: string;
  /** What the client says, in the first person. */
  prompt: string;
  options: MissionOption[];
  /** Theory topic this decision practices. */
  topicSlug: string;
  /** Exam guide task statements it practices, e.g. "3.3". */
  examTasks: string[];
}

export interface Mission {
  id: string;
  buildingId: string;
  title: string;
  client: { name: string; role: string };
  /** Conversation pages before the job is offered. */
  intro: string[];
  outro: { passed: string[]; failed: string[] };
  /** Fraction of correct answers needed to complete the mission (0–1). */
  passingScore: number;
  decisions: Decision[];
}

export type MissionMode = 'learn' | 'practice';
