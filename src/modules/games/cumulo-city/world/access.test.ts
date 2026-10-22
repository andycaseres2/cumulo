import { describe, expect, it } from 'vitest';
import type { CurrentMission } from '../missions';
import { missionAccess, openAccess } from './access';
import { ALL_BUILDINGS as BUILDINGS } from './districts';

const bakery = BUILDINGS.find((b) => b.id === 'bakery')!;
const bank = BUILDINGS.find((b) => b.id === 'bank')!;

function mission(buildingId: string, state: CurrentMission['state']): CurrentMission {
  return {
    state,
    brief: { id: 'm', buildingId, title: 'T', client: { name: 'Rosa Quispe', role: 'Dueña' }, intro: [], outro: { passed: [], failed: [] } },
  };
}

describe('building access', () => {
  it('can leave every door open', () => {
    expect(BUILDINGS.every((b) => openAccess.canEnter(b).allowed)).toBe(true);
  });

  it('only lets the player into the building of the active mission', () => {
    const policy = missionAccess(mission('bakery', 'active'));
    expect(policy.canEnter(bakery)).toEqual({ allowed: true });

    const denied = policy.canEnter(bank);
    expect(denied.allowed).toBe(false);
    expect(!denied.allowed && denied.reason).toContain('Banco Andino');
    expect(!denied.allowed && denied.reason).toContain(bakery.name);
  });

  it('sends the player to the bus when the active mission is in another district', () => {
    const cafe = BUILDINGS.find((b) => b.id === 'cafe')!;
    const elsewhere = missionAccess(mission('bank', 'active')).canEnter(cafe);
    expect(!elsewhere.allowed && elsewhere.reason).toContain('Distrito Financiero');
    expect(!elsewhere.allowed && elsewhere.reason).toContain('bus');

    const sameDistrict = missionAccess(mission('bakery', 'active')).canEnter(cafe);
    expect(!sameDistrict.allowed && sameDistrict.reason).toContain('sigue la flecha');
  });

  it('keeps every door closed until the player accepts a mission, and says how to get one', () => {
    const offered = missionAccess(mission('bakery', 'offered')).canEnter(bakery);
    expect(offered.allowed).toBe(false);
    expect(!offered.allowed && offered.reason).toContain('Acepta la misión');

    const none = missionAccess(null).canEnter(bank);
    expect(none.allowed).toBe(false);
    expect(!none.allowed && none.reason).toContain('Banco Andino');
  });
});
