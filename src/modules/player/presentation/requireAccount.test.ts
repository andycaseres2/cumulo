import { describe, expect, it } from 'vitest';
import { requireAccount } from './requireAccount';

describe('requireAccount', () => {
  it('lets signed-in players stay', () => {
    expect(requireAccount({ displayName: 'Andy', isGuest: false }, '/juegos/nimbus-city')).toBeNull();
  });

  it('sends players without an account to sign in, and back here afterwards', () => {
    expect(requireAccount({ displayName: 'Invitado', isGuest: true }, '/juegos/nimbus-city')).toBe(
      '/ingresar?next=%2Fjuegos%2Fnimbus-city',
    );
  });
});
