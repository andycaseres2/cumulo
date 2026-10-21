# Nimbus City

A platform to prepare for the AWS Certified Cloud Practitioner exam (CLF-C02): practice games where you solve realistic cloud problems, and theory organized by the four official exam domains.

Built with Astro (static pages, Markdown content collections) and Phaser (the 2D game, loaded only on its own page).

## Run

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Typechecks (`astro check`) and builds static pages to `dist/` |
| `npm run preview` | Serves the production build |
| `npm run check` | Typechecks `.astro` and `.ts` files and validates content |
| `npm test` | Runs the unit tests (Vitest) |

Restart the dev server after changing `src/content.config.ts`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: games and theory sections, featured game, exam domains |
| `/juegos` | Game catalog |
| `/juegos/nimbus-city` | The Nimbus City game. Add `?play=man` or `?play=woman` to skip character selection |
| `/teoria` | Theory grouped by exam domain |
| `/teoria/[slug]` | One theory topic |

Game controls: WASD or arrow keys to walk, Shift to run, E, Space or click to interact.

## Architecture

The code is organized by feature (screaming architecture). Each module follows clean architecture: the domain knows nothing about Astro, Phaser or the browser.

```
src/
├── modules/
│   ├── exam/            Shared kernel: the four CLF-C02 domains and their weights
│   ├── theory/          domain (Topic, TopicRepository port) → application (use cases) → infrastructure (content collection adapter) → presentation
│   ├── games/           domain (Game, GameCatalog port) → application → infrastructure (static catalog) → presentation
│   │   └── nimbus-city/ The Phaser game: world (pure city map), engine (art, entities, scenes, HUD), mount.ts (public entry point)
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
services: ["Amazon S3"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/..."
---
```

Start the body at `##`; the page renders the title. Every factual claim should be backed by an official AWS source listed in `sources`.

Not affiliated with or endorsed by Amazon Web Services.
