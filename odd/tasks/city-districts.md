# Cúmulo City: four districts and two missions per topic

Objective: a bigger Cúmulo City with one district per exam domain and two missions for every theory topic (84 missions), each with its own client and case. Branch: `feat/city-districts` (engine), then one branch per content batch. Delivery: work-unit commits merged into `main`; push only when the user approves. Test runner: `pnpm test`, `pnpm exec astro check`, `pnpm build`, headless Chrome on the dev server (`window.__game`).

## Specs

- S1: "la persona no puede entrar a un edificio a menos que tenga una mision en ese edificio" — done in `a12fe18` (only the active mission's building opens). Must keep working with districts.
- S2: "acepto la mision sale en el mapa una flechita para guiarme cual es el edificio donde tengo que llegar" — the guide arrow points to the active mission's building; when it is in another district, it points to the bus stop that takes the player there, and the mission card says which district.
- S3: "al entrar al edificio con quien es que tengo que hablar para la mision" — done in `a12fe18` (arrow to the client inside).
- S4: "has mas grande la ciudad para que tengamos mcuhas pero muchas misiones para practicar varias veces osea digamos del mismo tema 2 o 3 misiones pero con contextos y casos diferentes" — agreed structure ("si dale con esa estructura"):
  - four districts, one per exam domain: Distrito Centro (cloud-concepts), Distrito Financiero (security-compliance), Distrito Tecnológico (technology-services), Distrito Mercado (billing-pricing-support);
  - two missions per theory topic to start (42 × 2 = 84, the 6 existing missions included), each with a different client, context and case;
  - about 13 buildings per district; a building can host several clients (one after another), so ~52 buildings hold 84 missions;
  - same production process as the question bank: parallel writers, independent fact-check, batches by district.
- Decisions taken for the agreed structure (assumptions, documented for review):
  - each district has its own campaign track: its missions are offered one after another in order; only one mission can be active in the whole city at a time (so S1 stays meaningful);
  - the mission card offers the next mission of the district the player is in; while a mission is active, the card shows it wherever the player is;
  - districts are separate maps of the same size, joined by a bus stop in each one ("Tomar el bus" → choose a district);
  - every mission has a primary topic (`topicSlug`) of its district's domain; a new mission has 4 decisions focused on that topic (existing ones keep 5);
  - the profile groups missions by district.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S4 | inline: missions domain — `track`, `topicSlug`, per-track campaign, one active mission, missions per building | done | RED→GREEN missionProgress tests (tracks, one active mission, building mission) |
| T2 | S2, S4 | inline: world — districts, buildings per district, bus stops (pure, tested) | done | RED→GREEN districts.test.ts, busStop.test.ts; access district message written with its test (RED not observed separately) |
| T3 | S1, S2, S3, S4 | inline: engine — city per district, bus travel, guide to the bus stop, markers, interior, HUD | done | engine per district; browser run on build preview with ?e2e: accept, bus to Financiero, guide to bus stop, bank refused with bus message, back and into the bakery with the arrow to the client |
| T4 | S4 | inline: mission plan (84 rows: id, topic, district, building, order) + content contract; profile grouped by district | done | plan in city-districts-plan.md; contract: 2 missions per topic, unique client names; profile grouped by district (RED→GREEN) |
| T5 | S4 | delegated: parallel writers for the 78 new missions (writer reason: parallel units, disjoint files) | done | 13 writers, 78 new missions |
| T6 | S4 | delegated: independent fact-check per batch | done | 10 independent fact-checks: 4 blockers fixed, ~60 advisories applied |
| T7 | S1–S4 | inline: apply fixes, full verification (tests, check, build, browser) | done | 1050 tests, astro check 0 errors, build OK |

## Log

- L1 (user, 2026-10-22): "ok en cuanto a los permisos ps la persona no puede entrar a un edificio a menos que tenga una mision en ese edificio entonces toma eso en cuenta , 2 acepto la mision sale en el mapa una flechita para guiarme cual es el edificio donde tengo que llegar   igual al entrar al edificio con quien es que tengo que hablar para la mision, has mas grande la ciudad para que tengamos mcuhas pero muchas misiones para practicar varias veces osea digamos del mismo tema 2 o 3 misiones pero con contextos y casos diferentes seria la idea es posible?"
- L2 (user, 2026-10-22): "si dale con esa estructura"
- S1 and S3 shipped in `a12fe18` with unit tests; browser check pending because the user's dev server answers "504 Outdated Optimize Dep" and needs a restart.
- T5/T6: writers reused client names (fixed: 11 renamed, test added) and Vitest's on-disk module cache hid new mission files from import.meta.glob (fixed: fsModuleCache off in vitest.config.ts). Blockers fixed: a CloudWatch distractor was defensible for X-Ray tracing (also in the theory quiz) and "una sola cuenta" made a consolidated-billing distractor defensible, plus support-plan and storage wording. Masculine forms of address ("Bienvenido", "Gracias, consultor") rewritten in neutral Spanish because the player can be a consultora.
- T7 browser: the user's dev server kept answering 504 Outdated Optimize Dep, so checks ran on the build preview; the game is exposed with ?e2e. Found and fixed two real bugs: an older MissionTracker refresh could overwrite a newer one (test added), and the synced progress store hit Supabase on every read (now once per page; one read went from ~2 s to ~0.25 s).
