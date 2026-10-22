import type { CurrentMission } from './missions';
import { districtOf, findBuilding, findDistrict, type DistrictId } from './world/districts';

/** What the HUD mission card shows. */
export interface MissionCardContent {
  heading: string;
  title: string;
  detail: string;
  /** Label of the button, or null when there is nothing to do from the card. */
  action: string | null;
}

/** Card for the mission of the player's district (`here`), or the active one wherever it is. */
export function missionCard(current: CurrentMission | null, here: DistrictId): MissionCardContent {
  if (!current) {
    return {
      heading: 'Misiones al día',
      title: `¡Ayudaste a todos los clientes del ${findDistrict(here).name}!`,
      detail: 'Toma el bus en la parada para buscar clientes en otros distritos.',
      action: null,
    };
  }
  const { brief, state } = current;
  const place = findBuilding(brief.buildingId)?.name ?? brief.buildingId;
  if (state === 'offered') {
    return {
      heading: 'Nueva misión',
      title: brief.title,
      detail: `${brief.client.name} te espera en ${place}.`,
      action: 'Aceptar misión',
    };
  }
  const district = districtOf(brief.buildingId);
  const bus = district && district.id !== here ? `toma el bus al ${district.name}, entra` : 'entra';
  return {
    heading: 'Misión activa',
    title: brief.title,
    detail: `Objetivo: ${bus} a ${place} y habla con ${brief.client.name}. Sigue la flecha.`,
    action: null,
  };
}
