# Practice exam (simulacro)

Objective: a full CLF-C02 practice exam built from the reviewed theory questions. Branch: `feat/practice-exam`. Delivery: one work unit, merged into `main` (push only when the user approves). Test runner: `pnpm test` (Vitest + happy-dom), `pnpm exec astro check`, `pnpm build`, headless Chrome on the build preview.

## Specs

- S1: "pero necesitamos completar todo" — after the user asked what comes next, the agreed next item is "Un simulacro del examen: 65 preguntas con tiempo y puntaje en la escala 100–1000, como el CLF-C02 real" (from the proposal accepted in chat).
- S2: 65 questions spread across the four exam domains by their official weight (24 %, 30 %, 34 %, 12 %), drawn at random from the topic quiz bank, with questions and options shuffled.
- S3: 90-minute timer; when it runs out the exam is submitted. The player can move between questions, mark them for review and finish early (with a confirmation if questions are unanswered).
- S4: results: estimated score on the 100–1000 scale (passing 700), correct answers per domain, and a review of every question with the chosen answer, the right one, its explanation and a link to the theory topic.
- S5: open to everyone, like the theory (assumption: same decision as the topic quizzes).
- Assumption: the real exam has 15 unscored questions, multiple-response items and a non-public scaling; the practice exam scores all 65 single-answer questions and maps the percentage linearly, and says so on screen.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S2, S4 | inline: exam domain (build, score) | done | RED→GREEN `PracticeExam.test.ts` (7 tests) |
| T2 | S3, S4, S5 | inline: simulator UI, `/simulacro` page, nav link | done | RED→GREEN `examSimulator.test.ts` (7 tests); browser run of a full exam |

## Log

- L1 (user, 2026-10-22): "ok que sigue?"
- L2 (user, 2026-10-22): "pero necesitamos completar todo" — order agreed: practice exam first, then more missions and building permissions; deploy and SMTP wait for the user's accounts.
- T1/T2: 361 tests pass, astro check 0 errors, build OK. Build-preview run: intro shows 65 questions; split 16/19/22/8; timer counts down; 65 answered (50 forced right) → "806 Aprobado", 51 of 65, per-domain rows and 65 review items; mobile 390 px without overflow; no console errors. Added: leave-page confirmation while an exam runs, a "Simulacro" link in the header and a third card on the home.
