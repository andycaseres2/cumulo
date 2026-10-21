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

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: games and theory sections, featured game, exam domains |
| `/juegos` | Game catalog |
| `/juegos/nimbus-city` | The Nimbus City game. Add `?play=man` or `?play=woman` to skip character selection |
| `/teoria` | Theory grouped by exam domain |
| `/teoria/[slug]` | One theory topic |

Game controls: WASD or arrow keys to walk, Shift to run, E, Space or click to interact. Press E at a building door to go inside its office; walk back over the doormat to return to the street. In dialogs, the first press reveals the whole text and the second closes it.

## Architecture

The code is organized by feature (screaming architecture). Each module follows clean architecture: the domain knows nothing about Astro, Phaser or the browser.

```
src/
├── modules/
│   ├── exam/            Shared kernel: the four CLF-C02 domains and their weights
│   ├── theory/          domain (Topic, TopicRepository port) → application (use cases) → infrastructure (content collection adapter) → presentation
│   ├── games/           domain (Game, GameCatalog port) → application → infrastructure (static catalog) → presentation
│   │   └── nimbus-city/ The Phaser game: world (pure city map, autotile, prop spots, access rule, office layouts and pathfinding, office talk), engine (Kenney tile indices, office furniture drawn in the Kenney palette, renderers, entities, shared systems for input and interactions, scenes, HUD), mount.ts (public entry point)
│   └── player/          domain (Player, PlayerSession port) → application → infrastructure (guest session) → presentation
├── composition/         Composition root: wires adapters into use cases. Pages only import from here.
├── content/theory/      Theory topics in Markdown, validated by src/content.config.ts
├── ui/                  Shared design system: atoms, molecules, organisms, layouts, design tokens, routes
└── pages/               Thin containers: call the composition root and pass props to presentational components
```

Dependency rule: `pages → composition → application → domain`, and `infrastructure → domain`. Presentational components receive data through props.

To add real sign-in, write a `PlayerSession` adapter (for example with Supabase Auth) and swap it in `src/composition/player.ts`. The game receives the player name through `mountNimbusCity(parent, { playerName })` and does not change.

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
