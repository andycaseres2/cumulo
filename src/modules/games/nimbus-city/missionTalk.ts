import type { DialogContent } from './engine/ui/dialog';
import type { MissionBrief, MissionState } from './missions';

export const ACCEPT = 'accept';
export const LATER = 'later';

type Portrait = DialogContent['portrait'];

/** What the client says when the player talks to them: the job offer, or a replay offer once completed. */
export function clientOffer(brief: MissionBrief, state: MissionState, portrait: Portrait): DialogContent[] {
  const page = (text: string): DialogContent => ({ title: brief.client.name, text, portrait });
  if (state === 'completed') {
    return [
      {
        ...page(`¡Qué gusto verte otra vez! Gracias a ti, "${brief.title}" quedó en el pasado. ¿Quieres repasar el caso?`),
        choices: [
          { id: ACCEPT, label: 'Jugar otra vez' },
          { id: LATER, label: 'Ahora no' },
        ],
      },
    ];
  }
  const pages = brief.intro.map(page);
  pages[pages.length - 1] = {
    ...pages[pages.length - 1],
    choices: [
      { id: ACCEPT, label: 'Acepto el trabajo' },
      { id: LATER, label: 'Ahora no' },
    ],
  };
  return pages;
}

export function clientOutro(brief: MissionBrief, passed: boolean, portrait: Portrait): DialogContent[] {
  return (passed ? brief.outro.passed : brief.outro.failed).map((text) => ({ title: brief.client.name, text, portrait }));
}
