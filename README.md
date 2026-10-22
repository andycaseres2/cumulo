# Cúmulo

A platform to prepare for the AWS Certified Cloud Practitioner exam (CLF-C02): practice games where you solve realistic cloud problems, and theory organized by the four official exam domains. Its first game is **Nimbus City**. The platform name lives in `src/ui/site.ts`.

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

Players sign up at `/ingresar` with their name, email and password, and confirm their email before signing in. Playing requires an account: signed-out visitors who open a game get a sign-in modal, and the game loads right after signing in (theory stays public). Behind the modal they see the plain selection background until a character was picked on that device, and the city afterwards. The character is picked once and saved in the account (Supabase `user_metadata.character`, a preference, never a permission), so the game skips the selection screen next time. "Ingresar" in the header opens the same modal on any page; `/ingresar` is the full-page fallback and where the confirmation email lands. The player's name shows in the header and above their character. In the Supabase dashboard:

1. **Authentication → Sign In / Providers → Email**: enabled (default), with "Confirm email" on.
2. **Authentication → URL Configuration**: set **Site URL** to the site address (`http://localhost:4321` in development) and add `http://localhost:4321/ingresar` (and later the production URL + `/ingresar`) to **Redirect URLs**. Otherwise the confirmation email points to `http://localhost:3000`, the Supabase default.

### Mission progress in the account

Signed-in players keep their mission progress in their Supabase account, with a copy in the browser. To create the table, open **Supabase → SQL Editor**, paste [`supabase/migrations/20261021000000_mission_progress.sql`](supabase/migrations/20261021000000_mission_progress.sql) and run it. It creates `mission_progress` with Row Level Security: each player can read and change only their own rows.

Until the table exists (or while offline), the game keeps working with the browser copy and uploads it as soon as the table answers. Progress played on a browser before accounts existed is added to the first account that signs in there. Scores are written by the browser, so they are a learning aid, not a tamper-proof record.

Theory progress (topics completed with their quiz) uses its own table: run [`supabase/migrations/20261022000000_theory_progress.sql`](supabase/migrations/20261022000000_theory_progress.sql) the same way. It creates `theory_progress`, also with Row Level Security, and works the same: until it exists, completed topics stay in the browser.

Supabase's built-in email service only sends a few emails per hour; configure custom SMTP (Authentication → Emails) before launching. After signing in, `?next=` returns the player to the page they came from (same-site paths only).

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: games and theory sections, featured game, exam domains |
| `/juegos` | Game catalog |
| `/juegos/nimbus-city` | The Nimbus City game. Add `?play=man` or `?play=woman` to skip character selection |
| `/teoria` | Theory grouped by exam domain |
| `/teoria/[slug]` | One theory topic |
| `/ingresar` | Sign in or create an account (also available as a modal from the header and the game) |
| `/perfil` | Profile (requires an account): name, email, character, completed missions, best scores and exam domains practiced. Also reached from the avatar menu. `/progreso` redirects here |

The "Salir" button at the top left leaves the game. Game controls: WASD or arrow keys to walk, Shift to run, E, Space or click to interact. Press E at a building door to go inside its office; walk back over the doormat to return to the street. In dialogs, the first press reveals the whole text and the second closes it; pick answers with the buttons or the keys 1–3.

Missions are played one after another. Nothing is active at the start: the card under the minimap offers the next mission with an "Aceptar misión" button. Once accepted, the card shows the objective, a "!" appears over the building and an arrow next to the player points to its door; a check marks completed missions. Inside, talk to the client (e.g. Rosa Quispe at the Pastelería Dulce Nube counter), start the case and choose **Aprender** (definitions before choosing, explanation after each answer) or **Práctica** (no hints, review at the end). Answer with clicks or the keys 1–4; Escape or "Salir" leaves without saving. Progress is saved in the player's account (with a copy in the browser); see "Mission progress in the account".

The campaign has six missions, in this order: Pastelería Dulce Nube (cloud benefits, elasticity, global infrastructure, cloud economics), Banco Andino (shared responsibility, IAM, root user, encryption, auditing), Startup Hub (cost tools, consolidated billing and tags, EC2 purchase options), StreamLlama (DNS and content delivery, global infrastructure, storage), Municipalidad (S3 storage classes, hybrid storage and backup, compliance reports) and Clínica Vida (managed databases, Well-Architected, monitoring, disaster recovery).

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
quiz:                    # exactly 3 questions, 4 options each, exactly one correct
  - prompt: "A short exam-style scenario and the question?"
    options:
      - label: "Option"
        explanation: "Why it is wrong for this scenario."
      - label: "Right option"
        explanation: "Why it is right (the page already shows the verdict)."
        correct: true
      - label: "Option"
        explanation: "..."
      - label: "Option"
        explanation: "..."
---
```

The quiz appears at the end of the topic. Answering the 3 questions right completes the topic: its card shows "✓ Completado", its domain counts it and the profile shows it under "Teoría". Guests can answer too (progress stays in their browser, with an invitation to sign in); when they sign in, it joins their account. `src/modules/theory/infrastructure/quizContent.test.ts` lists the domains whose topics must all have a quiz.

Start the body at `##`; the page renders the title. Every factual claim should be backed by an official AWS source listed in `sources`. Keep `examTasks` and `services` as single-line JSON arrays.

`pnpm test` includes a coverage contract (`src/modules/theory/infrastructure/contentCoverage.test.ts`): it fails if any task statement of the official guide or any in-scope service is not covered by at least one topic.

## Credits

Game art: [RPG Urban Pack](https://kenney.nl/assets/rpg-urban-pack) by Kenney, CC0 1.0 (public domain). The sheet and its license live in `public/games/nimbus-city/kenney-rpg-urban/`. Character shirt variants are recolored at runtime. Office furniture (desks, chairs, meeting table, counter, shelves, printer, cooler, sofa) is drawn in code with colors from the Kenney palette, because no free 16x16 office set matches the pack.

Not affiliated with or endorsed by Amazon Web Services.
