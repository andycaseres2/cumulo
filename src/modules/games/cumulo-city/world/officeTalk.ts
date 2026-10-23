import { gameMessages } from '@/i18n/messages/game';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';

/** What each company worries about (Spanish): a hint of the cloud problem the player will solve there one day. */
export const BUILDING_CONCERNS: Record<string, string> = gameMessages.es.office.concerns;

const NAMES = ['Lucía', 'Mateo', 'Valentina', 'Diego', 'Camila', 'Santiago', 'Mariana', 'Andrés', 'Sofía', 'Javier'];

function offset(buildingId: string): number {
  let sum = 0;
  for (const char of buildingId) sum += char.charCodeAt(0);
  return sum;
}

/** The first worker of each office shares the company's concern; the rest make everyday office talk. */
export function workerLine(buildingId: string, index: number, locale: Locale = DEFAULT_LOCALE): string {
  const { concerns, everyday } = gameMessages[locale].office;
  if (index === 0) return concerns[buildingId] ?? everyday[0];
  return everyday[(offset(buildingId) + index) % everyday.length];
}

export function workerName(buildingId: string, index: number): string {
  return NAMES[(offset(buildingId) + index * 3) % NAMES.length];
}
