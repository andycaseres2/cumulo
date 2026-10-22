import { describe, expect, it } from 'vitest';
import { missionCard } from './missionCard';
import type { MissionBrief } from './missions';

const brief: MissionBrief = {
  id: 'bakery-elasticity',
  buildingId: 'bakery',
  title: 'La Navidad que tumbó la web',
  client: { name: 'Rosa Quispe', role: 'Dueña de la Pastelería Dulce Nube' },
  intro: ['Hola'],
  outro: { passed: [], failed: [] },
};

describe('missionCard', () => {
  it('offers a new mission with who asks for help, where, and an accept action', () => {
    expect(missionCard({ brief, state: 'offered' })).toEqual({
      heading: 'Nueva misión',
      title: 'La Navidad que tumbó la web',
      detail: 'Rosa Quispe te espera en Pastelería Dulce Nube.',
      action: 'Aceptar misión',
    });
  });

  it('shows the objective of the active mission and no action', () => {
    expect(missionCard({ brief, state: 'active' })).toEqual({
      heading: 'Misión activa',
      title: 'La Navidad que tumbó la web',
      detail: 'Objetivo: entra a Pastelería Dulce Nube y habla con Rosa Quispe. Sigue la flecha.',
      action: null,
    });
  });

  it('celebrates when every mission is completed', () => {
    expect(missionCard(null)).toMatchObject({ heading: 'Misiones al día', action: null });
  });
});
