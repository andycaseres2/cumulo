# Service Duel

Objective: build the "Duelo de servicios" game, complete: modes, content, progress, UI.
Branch: `feat/service-duel` · Delivery: single branch, ff-merge to main · Tests: Vitest (`pnpm test`), `astro check`, `astro build`, browser check on the preview.

## Specs

- S1 — "implementemos todo lo de Duelo de servicios porfavor eso esta demasiado interesante pero fullll". Catalog copy already promised: "Elige el servicio correcto antes de que acabe el tiempo" / "Rondas rápidas para distinguir servicios que se confunden en el examen: S3, EBS o EFS; RDS o DynamoDB; y muchos más."
- S2 (assumption, design) — Modes: Duelo (ladder of 5 rivals, HP, first correct answer wins the round, speed and streak bonus, next rival unlocks after a win), Contrarreloj (60 s, wrong answer −3 s), Entrenamiento (one service family, no clock, cheat sheet and explanations).
- S3 (assumption) — Content: about 13 families of easily confused in-scope services, about 12 scenarios each; every scenario has 3–4 options from its family, one answer, why it is right, why each other option is wrong, and the related theory topic. Fact-checked against AWS documentation.
- S4 (assumption) — Requires an account like the other games; progress (rivals beaten, best scores) saved in the account with a browser copy; a SQL migration the user runs.
- S5 (assumption) — DOM UI in the site's pixel style, keyboard 1–4 and touch, works on phones; review of every round at the end with links to theory.

## Tasks

| ID | Specs | Route | Status | Evidence |
|----|-------|-------|--------|----------|
| T1 | S2, S3 | inline | done | domain types, match rules, content contract test |
| T2 | S3 | delegated (parallel writers, disjoint content files) | done | 13 families written + fact-check verifier |
| T3 | S2, S5 | inline | done | UI, page, catalog status |
| T4 | S4 | inline | done | progress stores, Supabase migration, profile stats, README |

## Log

- L1 (2026-10-22, user): "implementemos todo lo de Duelo de servicios porfavor eso esta demasiado interesante pero fullll"
- L2: route evidence — T2 delegated by the Writer trigger (4 independent content units with disjoint files, launched together); T1/T3/T4 inline.
- L3: content: 13 families, 178 scenarios, every claim sourced from AWS docs by the writers. Two independent read-only fact-checkers: 0 blockers in 81 cards; 2 blockers in 97 (storage-3, storage-10: S3 Files, GA 2026-04-07, mounts buckets with POSIX permissions) — fixed, plus clear wording advisories. Remaining advisories left as is (legacy names still used by the exam guide: Migration Hub, Cost and Usage Reports, Security Hub; Amazon Q IDE plugins end 2027-04-30).
- L4: checks: duel tests 38 (match rules, deck, time attack, progress, stores, content contract, UI flows, profile view); migration tested on a throwaway Postgres (rerunnable, RLS blocks other players); browser on 1280 and 390 px: menu with locked ladder, intro, round, rival wins first round, feedback with explanation, no horizontal overflow.
- Pending (user): run `supabase/migrations/20261023000000_duel_progress.sql`.
