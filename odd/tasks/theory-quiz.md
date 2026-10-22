# Theory quiz and theory progress

Objective: every theory topic ends with 3 questions; answering all of them right marks the topic as completed, and theory progress is tracked. Branch: `feat/theory-quiz`. Delivery: one domain per batch, starting with domain 1. Test runner: `pnpm test` (Vitest + happy-dom), `pnpm exec astro check`, `pnpm build`, headless Chrome checks.

## Specs

- S1: "cada uno de estos deberia tener al final unas 3 preguntas sobre ese tema" — each topic page ends with 3 questions about that topic (exam style, 4 options, one correct, an explanation for every option, retry allowed).
- S2: "al completarlas se pone como completado ese punto o este tema" — a topic is completed when its 3 questions are answered right; topic cards show it, and each domain shows how many of its topics are completed.
- S3: "asi levamos tambien el progreso teorico" — theory progress is shown in the profile next to mission progress.
- S4: guests can answer without an account; their progress stays in the browser with a notice to sign in to keep it; signed-in players keep it in their Supabase account, and the browser copy is merged into the account (decision agreed in chat).
- S5: "si dale arranca con el dominio 1" — this batch writes the questions for the 6 topics of domain 1 (Conceptos de la nube), fact-checked against each topic.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S5 | delegated: 2 parallel writers (3 topics each, disjoint files) while the parent builds T2 | done | 18 questions; schema + `quizContent.test.ts` pass |
| T2 | S1, S2, S3, S4 | inline | done | RED→GREEN: theoryProgress, stores, topicQuiz, theoryProgressView; browser check on build preview |
| T3 | S5 | independent fact-check of the 18 questions | done | 0 blockers, 5 advisories applied |

## Log

- L1 (user, 2026-10-22): "como estamos manejando la teoria? cada uno de estos deberia tener al final unas 3 preguntas sobre ese tema asi al completarlas se pone como completado ese punto o este tema asi levamos tambien el progreso teorico seria bueno que piensas"
- L2 (user, 2026-10-22): "cual de las 2 opciones vez mejor tu ?" — recommended: guests answer without an account (progress in the browser, notice to sign in).
- L3 (user, 2026-10-22): "si dale arranca con el dominio 1"
- Decision: completion requires 3 of 3 right; questions live in each topic's frontmatter (`quiz`), validated by the content schema.
- T3: fact-check found 0 blockers; 5 wording advisories applied (ambiguous "servicio", EC2 label, sustainability wording, WA Tool distractor, operational excellence principle).
- T2: browser check (guest, build preview): wrong answer → "2 de 3" with retry; all right → "Tema completado" + sign-in invitation; slug stored in the browser; badge on the card and "1 de 6 temas completados" on /teoria; no overflow at 390 px; no console errors. The leading "Correcto." was removed from explanations because the UI shows the verdict.
- Pending for the user: run `supabase/migrations/20261022000000_theory_progress.sql`; domains 2–4 questions.
