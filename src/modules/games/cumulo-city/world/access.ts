import { gameMessages } from '@/i18n/messages/game';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import type { CurrentMission } from '../missions';
import type { BuildingDef } from './cityMap';
import { districtOf, findBuilding } from './districts';
import { buildingName, districtName } from './placeNames';

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
export function missionAccess(current: CurrentMission | null, locale: Locale = DEFAULT_LOCALE): AccessPolicy {
  const text = gameMessages[locale].access;
  return {
    canEnter(building) {
      const name = buildingName(building.id, locale);
      if (current?.state === 'active' && current.brief.buildingId === building.id) return { allowed: true };
      if (current?.state === 'active') {
        const target = findBuilding(current.brief.buildingId);
        const targetDistrict = target && target.district !== building.district ? districtOf(target.id) : undefined;
        const busDistrict = targetDistrict ? districtName(targetDistrict.id, locale) : null;
        return { allowed: false, reason: text.notExpected(name, target ? buildingName(target.id, locale) : null, busDistrict) };
      }
      if (current?.state === 'offered') return { allowed: false, reason: text.needsAppointment(name) };
      return { allowed: false, reason: text.noWork(name) };
    },
  };
}
