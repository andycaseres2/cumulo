# English identifiers

Objective: every route, slug, id, file name and identifier in English; UI copy and theory prose stay in Spanish until the translation layer.
Branch: `feat/english-identifiers` · Delivery: single branch, ff-merge to main · Tests: Vitest (`pnpm test`), `astro check`, `astro build`.

## Specs

- S1 — "todo el codigo debe estar en ingles las rutas todo eso debe estar en ingles y al tener la web lista le metemos traduccion"
  - Routes: `/teoria`→`/theory`, `/juegos`→`/games`, `/ingresar`→`/sign-in`, `/perfil`→`/profile`, `/simulacro`→`/practice-exam` (bank `/practice-exam/bank.json`). Old URLs redirect to the new ones.
  - Theory topic slugs (file names) and the mission ids/files/export names derived from them in English.
  - District ids, mission content folders, building ids and game slugs in English.
  - UI copy and theory prose unchanged (assumption: translation comes later, as the user said).
- S2 — Saved progress survives the rename (assumption, from "progress in the account" work): old topic slugs and mission ids already in Supabase or localStorage are read as the new ones, and a SQL migration renames the stored rows. The SQL runs only with the user's authorization.

## Tasks

| ID | Specs | Route | Status | Evidence |
|----|-------|-------|--------|----------|
| T1 | S1, S2 | inline | done (c86bd78) | topic slugs + mission ids renamed, legacy id mapping in sync stores, SQL migration |
| T2 | S1 | inline | done (c86bd78) | district, building and game ids |
| T3 | S1 | inline | done (this commit) | routes, redirects, README |

## Log

- L1 (2026-10-22, user): "algo que necesito ajuste todo el codigo debe estar en ingles las rutas todo eso debe estar en ingles y al tener la web lista le metemos traduccion"
- L2: read-only inventory: code identifiers and comments are already English; Spanish lives in ids/slugs/routes. Topic slugs and mission ids are persisted (`theory_progress.topic_slug`, `mission_progress.mission_id`, localStorage), and sync stores re-upload local data, so the rename needs an old→new mapping on read.
- L3: T1+T2 in one script (`git mv` + exact-token replacements). Migration tested on a throwaway local Postgres: run twice, old+new rows of the same mission joined (best score kept), theory rows renamed. 1076 tests, 0 type errors.
- L4: T3 routes `/theory`, `/games`, `/sign-in`, `/profile`, `/practice-exam`; game slugs `practice-exam`, `service-duel`; redirects for the old pages and the 40 old topic URLs. Browser: course catalog → course → topic, old `/teoria/redes-vpc` lands on `/theory/cloud-practitioner/vpc-networking`, game loads in `downtown`. 1077 tests, build ok.
- Pending (user): run `supabase/migrations/20261022120000_english_ids.sql`; replace `/ingresar` with `/sign-in` in Supabase Authentication → URL Configuration → Redirect URLs.
