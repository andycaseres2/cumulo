# Feature: bakery-mission
Objective: first real mission end to end — the Pastelería Dulce Nube client explains her problem, the player accepts the job, chooses a mode (Aprender / Práctica), answers realistic decisions with AWS services, gets explanations, and progress is saved.
Branch: `feat/bakery-mission` (stacked on `feat/building-interiors`) · Delivery: ask-on-risk · Test runner: Vitest (mission rules, content contract, conversations, progress) + `astro check` + headless Chrome play test.

## Specs

- **S1** User (verbatim): "si dale con la misión de la pastelería".
- **S2** Mission design agreed earlier (verbatim fragments): "la idea es que sean problemas mas reales no solo un texto asi sino escribir todo el contexto de lo que pas con la startup por ejemplo de que es y todo eso"; "importante que mostremos definiciones de servicios de las opciones que tenemos para seleccionar asi pueden tener mas contexto y poder elegir la correcta"; "la idea es que sirva para personas con 0 conocimiento y aprenderan con el juego y con personas como yo que ya he estudiado pero necesitamos practicar".
- **S3** Agreed modes: **Aprender** — neutral "¿Qué es esto?" definition per option before choosing, explanation right after each answer; **Práctica** — no definitions, explanations and score at the end. The explanation is always shown in both modes.
- **S4** Every decision has four plausible options and exactly one correct answer; each option explains why it fits or not; each decision links to the theory topic it practices.
- **S5** In the world: a "!" marks the building with an available job and a "✓" once completed; inside, the client has a "!" and an intro conversation with choices (accept / not now).
- **S6** Progress (completed, best score) is saved per player device and survives reloads; the storage is a port so it can move to an account later.
- Assumption: passing score 80 % (4 of 5); the player can replay to improve.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S3, S4, S6 | inline | done | run state machine + progress (best score, sticky completion) RED→GREEN |
| T2 | S2, S4 | inline | done | content contract RED→GREEN (4 options, one correct, varied positions, theory slugs, exam tasks); Auto Scaling cost claim matches verified theory |
| T3 | S5 | inline | done | ConversationCursor RED→GREEN (pages, blocked choices, valid choices); HUD choice buttons + keys 1–3; interior regression green |
| T4 | S2, S3 | inline | done | panel tests RED→GREEN in happy-dom: learn (definitions, instant feedback, theory link), practice (no hints, review at end), leave early, number keys |
| T5 | S1, S5, S6 | inline | pending | |
| T6 | S1–S6 | inline | pending | |

- T1: `missions` module: domain (Mission, Decision, Option, run state machine, result), progress port + use cases, localStorage and in-memory adapters; tests first.
- T2: bakery mission content (story, five decisions on elasticity, Auto Scaling, load balancing, Availability Zones, variable expense) + content contract test (one correct option, four options, theory slugs and exam tasks exist).
- T3: conversations with pages and choices in the game (Interactions + HUD choice buttons).
- T4: mission panel UI (DOM overlay, design tokens): mode choice, decisions, definitions, feedback, results with theory links.
- T5: game integration: markers on the building and the client, client NPC, accept flow, pause/resume, saved progress.
- T6: docs and browser play test of both modes.

## Log

- L1 (2026-10-21) Original request: S1.
- L2 Content basis: theory topics `beneficios-de-la-nube` (elasticity, variable expense), `escalado-y-balanceo-de-carga` (EC2 Auto Scaling, ELB health checks), `infraestructura-global` (multiple AZs).
- L3 The mission panel is a DOM overlay, not Phaser text: long explanations need wrapping, scrolling, links and accessible buttons.
- L4 Engram mirror `odd/bakery-mission/tasks`: pending — Engram resolves the Desktop as an ambiguous workspace.
