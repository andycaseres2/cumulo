/**
 * Composition root for the Service Duel. Client-side only.
 * Signed-in players keep their progress in their Supabase account (with a copy in the browser).
 */
import { STORAGE_PREFIX } from '@/infrastructure/storage/renameStoragePrefix';
import { supabase } from '@/infrastructure/supabase/client';
import type { DuelProgressStore } from '@/modules/duel/domain/DuelProgress';
import { localDuelProgressStore, supabaseDuelProgressStore, syncedDuelProgressStore } from '@/modules/duel/infrastructure/duelProgressStores';

let store: Promise<DuelProgressStore> | undefined;

async function createStore(): Promise<DuelProgressStore> {
  const client = supabase();
  const userId = client ? (await client.auth.getSession()).data.session?.user.id : undefined;
  const key = `${STORAGE_PREFIX}duel-progress`;
  if (!client || !userId) return localDuelProgressStore(key);

  const remote = supabaseDuelProgressStore(
    {
      select: async () => await client.from('duel_progress').select('beaten_rivals, best_time_attack, best_practice'),
      upsert: async (row) => await client.from('duel_progress').upsert({ ...row, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }),
    },
    userId,
  );
  return syncedDuelProgressStore(remote, localDuelProgressStore(`${key}:${userId}`));
}

/** The duel progress store for the current player, created once per page. */
export function duelProgressStore(): Promise<DuelProgressStore> {
  store ??= createStore();
  return store;
}
