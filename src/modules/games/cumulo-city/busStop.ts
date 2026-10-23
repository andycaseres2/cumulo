import { gameMessages } from '@/i18n/messages/game';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { findExamDomain } from '@/modules/exam/domain/ExamDomain';
import { domainText } from '@/modules/exam/presentation/examText';
import type { DialogContent } from './engine/ui/dialog';
import { DISTRICTS, type DistrictId } from './world/districts';
import { districtName } from './world/placeNames';

/** Choice id for staying in the current district. */
export const STAY = 'stay';

function domainTitle(domainId: string, locale: Locale): string | undefined {
  const domain = findExamDomain(domainId);
  return domain && domainText(domain, locale).title;
}

/** What the bus stop asks: where to go, showing which exam domain each district's clients need. */
export function busStopTalk(here: DistrictId, locale: Locale = DEFAULT_LOCALE): DialogContent {
  const text = gameMessages[locale].busStop;
  return {
    title: text.title,
    text: text.question(districtName(here, locale)),
    choices: [
      ...DISTRICTS.filter((d) => d.id !== here).map((d) => ({
        id: d.id,
        label: `${districtName(d.id, locale)} · ${domainTitle(d.domainId, locale)}`,
      })),
      { id: STAY, label: text.stay },
    ],
  };
}
