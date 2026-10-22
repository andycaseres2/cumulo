# Nimbus City

A platform to prepare for the AWS Certified Cloud Practitioner exam (CLF-C02): practice games where you solve realistic cloud problems, and theory organized by the four official exam domains.

Built with Astro (static pages, Markdown content collections) and Phaser (the 2D game, loaded only on its own page).

## Run

Requires Node.js 22.22 or newer and pnpm 12. This project uses pnpm only: npm is blocked through `engines` and `engine-strict`.

```bash
pnpm install
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the dev server |
| `pnpm build` | Typechecks (`astro check`) and builds static pages to `dist/` |
| `pnpm preview` | Serves the production build |
| `pnpm check` | Typechecks `.astro` and `.ts` files and validates content |
| `pnpm test` | Runs the unit tests (Vitest) |

Restart the dev server after changing `src/content.config.ts`.

### Environment variables

Supabase is optional: without these variables the site runs in guest mode and saves progress in the browser. Create a `.env` file in the project root (it is ignored by git) with:

```bash
# Supabase dashboard → your project → Settings → API Keys.
# Both values are public by design: the browser uses them and Row Level Security protects the data.
PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

- Use the **publishable key** (`sb_publishable_...`) or, in projects that only show legacy keys, the **`anon` `public`** key. The client checks the key and refuses secret and `service_role` keys even if they are put here by mistake (`src/infrastructure/supabase/browserKey.ts`). Malformed URLs fail the build when the client is used.
- Never add the **secret key** (`sb_secret_...`) or the legacy `service_role` key: they bypass Row Level Security and must not reach the browser or the repository.
- The shared client lives in `src/infrastructure/supabase/client.ts`; it returns `null` while the variables are missing.
- Restart `pnpm dev` after editing `.env`.

### Accounts (Supabase Auth)

Players sign up at `/ingresar` with their name, email and password, and confirm their email before signing in. Playing requires an account: signed-out visitors who open a game get a sign-in modal over a blurred view of it, and the game loads right after signing in (theory stays public). "Ingresar" in the header opens the same modal on any page; `/ingresar` is the full-page fallback and where the confirmation email lands. The player's name shows in the header and above their character. In the Supabase dashboard:

1. **Authentication → Sign In / Providers → Email**: enabled (default), with "Confirm email" on.
2. **Authentication → URL Configuration**: set **Site URL** to the site address (`http://localhost:4321` in development) and add `http://localhost:4321/ingresar` (and later the production URL + `/ingresar`) to **Redirect URLs**. Otherwise the confirmation email points to `http://localhost:3000`, the Supabase default.

Supabase's built-in email service only sends a few emails per hour; configure custom SMTP (Authentication → Emails) before launching. After signing in, `?next=` returns the player to the page they came from (same-site paths only).

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: games and theory sections, featured game, exam domains |
| `/juegos` | Game catalog |
| `/juegos/nimbus-city` | The Nimbus City game. Add `?play=man` or `?play=woman` to skip character selection |
| `/teoria` | Theory grouped by exam domain |
| `/teoria/[slug]` | One theory topic |

The "Salir" button at the top left leaves the game. Game controls: WASD or arrow keys to walk, Shift to run, E, Space or click to interact. Press E at a building door to go inside its office; walk back over the doormat to return to the street. In dialogs, the first press reveals the whole text and the second closes it; pick answers with the buttons or the keys 1–3.

Missions are played one after another. Nothing is active at the start: the card under the minimap offers the next mission with an "Aceptar misión" button. Once accepted, the card shows the objective, a "!" appears over the building and an arrow next to the player points to its door; a check marks completed missions. Inside, talk to the client (e.g. Rosa Quispe at the Pastelería Dulce Nube counter), start the case and choose **Aprender** (definitions before choosing, explanation after each answer) or **Práctica** (no hints, review at the end). Answer with clicks or the keys 1–4; Escape or "Salir" leaves without saving. Progress is saved in this browser.

## Architecture

The code is organized by feature (screaming architecture). Each module follows clean architecture: the domain knows nothing about Astro, Phaser or the browser.

```
src/
├── modules/
│   ├── exam/            Shared kernel: the four CLF-C02 domains and their weights
│   ├── theory/          domain (Topic, TopicRepository port) → application (use cases) → infrastructure (content collection adapter) → presentation
│   ├── games/           domain (Game, GameCatalog port) → application → infrastructure (static catalog) → presentation
│   │   └── nimbus-city/ The Phaser game: world (pure city map, autotile, prop spots, access rule, office layouts and pathfinding, office talk), engine (Kenney tile indices, office furniture drawn in the Kenney palette, renderers, entities, shared systems for input and interactions, scenes, HUD), mount.ts (public entry point)
│   ├── missions/        domain (Mission, run rules, campaign states, progress port) → application (play and record) → infrastructure (mission content, static catalog, localStorage progress) → presentation (mission panel)
│   └── player/          domain (Player, PlayerSession port) → application → infrastructure (guest session) → presentation
├── composition/         Composition root: wires adapters into use cases. Pages only import from here.
├── content/theory/      Theory topics in Markdown, validated by src/content.config.ts
├── ui/                  Shared design system: atoms, molecules, organisms, layouts, design tokens, routes
└── pages/               Thin containers: call the composition root and pass props to presentational components
```

Dependency rule: `pages → composition → application → domain`, and `infrastructure → domain`. Presentational components receive data through props.

To add real sign-in, write a `PlayerSession` adapter (for example with Supabase Auth) and swap it in `src/composition/player.ts`. The game receives the player name and its missions through `mountNimbusCity(parent, { playerName, missions })` (the `GameMissions` port in `src/modules/games/nimbus-city/missions.ts`) and does not change. Mission progress moves to an account the same way: replace `localStorageProgressStore` in `src/composition/missions.ts`.

### Adding a mission

Write it as typed data in `src/modules/missions/infrastructure/content/` and register it in `staticMissionCatalog.ts`. `pnpm test` checks the content contract (`missionContent.test.ts`): four options per decision with exactly one correct, varied answer positions, a definition and an explanation for every option, and theory topics and exam tasks that exist.

### Adding theory

Create `src/content/theory/<slug>.md` with this frontmatter:

```yaml
---
title: "Topic title"
summary: "One sentence about what the learner will understand."
domain: "cloud-concepts" # cloud-concepts | security-compliance | technology-services | billing-pricing-support
order: 3                 # position inside the domain
examTasks: ["3.6"]       # task statements of the exam guide it covers
services: ["Amazon S3"]  # canonical names from src/modules/exam/domain/inScopeServices.ts
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/..."
---
```

Start the body at `##`; the page renders the title. Every factual claim should be backed by an official AWS source listed in `sources`. Keep `examTasks` and `services` as single-line JSON arrays.

`pnpm test` includes a coverage contract (`src/modules/theory/infrastructure/contentCoverage.test.ts`): it fails if any task statement of the official guide or any in-scope service is not covered by at least one topic.

## Credits

Game art: [RPG Urban Pack](https://kenney.nl/assets/rpg-urban-pack) by Kenney, CC0 1.0 (public domain). The sheet and its license live in `public/games/nimbus-city/kenney-rpg-urban/`. Character shirt variants are recolored at runtime. Office furniture (desks, chairs, meeting table, counter, shelves, printer, cooler, sofa) is drawn in code with colors from the Kenney palette, because no free 16x16 office set matches the pack.

Not affiliated with or endorsed by Amazon Web Services.
