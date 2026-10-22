// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AuthOutcome, PlayerAuth } from '../domain/PlayerAuth';
import { renderAuthForms } from './authForms';

function fakeAuth(outcomes: { signIn?: AuthOutcome; signUp?: AuthOutcome } = {}): PlayerAuth {
  return {
    currentPlayer: async () => null,
    signIn: vi.fn(async (): Promise<AuthOutcome> => outcomes.signIn ?? { ok: true, needsConfirmation: false }),
    signUp: vi.fn(async (): Promise<AuthOutcome> => outcomes.signUp ?? { ok: true, needsConfirmation: true }),
    signOut: async () => {},
    onChange: () => () => {},
  };
}

const root = () => document.getElementById('host')!;
const field = (name: string) => root().querySelector<HTMLInputElement>(`form:not([hidden]) input[name="${name}"]`)!;
const submit = async () => {
  root().querySelector<HTMLFormElement>('form:not([hidden])')!.requestSubmit();
  await new Promise((r) => setTimeout(r, 0));
};
const message = () => root().querySelector('[data-auth-message]')!.textContent;

describe('auth forms', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="host"></div>';
  });

  it('shows the sign-in form first and switches to sign-up', () => {
    renderAuthForms(root(), { auth: fakeAuth(), onSignedIn: () => {} });
    expect(field('email')).toBeTruthy();
    expect(field('name')).toBeFalsy();

    [...root().querySelectorAll('button')].find((b) => b.textContent === 'Crear cuenta')!.click();
    expect(field('name')).toBeTruthy();
  });

  it('signs in and hands control back to the page', async () => {
    const auth = fakeAuth();
    const onSignedIn = vi.fn();
    renderAuthForms(root(), { auth, onSignedIn });
    field('email').value = 'andy@example.com';
    field('password').value = 'secreto123';
    await submit();

    expect(auth.signIn).toHaveBeenCalledWith({ email: 'andy@example.com', password: 'secreto123' });
    expect(onSignedIn).toHaveBeenCalled();
  });

  it('explains a failed sign-in in Spanish and lets the player try again', async () => {
    renderAuthForms(root(), { auth: fakeAuth({ signIn: { ok: false, error: 'invalid-credentials' } }), onSignedIn: () => {} });
    field('email').value = 'andy@example.com';
    field('password').value = 'mala';
    await submit();

    expect(message()).toBe('Email o contraseña incorrectos.');
    expect(root().querySelector<HTMLButtonElement>('form:not([hidden]) button[type="submit"]')!.disabled).toBe(false);
  });

  it('validates before calling the service', async () => {
    const auth = fakeAuth();
    renderAuthForms(root(), { auth, onSignedIn: () => {} });
    field('email').value = 'no-es-un-email';
    field('password').value = 'secreto123';
    await submit();

    expect(message()).toBe('Revisa tu email: no parece válido.');
    expect(auth.signIn).not.toHaveBeenCalled();
  });

  it('after signing up, asks the player to confirm their email instead of entering', async () => {
    const onSignedIn = vi.fn();
    renderAuthForms(root(), { auth: fakeAuth(), onSignedIn });
    [...root().querySelectorAll('button')].find((b) => b.textContent === 'Crear cuenta')!.click();
    field('name').value = 'Andy';
    field('email').value = 'andy@example.com';
    field('password').value = 'secreto123';
    await submit();

    expect(message()).toContain('Revisa tu correo');
    expect(onSignedIn).not.toHaveBeenCalled();
  });
});
