-- Practice exam attempts per player. Run once in the Supabase dashboard (SQL Editor) or with the Supabase CLI.
-- Safe to run more than once. Until it exists, finished attempts wait in the browser and are uploaded later.
-- The id is made on the device, so uploading the same attempt again never duplicates it.

create table if not exists public.exam_attempts (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  taken_at timestamptz not null,
  score integer not null check (score between 0 and 1000),
  correct integer not null check (correct >= 0),
  total integer not null check (total > 0 and correct <= total),
  passed boolean not null,
  duration_seconds integer not null check (duration_seconds >= 0),
  by_domain jsonb not null default '[]'::jsonb check (jsonb_typeof(by_domain) = 'array'),
  created_at timestamptz not null default now()
);

create index if not exists exam_attempts_user_taken_at on public.exam_attempts (user_id, taken_at desc);

comment on table public.exam_attempts is 'Cúmulo: practice exam attempts of each player.';

-- Every player sees and adds only their own attempts; an attempt is never edited.
alter table public.exam_attempts enable row level security;

drop policy if exists "Players read their exam attempts" on public.exam_attempts;
create policy "Players read their exam attempts"
  on public.exam_attempts for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Players add their exam attempts" on public.exam_attempts;
create policy "Players add their exam attempts"
  on public.exam_attempts for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
