import type { CurrentMission } from './missions';
import { BUILDINGS } from './world/cityMap';

/** What the HUD mission card shows. */
export interface MissionCardContent {
  heading: string;
  title: string;
  detail: string;
  /** Label of the button, or null when there is nothing to do from the card. */
  action: string | null;
}

export function missionCard(current: CurrentMission | null): MissionCardContent {
  if (!current) {
    return {
      heading: 'Misiones al día',
      title: '¡Completaste todas las misiones disponibles!',
      detail: 'Muy pronto llegarán nuevos clientes a Cúmulo City.',
      action: null,
    };
  }
  const { brief, state } = current;
  const place = BUILDINGS.find((b) => b.id === brief.buildingId)?.name ?? brief.buildingId;
  if (state === 'offered') {
    return {
      heading: 'Nueva misión',
      title: brief.title,
      detail: `${brief.client.name} te espera en ${place}.`,
      action: 'Aceptar misión',
    };
  }
  return {
    heading: 'Misión activa',
    title: brief.title,
    detail: `Objetivo: entra a ${place} y habla con ${brief.client.name}. Sigue la flecha.`,
    action: null,
  };
}
