# Overnight platform batches

Objective: leave the platform as complete as possible for a demo. Branch: one short branch per batch, fast-forwarded into `main`. Delivery: local only (no push, no deploy, no SQL run). Test runner: `pnpm test` (Vitest), `pnpm exec astro check`, `pnpm build`, headless Chrome checks.

## Specs

- S1: Mission progress lives in the player's Supabase account, with a device copy as fallback.
- S2: Five new missions so the campaign practices all four exam domains, fact-checked against the theory.
- S3: "Mi progreso" page: completed missions, best scores and exam domains practiced.
- S4: Final polish and full verification.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S1 | inline | done | `c299f70` |
| T2 | S2 | delegated writers (5 parallel missions) + independent fact-check | done | `f99c728`, fixes `43da959` |
| T3 | S3 | inline | done | `abebfcf` |
| T4 | S4 | inline | done | this commit |

## Log

- L1 (user, 2026-10-20): "si arranca con eso y todo lo demas haslo por tandas seguidas me voy a dormir y me gustaria que trabajes para dejar la plataforma lo mas completa para mostrarla mañana"
- T2: the fact-check found 1 blocker (the bank audit question implied CloudTrail records row-level database changes; it now asks who changed the RDS instance configuration) and 5 advisories, all applied.
- T3: RED then GREEN for `getCampaignOverview` and `renderProgress`; browser check at 1280 and 390 px: guest gets the sign-in modal and closing it goes home; sample progress renders 6 missions with no overflow and no console errors.
- T4: 233 tests pass, `astro check` 0 errors, build 48 pages; modal and mobile checks pass; all six missions played through the real panel in Chrome, 5/5 each, no errors.
- Pending for the user: run `supabase/migrations/20261021000000_mission_progress.sql` in the Supabase SQL Editor; push `main` to GitHub when approved.
