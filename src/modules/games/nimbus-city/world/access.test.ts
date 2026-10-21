import { describe, expect, it } from 'vitest';
import { openAccess, permissionAccess } from './access';
import { BUILDINGS } from './cityMap';

const bakery = BUILDINGS.find((b) => b.id === 'bakery')!;
const bank = BUILDINGS.find((b) => b.id === 'bank')!;

describe('building access', () => {
  it('lets the player into every building while access is open', () => {
    expect(BUILDINGS.every((b) => openAccess.canEnter(b).allowed)).toBe(true);
  });

  it('with permissions, only lets the player into granted buildings and explains why not', () => {
    const policy = permissionAccess(new Set(['bakery']));

    expect(policy.canEnter(bakery)).toEqual({ allowed: true });
    const denied = policy.canEnter(bank);
    expect(denied.allowed).toBe(false);
    expect(!denied.allowed && denied.reason).toContain('Banco Andino');
  });
});
