import type { Player } from '../domain/Player';
import type { AuthErrorKind, AuthOutcome, PlayerAuth } from '../domain/PlayerAuth';

interface UserLike {
  email?: string;
  user_metadata?: Record<string, unknown>;
}

interface ErrorLike {
  code?: string;
  status?: number;
}

/** The part of Supabase's `client.auth` this adapter needs (kept narrow so tests can fake it). */
export interface AuthApi {
  signUp(credentials: {
    email: string;
    password: string;
    options: { data: { display_name: string }; emailRedirectTo: string };
  }): Promise<{ data: { user: UserLike | null; session: unknown }; error: ErrorLike | null }>;
  signInWithPassword(credentials: { email: string; password: string }): Promise<{ error: ErrorLike | null }>;
  signOut(): Promise<{ error: ErrorLike | null }>;
  getSession(): Promise<{ data: { session: { user: UserLike } | null } }>;
  onAuthStateChange(callback: () => void): { data: { subscription: { unsubscribe(): void } } };
}

const ERROR_KINDS: Record<string, AuthErrorKind> = {
  invalid_credentials: 'invalid-credentials',
  email_not_confirmed: 'email-not-confirmed',
  weak_password: 'weak-password',
  user_already_exists: 'user-exists',
  email_exists: 'user-exists',
  over_request_rate_limit: 'rate-limited',
  over_email_send_rate_limit: 'rate-limited',
};

function errorKind(error: ErrorLike): AuthErrorKind {
  if (error.code && ERROR_KINDS[error.code]) return ERROR_KINDS[error.code];
  // Network failures reach supabase-js as status 0 (the request never got a response).
  if (!error.status) return 'unavailable';
  return 'unknown';
}

function toPlayer(user: UserLike): Player {
  const name = user.user_metadata?.display_name;
  const displayName = typeof name === 'string' && name.trim() ? name.trim() : (user.email?.split('@')[0] ?? 'Jugador');
  return { displayName, isGuest: false };
}

/** Adapter: player accounts with Supabase Auth (email and password). */
export function supabasePlayerAuth(auth: AuthApi, emailRedirectTo: string): PlayerAuth {
  return {
    async currentPlayer() {
      const { data } = await auth.getSession();
      return data.session ? toPlayer(data.session.user) : null;
    },
    async signUp({ name, email, password }): Promise<AuthOutcome> {
      const { data, error } = await auth.signUp({ email, password, options: { data: { display_name: name }, emailRedirectTo } });
      if (error) return { ok: false, error: errorKind(error) };
      return { ok: true, needsConfirmation: !data.session };
    },
    async signIn(credentials): Promise<AuthOutcome> {
      const { error } = await auth.signInWithPassword(credentials);
      return error ? { ok: false, error: errorKind(error) } : { ok: true, needsConfirmation: false };
    },
    async signOut() {
      await auth.signOut();
    },
    onChange(listener) {
      const { data } = auth.onAuthStateChange(() => listener());
      return () => data.subscription.unsubscribe();
    },
  };
}
