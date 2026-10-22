import type { CurrentMission } from '../missions';
import { BUILDINGS, type BuildingDef } from './cityMap';

export type AccessDecision = { allowed: true } | { allowed: false; reason: string };

/** Decides whether the player may walk into a building. */
export interface AccessPolicy {
  canEnter(building: BuildingDef): AccessDecision;
}

/** Every door open (kept for tools and tests). */
export const openAccess: AccessPolicy = {
  canEnter: () => ({ allowed: true }),
};

/** A consultant only gets in where a client waits: the building of the active mission. */
export function missionAccess(current: CurrentMission | null): AccessPolicy {
  return {
    canEnter(building) {
      if (current?.state === 'active' && current.brief.buildingId === building.id) return { allowed: true };
      if (current?.state === 'active') {
        const target = BUILDINGS.find((b) => b.id === current.brief.buildingId);
        return { allowed: false, reason: `${building.name} no te espera hoy. Tu misión activa es en ${target?.name ?? 'otro edificio'}: sigue la flecha.` };
      }
      if (current?.state === 'offered') {
        return {
          allowed: false,
          reason: `${building.name} solo recibe consultores con una cita. Acepta la misión de la tarjeta para entrar al edificio de tu cliente.`,
        };
      }
      return { allowed: false, reason: `${building.name} no tiene trabajo para ti por ahora.` };
    },
  };
}
