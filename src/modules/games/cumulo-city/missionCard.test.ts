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
    expect(missionCard({ brief, state: 'offered' }, 'downtown')).toEqual({
      kind: 'offer',
      heading: 'Nueva misión',
      title: 'La Navidad que tumbó la web',
      detail: 'Rosa Quispe te espera en Pastelería Dulce Nube.',
      action: 'Aceptar misión',
    });
  });

  it('shows the objective of the active mission and no action', () => {
    expect(missionCard({ brief, state: 'active' }, 'downtown')).toEqual({
      kind: 'active',
      heading: 'Misión activa',
      title: 'La Navidad que tumbó la web',
      detail: 'Objetivo: entra a Pastelería Dulce Nube y habla con Rosa Quispe. Sigue la flecha.',
      action: null,
    });
  });

  it('sends the player to the bus when the active mission is in another district', () => {
    expect(missionCard({ brief, state: 'active' }, 'market').detail).toBe(
      'Objetivo: toma el bus al Distrito Centro, entra a Pastelería Dulce Nube y habla con Rosa Quispe. Sigue la flecha.',
    );
  });

  it('says when the district has no clients left and points to the other districts', () => {
    expect(missionCard(null, 'financial')).toEqual({
      kind: 'done',
      heading: 'Misiones al día',
      title: '¡Ayudaste a todos los clientes del Distrito Financiero!',
      detail: 'Toma el bus en la parada para buscar clientes en otros distritos.',
      action: null,
    });
  });
});

describe('missionCard in English', () => {
  const english: MissionBrief = { ...brief, title: 'The Christmas that crashed the website' };

  it('offers a new mission with English place names', () => {
    expect(missionCard({ brief: english, state: 'offered' }, 'downtown', 'en')).toEqual({
      kind: 'offer',
      heading: 'New mission',
      title: 'The Christmas that crashed the website',
      detail: 'Rosa Quispe is waiting for you at Dulce Nube Bakery.',
      action: 'Accept mission',
    });
  });

  it('shows the objective, with the bus ride when the mission is in another district', () => {
    expect(missionCard({ brief: english, state: 'active' }, 'downtown', 'en').detail).toBe(
      'Goal: go into Dulce Nube Bakery and talk to Rosa Quispe. Follow the arrow.',
    );
    expect(missionCard({ brief: english, state: 'active' }, 'market', 'en').detail).toBe(
      'Goal: take the bus to the Downtown District, go into Dulce Nube Bakery and talk to Rosa Quispe. Follow the arrow.',
    );
  });

  it('says when the district has no clients left', () => {
    expect(missionCard(null, 'financial', 'en')).toEqual({
      kind: 'done',
      heading: 'All caught up',
      title: 'You helped every client in the Financial District!',
      detail: 'Take the bus at the stop to find clients in other districts.',
      action: null,
    });
  });
});
