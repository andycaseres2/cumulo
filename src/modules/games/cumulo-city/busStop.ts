import { findExamDomain } from '@/modules/exam/domain/ExamDomain';
import type { DialogContent } from './engine/ui/dialog';
import { DISTRICTS, findDistrict, type DistrictId } from './world/districts';

/** Choice id for staying in the current district. */
export const STAY = 'stay';

/** What the bus stop asks: where to go, showing which exam domain each district's clients need. */
export function busStopTalk(here: DistrictId): DialogContent {
  return {
    title: 'Parada de bus',
    text: `Estás en el ${findDistrict(here).name}. ¿A qué distrito quieres ir?`,
    choices: [
      ...DISTRICTS.filter((d) => d.id !== here).map((d) => ({ id: d.id, label: `${d.name} · ${findExamDomain(d.domainId)?.title}` })),
      { id: STAY, label: 'Quedarme aquí' },
    ],
  };
}
