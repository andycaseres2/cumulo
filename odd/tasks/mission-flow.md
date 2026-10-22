# Feature: mission-flow
Objective: missions are offered one after another and only become active when the player accepts them on screen; an active mission shows its objective and a guide arrow to the building; the game's exit button moves to the top left.
Branch: `feat/mission-flow` (from `main`) · Delivery: ask-on-risk · Test runner: Vitest (campaign rules, guide math) + `astro check` + headless Chrome play test.

## Specs

- **S1** User (verbatim): "no activemos la primera mision debemos mostrar las misiones activas osea toca una tras otra y mostrar en pantalla acepta mision mostrar todo flechas de guia para llegar al edificio , el boton de salir pongamoslo en un lugar donde se vea mas del lado izqeuirdo arereiba creo".
- **S2** No mission is active at the start. Missions follow the catalog order: only the first not-completed one is offered; the next one is offered after completing the previous.
- **S3** On screen, the offered mission shows its title, client and building with an "Aceptar misión" button; after accepting, the same card shows "Misión activa" and the objective.
- **S4** While a mission is active and the player is in the city, a guide arrow next to the player points to the building's door until the player is close; the building shows "!" only while its mission is active, and a check once completed.
- **S5** The client offers the job conversation only while the mission is active; otherwise they are a regular worker.
- **S6** The game's "Salir" button sits at the top left and is clearly visible; the HUD location card does not overlap it.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S2, S3 | inline | done | campaign rules RED→GREEN (offered/locked, accept, failed stays active, next offered, all done, legacy progress) |
| T2 | S3, S4, S5 | inline | done | missionCard + client talk RED→GREEN; browser: offer card, no "!" before accepting, regular worker at counter, accept by click, "!" after, Rosa only then |
| T3 | S4 | inline | done | guideArrow RED→GREEN; browser: hidden at the door, visible from (500,450) pointing up-left (−2.56 rad); redrawn larger after the first screenshot looked weak |
| T4 | S6 | inline | done | "Salir" at (12,12) in the accent color; HUD header moved below it |
| T5 | S1–S6 | inline | done | README; full browser flow incl. practice 5/5 → "Misiones al día"; tests, check, build |

- T1: missions domain: mission states (locked, offered, active, completed), accept, current mission of the campaign; tests first.
- T2: port + composition + game: HUD mission card (offer / active / all done), accept, markers and client only for the active mission.
- T3: guide arrow (pure direction/visibility rule tested) drawn next to the player in the city.
- T4: exit button top left; HUD header below it.
- T5: docs and browser play test (offer → accept → arrow → mission → next state).

## Log

- L1 (2026-10-21) Original request: S1.
- L2 Engram mirror `odd/mission-flow/tasks`: pending — Engram resolves the Desktop as an ambiguous workspace.
