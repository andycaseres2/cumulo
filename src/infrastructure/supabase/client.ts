import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from 'astro:env/client';

let client: SupabaseClient | null | undefined;

/**
 * Shared browser client for Supabase adapters (auth, mission progress), created on first use.
 * Returns null while the project is not configured, so the site keeps working in guest mode.
 */
export function supabase(): SupabaseClient | null {
  if (client === undefined) {
    client =
      PUBLIC_SUPABASE_URL && PUBLIC_SUPABASE_PUBLISHABLE_KEY
        ? createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY)
        : null;
  }
  return client;
}
