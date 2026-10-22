-- Theory progress per player. Run once in the Supabase dashboard (SQL Editor) or with the Supabase CLI.
-- Until it exists, completed topics stay in the browser and are uploaded as soon as the table is available.
-- One row per player and topic; a row only exists once all the topic's quiz questions were answered right.

create table if not exists public.theory_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_slug text not null check (char_length(topic_slug) between 1 and 120),
  completed_at timestamptz not null default now(),
  primary key (user_id, topic_slug)
);

comment on table public.theory_progress is 'Nimbus City: theory topics each player completed.';

-- Every player sees and changes only their own rows.
alter table public.theory_progress enable row level security;

create policy "Players read their theory progress"
  on public.theory_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Players insert their theory progress"
  on public.theory_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Players update their theory progress"
  on public.theory_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
