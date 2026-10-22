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
    expect(missionCard({ brief, state: 'offered' }, 'centro')).toEqual({
      heading: 'Nueva misión',
      title: 'La Navidad que tumbó la web',
      detail: 'Rosa Quispe te espera en Pastelería Dulce Nube.',
      action: 'Aceptar misión',
    });
  });

  it('shows the objective of the active mission and no action', () => {
    expect(missionCard({ brief, state: 'active' }, 'centro')).toEqual({
      heading: 'Misión activa',
      title: 'La Navidad que tumbó la web',
      detail: 'Objetivo: entra a Pastelería Dulce Nube y habla con Rosa Quispe. Sigue la flecha.',
      action: null,
    });
  });

  it('sends the player to the bus when the active mission is in another district', () => {
    expect(missionCard({ brief, state: 'active' }, 'mercado').detail).toBe(
      'Objetivo: toma el bus al Distrito Centro, entra a Pastelería Dulce Nube y habla con Rosa Quispe. Sigue la flecha.',
    );
  });

  it('says when the district has no clients left and points to the other districts', () => {
    expect(missionCard(null, 'financiero')).toEqual({
      heading: 'Misiones al día',
      title: '¡Ayudaste a todos los clientes del Distrito Financiero!',
      detail: 'Toma el bus en la parada para buscar clientes en otros distritos.',
      action: null,
    });
  });
});
