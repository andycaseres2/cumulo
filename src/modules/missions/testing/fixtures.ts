import type { Mission } from '../domain/Mission';
import type { MissionCatalog } from '../domain/MissionCatalog';

const option = (id: string, correct = false) => ({
  id,
  label: `Option ${id}`,
  definition: `What ${id} is`,
  explanation: `Why ${id} ${correct ? 'fits' : 'does not fit'}`,
  correct,
});

export const twoStepMission: Mission = {
  id: 'test-mission',
  track: 'centro',
  buildingId: 'bakery',
  topicSlug: 'beneficios-de-la-nube',
  title: 'Test mission',
  client: { name: 'Rosa', role: 'Owner' },
  intro: ['Hello'],
  outro: { passed: ['Thanks'], failed: ['Try again'] },
  passingScore: 1,
  decisions: [
    {
      id: 'first',
      prompt: 'First question',
      topicSlug: 'beneficios-de-la-nube',
      examTasks: ['1.1'],
      options: [option('a', true), option('b'), option('c'), option('d')],
    },
    {
      id: 'second',
      prompt: 'Second question',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [option('e'), option('f', true), option('g'), option('h')],
    },
  ],
};

export const secondMission: Mission = { ...twoStepMission, id: 'second-mission', buildingId: 'bank', title: 'Second mission' };

/** First mission of another track (district). */
export const otherTrackMission: Mission = { ...twoStepMission, id: 'other-track', track: 'financiero', buildingId: 'vault', title: 'Other track' };

/** Catalog whose order is the campaign order. */
export function catalogOf(...missions: Mission[]): MissionCatalog {
  return {
    all: async () => [...missions],
    inBuilding: async (buildingId) => missions.filter((m) => m.buildingId === buildingId),
  };
}
