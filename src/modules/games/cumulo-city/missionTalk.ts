import type { DialogContent } from './engine/ui/dialog';
import type { MissionBrief } from './missions';

export const START = 'start';
export const LATER = 'later';

type Portrait = DialogContent['portrait'];

/** What the client says: the story of an active mission, or a replay offer once completed. */
export function clientOffer(brief: MissionBrief, state: 'active' | 'completed', portrait: Portrait): DialogContent[] {
  const page = (text: string): DialogContent => ({ title: brief.client.name, text, portrait });
  if (state === 'completed') {
    return [
      {
        ...page(`¡Qué gusto verte otra vez! Gracias a ti, "${brief.title}" quedó en el pasado. ¿Quieres repasar el caso?`),
        choices: [
          { id: START, label: 'Jugar otra vez' },
          { id: LATER, label: 'Ahora no' },
        ],
      },
    ];
  }
  const pages = brief.intro.map(page);
  pages[pages.length - 1] = {
    ...pages[pages.length - 1],
    choices: [
      { id: START, label: 'Empecemos' },
      { id: LATER, label: 'Ahora no' },
    ],
  };
  return pages;
}

export function clientOutro(brief: MissionBrief, passed: boolean, portrait: Portrait): DialogContent[] {
  return (passed ? brief.outro.passed : brief.outro.failed).map((text) => ({ title: brief.client.name, text, portrait }));
}
