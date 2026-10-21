# Nimbus City

A 2D top-down web game to prepare for the AWS Certified Cloud Practitioner exam (CLF-C02). You play a cloud consultant who walks around the city, meets clients and solves realistic cloud problems.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints. Add `?play=man` or `?play=woman` to skip character selection.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Typechecks and builds to `dist/` |
| `npm run typecheck` | Runs the TypeScript compiler only |

## Controls

WASD or arrow keys to walk, Shift to run, E or Space to interact.

## Structure

- `src/art/` — all pixel art (tiles, characters, buildings, props) is drawn in code on canvas; there are no image assets yet.
- `src/world/cityMap.ts` — city layout: roads, park, buildings (future mission clients), trees and lamps.
- `src/entities/` — `Walker` (player) and `Npc` (wandering citizens).
- `src/scenes/` — `Boot` (generates textures), `Select` (character choice), `City` (world), `Hud` (overlay).

Not affiliated with or endorsed by Amazon Web Services.
