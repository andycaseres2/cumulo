# Missions as consulting jobs

Objective: play missions as real consulting work instead of an exam: work order, client requests, instant consequences, client satisfaction, a manual with a cost, a closing report with stars and fees.
Branch: `feat/consulting-jobs` · Delivery: one branch, ff-merge · Tests: Vitest, `astro check`, build, browser.

## Specs

- S1 — "algo que no me gusta mucho es la forma de como se ejcuta la practica uno no se diria practicar seria otra cosa … recuerda que esto es un mundo real supongamos y te estan contratando las misiones son trabajos que tienes que hacer … al seleccionarla nose si esta bien o no … no siento que estoy trabajando y aprendiendo mientras me divierto en el juego se siente mas examen"
- S2 — Agreed design ("si dale conm toda"): work order with one "Tomar el trabajo" button; each decision is a client request in a chat bubble with the client's portrait; options are proposals; instant ✅/❌, client reaction and a "Nota del consultor senior"; "Satisfacción del cliente" bar; "Consultar el manual" shows definitions and lowers the rating; closing report with 1–3 stars, fees (credits) and what was learned, linked to theory. Reactions come from phrase pools; senior notes reuse each option's explanation.
- S3 (assumption) — Stars: 0 when failed; otherwise 1, +1 with every request right, +1 without opening the manual. Fees only for approved jobs. Best stars are kept per mission (account column `best_stars`, rerunnable migration); until it runs, progress keeps working without stars.
- S4 (assumption) — Profile shows stars per completed mission and the fees earned. Spanish and English.

## Tasks

| ID | Specs | Route | Status | Evidence |
|----|-------|-------|--------|----------|
| T1 | S2, S3 | inline | done | job rules (satisfaction, manual, stars, fees) |
| T2 | S3 | inline | done | best stars persisted (record, stores, migration) |
| T3 | S1, S2 | inline | done | job panel UI + messages es/en |
| T4 | S4 | inline | done | profile stars and fees |

## Log

- L1 (2026-10-22, user): see S1. L2: proposal accepted: "si dale conm toda".
- L3: done inline. Rules: satisfaction 50 ± 50/n per proposal, stars = passed + all right + no manual, fee = 50/request + 50/star (0 when rejected). Persistence: optional `bestStars` (merge keeps the best, only present when rated), `best_stars` column (migration tested on Postgres: rerunnable, existing rows 0, check 0–3); composition falls back to the old select/upsert while the column is missing. Panel rewritten (work order, chat bubbles, meter, manual, senior note, report with retry). 1616 tests, build OK; browser: full job by keyboard, screenshots of order/outcome/report.
- Pending (user): run `supabase/migrations/20261025000000_mission_best_stars.sql`.
