# Feature: auth
Objective: players sign up and sign in with email and password through Supabase; their name replaces "Invitado" in the site header and above their character; without Supabase configured the site keeps working as guest.
Branch: `feat/auth` (from `main`, merged back when done) · Delivery: ask-on-risk · Test runner: Vitest (validation, adapter mapping, forms in happy-dom) + `astro check` + browser check.

## Specs

- **S1** User (verbatim): "ya puse el .env, sigamos con el login".
- **S2** Method chosen by the user: "Email y contraseña (Recomendado)" — sign up with name, email and password; Supabase sends a confirmation email.
- **S3** The signed-in player's name shows in the site header and on the game name tag (previously "Invitado"); the header offers "Ingresar" to guests and "Salir" to signed-in players.
- **S4** Clear Spanish errors (wrong credentials, email not confirmed, weak password, too many attempts, service unavailable) and validation before calling Supabase (name, email, password length).
- **S5** Security: only the browser-safe key is used (already enforced); passwords are never stored or logged by the app.
- Out of scope for this feature: mission progress in the account (needs a table and RLS; next step).

## Tasks

| ID | Specs | Route | Status | Evidence |
| --- | --- | --- | --- | --- |
| T1 | S2, S4, S5 | inline | done | validation + Supabase adapter (7 error codes, player name from metadata/email) RED→GREEN |
| T2 | S2, S4 | inline | pending | |
| T3 | S3 | inline | pending | |
| T4 | S1–S5 | inline | pending | |

- T1: player module: auth port, sign up / sign in validation use cases, Supabase adapter (error and player mapping), guest adapter; tests first.
- T2: `/ingresar` page with sign-in and sign-up forms (testable form controller), messages, redirect.
- T3: header chip (name + Salir / Ingresar), composition switching to Supabase when configured, game name tag.
- T4: docs (Supabase URL configuration), browser check, tests.

## Log

- L1 (2026-10-21) Original request: S1; method chosen in S2.
- L2 Docs: `signUp({ email, password, options: { data, emailRedirectTo } })`, `signInWithPassword`, AuthError `code` (e.g. `invalid_credentials`, `email_not_confirmed`). Supabase redirects confirmation emails to the Site URL, `http://localhost:3000` by default: the user must set it to the site's URL.
- L3 Engram mirror `odd/auth/tasks`: pending — Engram resolves the Desktop as an ambiguous workspace.
