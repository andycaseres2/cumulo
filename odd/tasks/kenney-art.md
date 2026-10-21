# Feature: kenney-art
Objective: replace the procedural pixel art of Nimbus City with the free CC0 Kenney RPG Urban Pack so the city, buildings, props and characters look much better.
Branch: `feat/kenney-art` (stacked on `feat/theory-complete`) · Delivery: ask-on-risk · Test runner: Vitest (world + autotile) + `astro check` + headless Chrome checks (walk, buttons, name tag, screenshots).

## Specs

- **S1** User (verbatim): "vamos con el juego mejoremos los personajes busca alguna libreria muy buena poara todos los elementos que se vean mas bonitos mas chevres porfa".
- **S2** User (verbatim): "no puedo comprar nada por ahora debe ser bonito y gratis por ahora no tenemos pagos de esto". → Kenney RPG Urban Pack, CC0 (https://kenney.nl/assets/rpg-urban-pack), 16x16 tiles, committed to the repo with its License.txt.
- **S3** Every element uses the pack: ground (roads, crosswalks, pavement, grass, water), buildings (roof, brick facade, doors, windows, awnings), props (trees, lamps, benches, cars, bins) and characters (4-direction walk, 3 frames).
- **S4** Keep existing behavior: character selection man/woman, walking, running, collisions, NPC wandering and dialogs, door prompts, mouse buttons, name tag ("Invitado"), minimap, building names.
- Assumption: Kenney credit shown in the README and the site footer although CC0 does not require it.

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S3 | inline | done | autotile + ground/props tests RED→GREEN (36 total incl. tree-over-bench regression) |
| T2 | S1, S3, S4 | inline | done | `astro check` 0; prod-build black-box play test: Aceptar click, walk right/left (flipped profile), E opens door dialog, Aceptar closes; console clean |
| T3 | S1–S4 | inline | done | Kenney credit in README and footer; README structure updated |

- T1: pure world model: ground grid (road, crosswalks, pavement, grass, water), park layout, autotile (nine-slice role from neighbours), prop spots; tests first.
- T2: engine: load the sheet, Kenney tile indices, ground/building/overlay layers, props, characters (extracted per character + recolored variants), Walker/Npc/name tag sizes for 16x16.
- T3: credits (README, footer), browser checks and screenshots, docs.

## Log

- L1 (2026-10-21) Original request: see S1; path chosen in S2.
- L2 Tile map of the pack (27x18, 16 px, packed sheet): grass nine-slice 0/1/2/27/28/29/54/55/56; pavement 8/9/10/35/36/37/62/63/64; beige roof 81…137; grey roof 89…145; water 170…226; red brick facade cols 17/18/19 rows top 17, band 44, wall 71, base 98; orange facade 125/152/179/206 rows; doors 283/284/285/311/312; windows 335–337, 362–364, 389–391; storefront 359–361/386–388; awning 328/329/330; lamps 164+191; trees 232+259 (ground), 232+286 (planter); bench 381; cars 2x2 (420/421/447/448 taxi); characters 6 x (4 cols: side, down, up, side) x 3 rows (frames) at cols 23–26.
- L4 Decisions: Kenney cars are 32 px wide and would fill a 2-tile road, so they are left out; blocks are fully paved like the pack sample, with the park as the green area. Right-facing frames are the left ones mirrored with flipX.
- L5 The user's own dev server (port 4321) served a stale Vite pre-bundle (504 Outdated Optimize Dep for phaser) after the npm→pnpm reinstall; it needs a restart. Verification ran on a production preview instead.
- L3 Engram mirror `odd/kenney-art/tasks`: pending — Engram resolves the Desktop as an ambiguous workspace.
