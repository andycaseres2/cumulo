import type { AuthOutcome, PlayerAuth, SignInInput, SignUpInput } from '../domain/PlayerAuth';

export const NAME_LENGTH = { min: 2, max: 30 };
export const MIN_PASSWORD_LENGTH = 8;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates the form before creating the account, so obvious mistakes never reach the service. */
export async function signUp(auth: PlayerAuth, input: SignUpInput): Promise<AuthOutcome> {
  const name = input.name.trim();
  const email = input.email.trim();
  if (name.length < NAME_LENGTH.min || name.length > NAME_LENGTH.max) return { ok: false, error: 'invalid-name' };
  if (!EMAIL.test(email)) return { ok: false, error: 'invalid-email' };
  if (input.password.length < MIN_PASSWORD_LENGTH) return { ok: false, error: 'weak-password' };
  return auth.signUp({ name, email, password: input.password });
}

export async function signIn(auth: PlayerAuth, input: SignInInput): Promise<AuthOutcome> {
  const email = input.email.trim();
  if (!EMAIL.test(email)) return { ok: false, error: 'invalid-email' };
  if (input.password === '') return { ok: false, error: 'missing-password' };
  return auth.signIn({ email, password: input.password });
}
