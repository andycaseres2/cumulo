# Feature: building-interiors
Objective: let the player enter every building through its door into an office interior with workers walking and working, behind an access rule that allows everyone today and can require permission later; NPC dialogs feel like a real game.
Branch: `feat/building-interiors` (stacked on `feat/kenney-art`) · Delivery: ask-on-risk · Test runner: Vitest (access rule, interior layouts, worker routines) + `astro check` + headless Chrome play test.

## Specs

- **S1** User (verbatim): "algo que quiero los trabajos salen en los edificios y en la puerta podemos entrar y entrariamos a las oficinas de las personas esto es un plus que quiero ponerle para que sea mas realista la cosa y poner dialogos chevres reales como un juego ps son npcs pero debe funcionar pro".
- **S2** User scope for this version (verbatim): "horita necesutoi queel persona pueda entrar a los edificios que luego debe tener permiso para entrar obviamente pero al entrar se vea como oficinas y personas caminando y trabajando ps".
- **S3** Enter through the door (key E, Space or the prompt button) and exit through the same door back to the street in front of it.
- **S4** Access rule: a single `canEnter` decision per building; today it always allows; when denied, the player sees the reason and stays outside.
- **S5** Interior looks like an office: floor, walls with windows, desks with computers, chairs, plants, a break area; deterministic per building.
- **S6** Workers inside walk between their desk and the break area, and work at their desk; the player can talk to them.
- **S7** Dialogs: speaker name and portrait, text revealed letter by letter, E/Space/click first completes the text, then closes.
- Out of scope now (user): missions/jobs content and choices.
- Assets: free only (prior decision); interior art source decided after research (pending).

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S4, S5, S6 | inline | done | access, office layouts (13 buildings), pathfinding, break spots, office talk: RED→GREEN |
| T2 | S3, S5, S6 | inline | done | browser: E at door → interior, workers start at desks and move, no stacking, exit over doormat → back at the same door; bakery shop layout; camera frames the whole room |
| T3 | S7 | inline | done | typewriter test; browser: 14 chars at 250 ms, first E completes, second E closes; portrait + name |
| T4 | S1–S7 | inline | done | README controls, architecture and credits; 114 tests; astro check 0 |

- T1: pure model: access rule, office layout generator, worker routine; tests first.
- T2: engine: interior art, InteriorScene, enter/exit transitions with fades, workers.
- T3: dialog upgrade in the HUD (portrait, typewriter, two-step confirm).
- T4: docs, browser play test (enter, walk, talk, exit), screenshots.

## Log

- L1 (2026-10-21) Original request: S1; scope narrowed by the user in S2.
- L2 Kenney RPG Urban Pack has no interiors; Kenney Roguelike Indoors is CC0 but its style differs and shows no office computers; RPG Base has no interiors. Wider research for a free office set is running.
- L4 Research: no free 16x16 office set matches Kenney RPG Urban (LimeZu free is non-commercial and not redistributable; Cool School is 48x48; Roguelike Indoors has no computers). Decision: floor/walls/windows/plants from the pack, office furniture drawn in code with the pack's own 112-colour palette.
- L5 Bugs found in the browser and fixed: workers left their desks on entry (scene clock not synced in create; shift now starts on first update) and stacked on one break spot (six spots + shared reservations, test added).
- L3 Engram mirror `odd/building-interiors/tasks`: pending — Engram resolves the Desktop as an ambiguous workspace.
