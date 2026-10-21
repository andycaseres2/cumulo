# Feature: astro-platform
Objective: turn the Nimbus City prototype into an Astro platform for AWS Cloud Practitioner prep with a home page, a games section and a theory section, built with clean architecture and well-componentized UI.
Branch: `feat/astro-platform` · Delivery: ask-on-risk · Test runner: Vitest (domain/application) + Astro build/check + headless Chrome checks for the game.

## Specs

- **S1** Home with sections. User: "al iniciar a la pagina tengamos la seccion de juegos o algo asi la idea es que esto va a ser enfocado a AWS tendremos juegos de practicas y teoria por otro lado seria genial de verdad". Routes agreed: `/` (home: Juegos and Teoría), `/juegos`, `/juegos/nimbus-city`, `/teoria`, `/teoria/[tema]`.
- **S2** Framework. User: "utiliza astro no seria bueno ? que es muy optimo ?" → confirmed: "si eso dale con todo". Theory in Markdown content collections; the game is a client-only script that loads only on its page.
- **S3** Quality. User: "necesito que todo este super bien pero demasiado bien componetizado y con clean arquitecture porfavor". Screaming modules (`theory`, `games`, `player`) with domain / application / infrastructure layers, ports and adapters, a composition root, thin pages as containers and presentational components (atomic design).
- **S4** Player indicator. User: "mi persona tiene que tener un indicador de que soy yo como el name de la persona que tomaremos cuando inicien sesion". The name comes from a player session port (guest today, login later); the game receives it by injection.
- **S5** Mouse buttons. User: "no solo acciones de teclado tambien pon los botones de aceptar porfavor". Keep the Aceptar / interaction buttons working.
- **S6** Preserve the game: city, man/woman characters, walking, NPCs, doors, HUD, minimap ("me gustaria ver ontar todo la ciudad los personajes hombre y mujer y los movimientos caminando por la ciudad").
- Assumption: site and theory copy are in neutral Spanish (the audience and the in-game text are Spanish); code, comments and docs in English.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S2, S4, S5, S6 | inline | done | `astro check` 0 errors; player tests RED→GREEN (3); headless walk + mouse-only checks pass on `/juegos/nimbus-city`, name tag "Invitado" injected |
| T2 | S3, S4 | inline | done | 15 new tests RED→GREEN (exam, theory, games, city map); `astro check` 0/0/0; T1 commit assess: medium, under_budget |
| T3 | S1, S3 | inline | done | `astro check` 0/0/0; build 12 pages; desktop screenshots of `/`, `/juegos`, `/teoria`, a topic; CDP 390px phone emulation: no page overflow (only the comparison table scrolls inside its box) |
| T4 | S1 (theory content) | delegated — parallel unit, disjoint surface `src/content/theory/**` | done | 8 topics, 717–893 words, 1–6 official sources each; validated by the Zod schema in `astro check`; writer stayed inside its surface |
| T5 | S1–S6 | inline | done | 18 tests pass; `astro check` 0/0/0; build 12 pages; walk + mouse-only game checks pass; README documents routes, architecture and content authoring |

- T1: Astro scaffold; move the Phaser game into `src/modules/games/nimbus-city/` behind `mountNimbusCity(parent, { playerName })`; page `/juegos/nimbus-city`.
- T2: Domain + application + infrastructure for `theory`, `games`, `player`, composition root, Vitest tests written first.
- T3: Design tokens, shared UI (atoms/molecules/organisms/layouts), feature presentational components, pages `/`, `/juegos`, `/teoria`, `/teoria/[slug]`.
- T4: 8 seed theory topics (2 per CLF-C02 domain), verified against official AWS documentation with sources.
- T5: README, full build/check/test, headless browser checks of game (walk, buttons, name tag) and pages.

## Log

- L1 (2026-10-21) Original request: "si eso dale con todo , necesito que todo este super bien pero demasiado bien componetizado y con clean arquitecture porfavor" — answering the proposal to migrate to Astro with routes `/`, `/juegos`, `/juegos/nimbus-city`, `/teoria`, `/teoria/[tema]`.
- L2 Baseline: prototype committed on `main` as `9096d70`; feature branch created. Astro 7.4.2, Vitest 5.0.5 are current on npm.
- L4 T1: Astro pinned to 7.4.1 because 7.4.2 requires Node >=22.23.4 and the machine runs 22.23.2 (ServBay-managed; not changed). The player module landed in T1 because the game page needs the injected name (S4).
- L5 T2: exam domains live in a shared-kernel module `exam` so `games` does not depend on `theory`. The game `config.ts` no longer imports Phaser so the world module is pure and testable.
- L6 T4 writer notes: no exact Region/AZ/edge counts, prices or Reserved Instance discount (not on official pages); "price" as a Region selection factor and IAM implicit deny are standard facts not quoted by the cited pages.
- L7 T3: "0 temas" and a 404 on a topic came from a dev server started before `content.config.ts` existed; the production build had all 8 topics. A 390px desktop-Chrome screenshot looked clipped because desktop Chrome enforces a minimum window width; real phone emulation over CDP showed no overflow.
- L3 Engram mirror `odd/astro-platform/tasks`: pending — the Engram server resolves the Desktop as an ambiguous workspace and does not offer this repo.
