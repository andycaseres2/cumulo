import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from 'astro:env/client';
import { isBrowserSafeKey } from './browserKey';

let client: SupabaseClient | null | undefined;

/**
 * Shared browser client for Supabase adapters (auth, mission progress), created on first use.
 * Returns null while the project is not configured, so the site keeps working in guest mode.
 * A secret or service_role key is never used, even if it was put in the environment by mistake.
 */
export function supabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = PUBLIC_SUPABASE_URL;
  const key = PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (url && key && !isBrowserSafeKey(key)) {
    console.error('PUBLIC_SUPABASE_PUBLISHABLE_KEY must be the publishable or anon key, never a secret or service_role key.');
  }
  client = url && key && isBrowserSafeKey(key) ? createClient(url, key) : null;
  return client;
}
