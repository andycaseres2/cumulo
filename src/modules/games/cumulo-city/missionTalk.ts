import { gameMessages } from '@/i18n/messages/game';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import type { DialogContent } from './engine/ui/dialog';
import type { MissionBrief } from './missions';

export const START = 'start';
export const LATER = 'later';

type Portrait = DialogContent['portrait'];

/** What the client says: the story of an active mission, or a replay offer once completed. */
export function clientOffer(
  brief: MissionBrief,
  state: 'active' | 'completed',
  portrait: Portrait,
  locale: Locale = DEFAULT_LOCALE,
): DialogContent[] {
  const text = gameMessages[locale].missionTalk;
  const page = (line: string): DialogContent => ({ title: brief.client.name, text: line, portrait });
  if (state === 'completed') {
    return [
      {
        ...page(text.replay(brief.title)),
        choices: [
          { id: START, label: text.playAgain },
          { id: LATER, label: text.later },
        ],
      },
    ];
  }
  const pages = brief.intro.map(page);
  pages[pages.length - 1] = {
    ...pages[pages.length - 1],
    choices: [
      { id: START, label: text.start },
      { id: LATER, label: text.later },
    ],
  };
  return pages;
}

export function clientOutro(brief: MissionBrief, passed: boolean, portrait: Portrait): DialogContent[] {
  return (passed ? brief.outro.passed : brief.outro.failed).map((text) => ({ title: brief.client.name, text, portrait }));
}
