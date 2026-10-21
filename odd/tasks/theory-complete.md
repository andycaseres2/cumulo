# Feature: theory-complete
Objective: complete theory for the current AWS Certified Cloud Practitioner exam (CLF-C02), covering every task statement and every in-scope service of the live official exam guide, with facts verified against current official AWS sources.
Branch: `feat/theory-complete` (stacked on `feat/astro-platform`) · Delivery: ask-on-risk · Test runner: Vitest (coverage contract + use cases) + `astro check` (content schema) + build.

## Specs

- **S1** User request (verbatim): "ahora necesito primero tengamos toda pero toda la teoria bien armada entonces que necesito que armes toda la teoria completa pero completa para tenerla lista que eso me importa mucho pero mucho de verdad enmtonces investiga de informacion de aws al dia oficial sobre los temas completemos  toda la teoria pero todaaaaa porfavor".
- **S2** Completeness is measured against the live official guide (https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html): every task statement 1.1–4.3 is covered by at least one topic, and every in-scope service appears in at least one topic's `services`. Enforced by a test.
- **S3** "informacion de aws al dia oficial": every topic lists the official AWS URLs it was verified against; current names are used (e.g. Amazon SageMaker AI, Amazon Quick Sight, AWS Business Support+, AWS Unified Operations).
- **S4** Each topic declares the exam tasks it covers (`examTasks`), shown on the topic page; `/teoria` shows the exam format and the coverage.
- Assumption: copy in neutral Spanish, same structure as the existing 8 topics (¿Por qué importa? → concepts → Trampas típicas del examen → Resumen para el examen).

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S2, S4 | inline | pending | |
| T2 | S1–S3 (D1, 4 new + 2 updated) | delegated — parallel unit, files listed in its prompt | pending | |
| T3 | S1–S3 (D2, 8 new + 2 updated) | delegated — parallel unit | pending | |
| T4 | S1–S3 (D3 orders 1–10, 9 new + 1 updated) | delegated — parallel unit | pending | |
| T5 | S1–S3 (D3 orders 11–20, 9 new + 1 updated) | delegated — parallel unit | pending | |
| T6 | S1–S3 (D4, 4 new + 2 updated) | delegated — parallel unit | pending | |
| T7 | S1–S4 | inline + independent fact-check verifier | pending | |

- T1: exam tasks, in-scope services and exam format in the `exam` module; `examTasks` on topics; coverage use case; coverage contract test over the Markdown files; UI for tasks, format and coverage.
- T2–T6: writers own disjoint file sets inside `src/content/theory/` (listed per prompt). Route reason: five independent units launched together.
- T7: coverage test green, `astro check`, build, independent fact-check sample of volatile claims (support plans, pricing, renamed services).

## Log

- L1 (2026-10-21) Original request: see S1.
- L2 Research (official pages, 2026-10-21): CLF-C02 is current; no CLF-C03 page exists. Live guide edited in place: Business Support+ and Unified Operations replace older plan names; Developer Support no longer named. Format: 65 questions (50 scored, 15 unscored), 90 min, scaled 100–1000, pass 700, compensatory; multiple choice and multiple response.
- L3 Engram mirror `odd/theory-complete/tasks`: pending — Engram resolves the Desktop as an ambiguous workspace.
