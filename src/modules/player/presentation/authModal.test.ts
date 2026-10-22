// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AuthOutcome, PlayerAuth } from '../domain/PlayerAuth';
import { openAuthModal } from './authModal';

function fakeAuth(): PlayerAuth {
  return {
    currentPlayer: async () => null,
    signIn: vi.fn(async (): Promise<AuthOutcome> => ({ ok: true, needsConfirmation: false })),
    signUp: vi.fn(async (): Promise<AuthOutcome> => ({ ok: true, needsConfirmation: true })),
    signOut: async () => {},
    saveCharacter: async () => {},
    onChange: () => () => {},
  };
}

const dialog = () => document.querySelector<HTMLDialogElement>('dialog[data-auth-modal]');

describe('auth modal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('opens a dialog with a title and the sign-in form', () => {
    openAuthModal({ auth: fakeAuth(), onSignedIn: () => {} });

    expect(dialog()).not.toBeNull();
    expect(dialog()!.querySelector('#auth-modal-title')?.textContent).toBe('Ingresa a Cúmulo');
    expect(dialog()!.querySelector('input[name="email"]')).not.toBeNull();
  });

  it('closes and calls onSignedIn after signing in', async () => {
    const onSignedIn = vi.fn();
    openAuthModal({ auth: fakeAuth(), onSignedIn });
    const form = dialog()!.querySelector<HTMLFormElement>('form:not([hidden])')!;
    form.querySelector<HTMLInputElement>('[name="email"]')!.value = 'andy@example.com';
    form.querySelector<HTMLInputElement>('[name="password"]')!.value = 'secreto123';
    form.requestSubmit();
    await new Promise((r) => setTimeout(r, 0));

    expect(onSignedIn).toHaveBeenCalled();
    expect(dialog()).toBeNull();
  });

  it('can be dismissed with the close button, telling the page', () => {
    const onDismiss = vi.fn();
    openAuthModal({ auth: fakeAuth(), onSignedIn: () => {}, onDismiss });
    dialog()!.querySelector<HTMLButtonElement>('[data-auth-close]')!.click();

    expect(onDismiss).toHaveBeenCalled();
    expect(dialog()).toBeNull();
  });

  it('shows the reason it was opened when the page gives one', () => {
    openAuthModal({ auth: fakeAuth(), onSignedIn: () => {}, reason: 'Necesitas una cuenta para jugar.' });
    expect(dialog()!.textContent).toContain('Necesitas una cuenta para jugar.');
  });
});
