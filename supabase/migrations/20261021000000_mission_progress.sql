-- Mission progress per player. Run once in the Supabase dashboard (SQL Editor) or with the Supabase CLI.
-- Until it exists, the game keeps progress in the browser and uploads it as soon as the table is available.

create table if not exists public.mission_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  mission_id text not null,
  best_score real not null default 0 check (best_score >= 0 and best_score <= 1),
  completed boolean not null default false,
  accepted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, mission_id)
);

comment on table public.mission_progress is 'Nimbus City: best score and state of each mission per player.';

-- Every player sees and changes only their own rows.
alter table public.mission_progress enable row level security;

create policy "Players read their own mission progress"
  on public.mission_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Players add their own mission progress"
  on public.mission_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Players update their own mission progress"
  on public.mission_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Keep updated_at current on every change.
create or replace function public.touch_mission_progress()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger mission_progress_touch
  before update on public.mission_progress
  for each row execute function public.touch_mission_progress();
