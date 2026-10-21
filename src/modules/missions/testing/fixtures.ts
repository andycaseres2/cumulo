import type { Mission } from '../domain/Mission';

const option = (id: string, correct = false) => ({
  id,
  label: `Option ${id}`,
  definition: `What ${id} is`,
  explanation: `Why ${id} ${correct ? 'fits' : 'does not fit'}`,
  correct,
});

export const twoStepMission: Mission = {
  id: 'test-mission',
  buildingId: 'bakery',
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
