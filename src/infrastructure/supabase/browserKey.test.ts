import { describe, expect, it } from 'vitest';
import { isBrowserSafeKey } from './browserKey';

/** Builds an unsigned legacy-style JWT with the given payload (signature is irrelevant here). */
const jwt = (payload: object) => `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.signature`;

describe('isBrowserSafeKey', () => {
  it('accepts the new publishable keys', () => {
    expect(isBrowserSafeKey('sb_publishable_abc123')).toBe(true);
  });

  it('accepts the legacy anon key', () => {
    expect(isBrowserSafeKey(jwt({ role: 'anon', ref: 'abcdefghij' }))).toBe(true);
  });

  it('refuses secret and service_role keys, which bypass Row Level Security', () => {
    expect(isBrowserSafeKey('sb_secret_abc123')).toBe(false);
    expect(isBrowserSafeKey(jwt({ role: 'service_role', ref: 'abcdefghij' }))).toBe(false);
  });

  it('refuses anything it cannot recognize', () => {
    expect(isBrowserSafeKey('not-a-key')).toBe(false);
    expect(isBrowserSafeKey('eyJ.broken')).toBe(false);
  });
});
