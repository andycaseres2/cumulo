/** Reads the `role` claim of a legacy Supabase key (a JWT); null if it is not a readable JWT. */
function legacyRole(key: string): string | null {
  const payload = key.split('.')[1];
  if (!payload) return null;
  try {
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return (JSON.parse(json) as { role?: string }).role ?? null;
  } catch {
    return null;
  }
}

/**
 * True only for keys that may live in the browser: a publishable key (`sb_publishable_...`) or a legacy
 * `anon` key. Secret and `service_role` keys bypass Row Level Security and are always refused.
 */
export function isBrowserSafeKey(key: string): boolean {
  if (key.startsWith('sb_publishable_')) return true;
  if (key.startsWith('eyJ')) return legacyRole(key) === 'anon';
  return false;
}
