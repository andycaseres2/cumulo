import type { BuildingDef } from './cityMap';

export type AccessDecision = { allowed: true } | { allowed: false; reason: string };

/** Decides whether the player may walk into a building. */
export interface AccessPolicy {
  canEnter(building: BuildingDef): AccessDecision;
}

/** Current rule: every door is open. */
export const openAccess: AccessPolicy = {
  canEnter: () => ({ allowed: true }),
};

/** Future rule: only buildings the player has permission for (e.g. an accepted job). */
export function permissionAccess(granted: ReadonlySet<string>): AccessPolicy {
  return {
    canEnter: (building) =>
      granted.has(building.id)
        ? { allowed: true }
        : { allowed: false, reason: `Necesitas una cita con ${building.name} para entrar.` },
  };
}
