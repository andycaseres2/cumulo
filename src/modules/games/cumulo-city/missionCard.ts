import { gameMessages } from '@/i18n/messages/game';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import type { CurrentMission } from './missions';
import { districtOf, type DistrictId } from './world/districts';
import { buildingName, districtName } from './world/placeNames';

/** What the HUD mission card shows. */
export interface MissionCardContent {
  /** Offer to accept, mission in progress, or nothing left in the district. */
  kind: 'offer' | 'active' | 'done';
  heading: string;
  title: string;
  detail: string;
  /** Label of the button, or null when there is nothing to do from the card. */
  action: string | null;
}

/** Card for the mission of the player's district (`here`), or the active one wherever it is. */
export function missionCard(current: CurrentMission | null, here: DistrictId, locale: Locale = DEFAULT_LOCALE): MissionCardContent {
  const text = gameMessages[locale].missionCard;
  if (!current) {
    return {
      kind: 'done',
      heading: text.doneHeading,
      title: text.doneTitle(districtName(here, locale)),
      detail: text.doneDetail,
      action: null,
    };
  }
  const { brief, state } = current;
  const place = buildingName(brief.buildingId, locale);
  if (state === 'offered') {
    return {
      kind: 'offer',
      heading: text.offerHeading,
      title: brief.title,
      detail: text.offerDetail(brief.client.name, place),
      action: text.acceptMission,
    };
  }
  const district = districtOf(brief.buildingId);
  const busDistrict = district && district.id !== here ? districtName(district.id, locale) : null;
  return {
    kind: 'active',
    heading: text.activeHeading,
    title: brief.title,
    detail: text.activeDetail(place, brief.client.name, busDistrict),
    action: null,
  };
}
