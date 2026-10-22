# Practice exam question bank ×3

Objective: triple the practice exam bank (126 → 378 questions) so repeated attempts stay fresh. Branch: `feat/exam-bank`. Delivery: one work unit merged into `main` (push only when the user approves). Test runner: `pnpm test` (`quizContent.test.ts` contract), `pnpm exec astro check`, `pnpm build`, headless Chrome on the build preview.

## Specs

- S1: "entonces expande esas preguntas por el triple si es posible" — the bank used by the practice exam grows from 126 to 378 questions.
- S2: each topic gets a `practice` block of 6 new questions (42 × 6 = 252) used only by the practice exam; the topic quiz (3 questions) stays as it is. Same rules as the quizzes: answerable from the topic, 4 options, exactly one correct, plausible but unambiguous distractors, an explanation per option, neutral Spanish "tú", correct position varied, no question repeated across the bank.
- S3: every new question is fact-checked by an independent reviewer before merging.
- Assumption: multiple-response items (which the real exam has) are out of scope for this batch; they were mentioned as a possible follow-up.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S2 | inline: schema `practice`, bank includes it, contract test | done | RED: 42 practice tests fail, quiz and uniqueness pass |
| T2 | S1, S2 | delegated: 6 parallel writers × 7 topics, disjoint files (writer reason: parallel units) | done | 252 practice questions; contract 85/85 |
| T3 | S3 | delegated: independent fact-checkers per writer batch | done | 252 checked, 3 blockers fixed, 21 advisories applied |
| T4 | S1 | inline: apply fixes, verify (tests, check, build, browser) | done | 362 tests; bank 378 (54/90/180/54); full exam run in the browser |

## Log

- L1 (user, 2026-10-22): "nice el simulacro genial intentos ilimitados?" — answered yes; noted that 126 questions repeat quickly.
- L2 (user, 2026-10-22): "entonces expande esas preguntas por el triple si es posible"
- T3 blockers fixed: an S3 "no transfer charge" question had three defensible options (now "no genera ningún cargo"); the Free account plan does not lose its credits when joining Organizations (question and topic body corrected: remaining credits apply to future bills); an Amplify distractor could also do CI/CD (replaced by AWS CLI). Near-duplicates across topics were replaced (CloudWatch CPU alarm, CloudTrail "who deleted", six-advantages wording). Topic bodies aligned: EBS root volume is deleted on termination by default.
- T4: the bank is served from `/simulacro/banco.json`, so the page HTML went from ~557 KB to ~13 KB.
