import { describe, expect, it, vi } from 'vitest';
import type { PlayerAuth } from '../domain/PlayerAuth';
import { signIn, signUp } from './authenticate';

function fakeAuth(): PlayerAuth {
  return {
    currentPlayer: vi.fn(async () => null),
    signUp: vi.fn(async () => ({ ok: true as const, needsConfirmation: true })),
    signIn: vi.fn(async () => ({ ok: true as const, needsConfirmation: false })),
    signOut: vi.fn(async () => {}),
    onChange: vi.fn(() => () => {}),
  };
}

describe('signUp', () => {
  it('sends trimmed name and email to the auth service', async () => {
    const auth = fakeAuth();
    await expect(signUp(auth, { name: '  Andy  ', email: ' andy@example.com ', password: 'secreto123' })).resolves.toEqual({
      ok: true,
      needsConfirmation: true,
    });
    expect(auth.signUp).toHaveBeenCalledWith({ name: 'Andy', email: 'andy@example.com', password: 'secreto123' });
  });

  it.each([
    [{ name: 'A', email: 'andy@example.com', password: 'secreto123' }, 'invalid-name'],
    [{ name: 'Andy', email: 'andy-at-example', password: 'secreto123' }, 'invalid-email'],
    [{ name: 'Andy', email: 'andy@example.com', password: 'corta' }, 'weak-password'],
  ])('rejects %o with %s without calling the service', async (input, error) => {
    const auth = fakeAuth();
    await expect(signUp(auth, input)).resolves.toEqual({ ok: false, error });
    expect(auth.signUp).not.toHaveBeenCalled();
  });
});

describe('signIn', () => {
  it('validates the email and that a password was typed before calling the service', async () => {
    const auth = fakeAuth();
    await expect(signIn(auth, { email: 'nope', password: 'x' })).resolves.toEqual({ ok: false, error: 'invalid-email' });
    await expect(signIn(auth, { email: 'andy@example.com', password: '' })).resolves.toEqual({ ok: false, error: 'missing-password' });
    expect(auth.signIn).not.toHaveBeenCalled();

    await signIn(auth, { email: ' andy@example.com ', password: 'secreto123' });
    expect(auth.signIn).toHaveBeenCalledWith({ email: 'andy@example.com', password: 'secreto123' });
  });
});
