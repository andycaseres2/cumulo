# How to write a Cúmulo City mission (task T5)

Read `odd/tasks/city-districts.md` until `## Log` and your rows in `odd/tasks/city-districts-plan.md` first. Look at `src/modules/missions/infrastructure/content/bankAccess.ts` as the reference for shape, tone and depth (the new ones have 4 decisions instead of 5).

## File

- Path: `src/modules/missions/infrastructure/content/<district>/<mission id>.ts` (district = `centro`, `financiero`, `tecnologico` or `mercado`).
- `import type { Mission } from '../../../domain/Mission';` and `export const <Export>: Mission = { … };` with the export name from the plan. One mission per file. The catalog finds the file by itself (do not edit any index or other file).
- A short English JSDoc above the export: the business, the city and what the mission practices (like the existing files).

## Fields

- `id`, `track` (the district id), `buildingId`, `topicSlug` exactly as in the plan.
- `title`: a short, catchy Spanish title, unique in the city.
- `client`: `{ name, role }`. Varied Latin American names and genders. The client works at the plan's building: for a shop, its owner or staff; for an office building, a company or team with offices there (towers, coworkings, a university, a municipality can host several companies or areas).
- `intro`: 3 or 4 pages in the first person: who they are, the business and city (vary cities and countries across Latin America), the concrete problem, what is at stake, and an invitation to help.
- `outro.passed` and `outro.failed`: 2 pages each, in character; the failed one invites the player to review the theory and come back.
- `passingScore: 0.75`.
- `decisions`: exactly 4. Each one:
  - `id`: kebab-case, unique in the mission; `prompt`: what the client says in the first person, moving the story forward;
  - `topicSlug`: the mission's topic in at least 3 decisions; one may use another topic of the same exam domain if the story needs it;
  - `examTasks`: task statements from that topic's frontmatter `examTasks`;
  - `options`: exactly 4, one `correct: true` and three `correct: false`, each with `id` (kebab-case, unique in the mission), `label`, `definition` (neutral description of the service or concept, ≥ 30 characters, no hint about whether it fits) and `explanation` (why it fits or not THIS case, ≥ 30 characters);
  - across the 4 decisions put the correct option in at least 3 different positions.

## Content rules

- Every correct answer must be supported by the topic's text in `src/content/theory/<topic>.md` and by current AWS facts. Never invent facts; when unsure, do not use the fact.
- Distractors are plausible but clearly wrong for the case. Never use an option that could also do the job (e.g. AWS DMS also converts schemas; Shield Advanced includes WAF; Trusted Advisor and Cost Explorer both give rightsizing advice; S3 File Gateway also offers SMB; Amplify also does CI/CD; CloudFront now offers static IPs).
- No absolute claims ("nunca", "gratis", "el más caro", "no puede") unless the topic states them exactly; no numbers AWS publishes inconsistently.
- Explanations state facts directly: never "el tema no dice…", and do not start them with "Correcto." / "Incorrecto." (the panel shows the verdict).
- The two missions of a topic must feel different: different industry, city, client and angle, and together cover the topic's key ideas (and its "Trampas típicas del examen" when it has them). When one of them already exists, read it and make yours different.
- Spanish: neutral, "tú" form (the client talks to the player as "tú"); AWS service names and exam terms in English as the topic uses them.

## Verification

- `pnpm --dir /Users/caseres/Desktop/nimbus-city test missionContent` — every test named after your missions must pass. The test "gives every theory topic two missions" keeps failing until all writers finish; ignore it.
- `pnpm --dir /Users/caseres/Desktop/nimbus-city exec astro check` — 0 errors in your files.
- pnpm only, never npm/npx; `cd` fails in this shell, use `pnpm --dir`.
