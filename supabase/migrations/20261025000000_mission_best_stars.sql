-- Best rating (0–3 stars) of each consulting job per player. Run once in the Supabase dashboard (SQL Editor).
-- Safe to run more than once. Until it runs, the game keeps working and saves progress without stars.

alter table public.mission_progress
  add column if not exists best_stars smallint not null default 0;

alter table public.mission_progress drop constraint if exists mission_progress_best_stars_check;
alter table public.mission_progress
  add constraint mission_progress_best_stars_check check (best_stars between 0 and 3);
