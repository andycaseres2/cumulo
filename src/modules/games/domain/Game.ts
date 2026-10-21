import type { ExamDomainId } from '@/modules/exam/domain/ExamDomain';

export type GameStatus = 'available' | 'coming-soon';
export type CertificationLevel = 'practitioner';

export interface Game {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: GameStatus;
  level: CertificationLevel;
  /** Exam domains the game practices. */
  domains: ExamDomainId[];
}

export function isPlayable(game: Game): boolean {
  return game.status === 'available';
}
