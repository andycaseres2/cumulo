/**
 * Composition root for theory progress. Client-side only.
 * Guests keep completed topics in this browser; signed-in players keep them in their Supabase account
 * (with a copy in the browser), and whatever they completed as guests on this device joins their account.
 */
import { migrateLegacyStorage, STORAGE_PREFIX } from '@/infrastructure/storage/renameStoragePrefix';
import { supabase } from '@/infrastructure/supabase/client';
import type { TheoryProgressStore } from '@/modules/theory/domain/TheoryProgress';
import { localTheoryProgressStore } from '@/modules/theory/infrastructure/localTheoryProgressStore';
import { supabaseTheoryProgressStore } from '@/modules/theory/infrastructure/supabaseTheoryProgressStore';
import { syncedTheoryProgressStore } from '@/modules/theory/infrastructure/syncedTheoryProgressStore';

const GUEST_KEY = `${STORAGE_PREFIX}theory-progress`;

let store: Promise<TheoryProgressStore> | undefined;

async function createStore(): Promise<TheoryProgressStore> {
  migrateLegacyStorage();
  const client = supabase();
  const userId = client ? (await client.auth.getSession()).data.session?.user.id : undefined;
  const guest = localTheoryProgressStore(GUEST_KEY);
  if (!client || !userId) return guest;

  const local = localTheoryProgressStore(`${GUEST_KEY}:${userId}`);
  const asGuest = await guest.load();
  if (asGuest.length > 0) {
    await local.save([...new Set([...(await local.load()), ...asGuest])]);
    await guest.save([]);
  }
  const remote = supabaseTheoryProgressStore(
    {
      select: async () => await client.from('theory_progress').select('topic_slug'),
      upsert: async (rows) => await client.from('theory_progress').upsert(rows, { onConflict: 'user_id,topic_slug' }),
    },
    userId,
  );
  return syncedTheoryProgressStore(remote, local);
}

/** The theory progress store for the current visitor, created once per page. */
export function theoryProgressStore(): Promise<TheoryProgressStore> {
  store ??= createStore();
  return store;
}
