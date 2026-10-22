import type { Character } from './Player';
import type { PlayerSession } from './PlayerSession';

export type AuthErrorKind =
  | 'invalid-name'
  | 'invalid-email'
  | 'missing-password'
  | 'weak-password'
  | 'invalid-credentials'
  | 'email-not-confirmed'
  | 'user-exists'
  | 'rate-limited'
  | 'unavailable'
  | 'unknown';

export type AuthOutcome =
  /** `needsConfirmation`: the account exists but the player must confirm their email before signing in. */
  { ok: true; needsConfirmation: boolean } | { ok: false; error: AuthErrorKind };

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

/** Port: accounts for players (sign up, sign in, sign out) on top of reading the current player. */
export interface PlayerAuth extends PlayerSession {
  signUp(input: SignUpInput): Promise<AuthOutcome>;
  signIn(input: SignInInput): Promise<AuthOutcome>;
  signOut(): Promise<void>;
  /** Remembers the character the signed-in player picked, so the game skips the selection next time. */
  saveCharacter(character: Character): Promise<void>;
  /** Calls `listener` whenever the signed-in player changes; returns a function that stops listening. */
  onChange(listener: () => void): () => void;
}
