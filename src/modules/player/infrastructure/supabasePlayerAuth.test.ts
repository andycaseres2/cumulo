import { describe, expect, it, vi } from 'vitest';
import { supabasePlayerAuth, type AuthApi } from './supabasePlayerAuth';

const user = { email: 'andy@example.com', user_metadata: { display_name: 'Andy' } };

function api(overrides: Partial<AuthApi> = {}): AuthApi {
  return {
    signUp: vi.fn(async () => ({ data: { user, session: null }, error: null })),
    signInWithPassword: vi.fn(async () => ({ data: { user, session: { user } }, error: null })),
    signOut: vi.fn(async () => ({ error: null })),
    getSession: vi.fn(async () => ({ data: { session: { user } }, error: null })),
    onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    updateUser: vi.fn(async () => ({ error: null })),
    ...overrides,
  };
}

describe('supabasePlayerAuth', () => {
  it('signs up with the name as metadata and the confirmation link back to the site', async () => {
    const fake = api();
    const auth = supabasePlayerAuth(fake, 'http://localhost:4321/ingresar');

    await expect(auth.signUp({ name: 'Andy', email: 'andy@example.com', password: 'secreto123' })).resolves.toEqual({
      ok: true,
      needsConfirmation: true,
    });
    expect(fake.signUp).toHaveBeenCalledWith({
      email: 'andy@example.com',
      password: 'secreto123',
      options: { data: { display_name: 'Andy' }, emailRedirectTo: 'http://localhost:4321/ingresar' },
    });
  });

  it('knows when no confirmation is needed because a session started right away', async () => {
    const auth = supabasePlayerAuth(api({ signUp: vi.fn(async () => ({ data: { user, session: { user } }, error: null })) }), '/');
    await expect(auth.signUp({ name: 'Andy', email: 'a@b.co', password: 'secreto123' })).resolves.toEqual({
      ok: true,
      needsConfirmation: false,
    });
  });

  it.each([
    [{ code: 'invalid_credentials', status: 400 }, 'invalid-credentials'],
    [{ code: 'email_not_confirmed', status: 400 }, 'email-not-confirmed'],
    [{ code: 'weak_password', status: 422 }, 'weak-password'],
    [{ code: 'user_already_exists', status: 422 }, 'user-exists'],
    [{ code: 'over_request_rate_limit', status: 429 }, 'rate-limited'],
    [{ code: undefined, status: 0 }, 'unavailable'],
    [{ code: 'something_else', status: 500 }, 'unknown'],
  ])('maps Supabase error %o to %s', async (error, kind) => {
    const auth = supabasePlayerAuth(api({ signInWithPassword: vi.fn(async () => ({ data: { user: null, session: null }, error })) }), '/');
    await expect(auth.signIn({ email: 'a@b.co', password: 'x' })).resolves.toEqual({ ok: false, error: kind });
  });

  it('turns the session user into a player named after the sign-up name, or the email when there is none', async () => {
    await expect(supabasePlayerAuth(api(), '/').currentPlayer()).resolves.toEqual({ displayName: 'Andy', email: 'andy@example.com', isGuest: false, character: null });

    const noName = api({ getSession: vi.fn(async () => ({ data: { session: { user: { email: 'maria@example.com', user_metadata: {} } } }, error: null })) });
    await expect(supabasePlayerAuth(noName, '/').currentPlayer()).resolves.toEqual({ displayName: 'maria', email: 'maria@example.com', isGuest: false, character: null });

    const signedOut = api({ getSession: vi.fn(async () => ({ data: { session: null }, error: null })) });
    await expect(supabasePlayerAuth(signedOut, '/').currentPlayer()).resolves.toBeNull();
  });
});

describe('character choice', () => {
  it('reads the character chosen earlier from the account and ignores unknown values', async () => {
    const withCharacter = (character: unknown) =>
      api({ getSession: vi.fn(async () => ({ data: { session: { user: { email: 'a@b.co', user_metadata: { display_name: 'Andy', character } } } }, error: null })) });

    await expect(supabasePlayerAuth(withCharacter('woman'), '/').currentPlayer()).resolves.toMatchObject({ character: 'woman' });
    await expect(supabasePlayerAuth(withCharacter('dragon'), '/').currentPlayer()).resolves.toMatchObject({ character: null });
  });

  it('saves the chosen character in the account metadata', async () => {
    const fake = api();
    await supabasePlayerAuth(fake, '/').saveCharacter('man');
    expect(fake.updateUser).toHaveBeenCalledWith({ data: { character: 'man' } });
  });
});
