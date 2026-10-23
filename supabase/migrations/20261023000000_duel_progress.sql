-- Service Duel progress per player. Run once in the Supabase dashboard (SQL Editor) or with the Supabase CLI.
-- Until it exists, the game keeps progress in the browser and uploads it as soon as the table is available.
-- Safe to run more than once. One row per player: rivals beaten, best time attack and best training result per service family.

create table if not exists public.duel_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  beaten_rivals text[] not null default '{}' check (cardinality(beaten_rivals) <= 50),
  best_time_attack integer not null default 0 check (best_time_attack between 0 and 1000),
  best_practice jsonb not null default '{}'::jsonb check (jsonb_typeof(best_practice) = 'object'),
  updated_at timestamptz not null default now()
);

comment on table public.duel_progress is 'Cúmulo: Service Duel progress of each player.';

-- Every player sees and changes only their own row.
alter table public.duel_progress enable row level security;

drop policy if exists "Players read their duel progress" on public.duel_progress;
create policy "Players read their duel progress"
  on public.duel_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Players insert their duel progress" on public.duel_progress;
create policy "Players insert their duel progress"
  on public.duel_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Players update their duel progress" on public.duel_progress;
create policy "Players update their duel progress"
  on public.duel_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
