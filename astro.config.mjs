// @ts-check
import { readdirSync } from 'node:fs';
import { defineConfig, envField } from 'astro/config';
import legacy from './src/infrastructure/legacyTopicSlugs.json' with { type: 'json' };

// Topic slugs, read from the Spanish content (the original language).
const topicSlugs = readdirSync(new URL('./src/content/theory/es/', import.meta.url)).map((file) => file.replace(/\.md$/, ''));

// Pages from before the language prefix (and before English routes) open in Spanish, the only language back then.
const unprefixedPages = Object.fromEntries(
  [
    'games',
    'games/cumulo-city',
    'games/service-duel',
    'theory',
    'theory/cloud-practitioner',
    'profile',
    'practice-exam',
    ...topicSlugs.map((slug) => `theory/cloud-practitioner/${slug}`),
  ].map((path) => [`/${path}`, `/es/${path}`]),
);

// Old theory topic URLs, from before the courses page and the English slugs.
const oldTopicPages = Object.fromEntries(
  Object.entries(legacy.topics).flatMap(([oldSlug, slug]) => [
    [`/teoria/${oldSlug}`, `/es/theory/cloud-practitioner/${slug}`],
    [`/teoria/cloud-practitioner/${oldSlug}`, `/es/theory/cloud-practitioner/${slug}`],
  ]),
);

export default defineConfig({
  // Public address of the site (e.g. https://cumulo.app), set by the host at build time. Used for canonical
  // links, social previews and the sitemap; without it they are left out or point to localhost.
  site: process.env.SITE_URL || undefined,
  // The dev toolbar overlaps the full-screen game canvas.
  devToolbar: { enabled: false },
  // `/` and `/sign-in` are pages of their own (language detection, and keeping the query of confirmation emails).
  redirects: {
    ...unprefixedPages,
    '/ingresar': '/sign-in',
    '/perfil': '/es/profile',
    '/progreso': '/es/profile',
    '/juegos': '/es/games',
    '/juegos/cumulo-city': '/es/games/cumulo-city',
    '/juegos/nimbus-city': '/es/games/cumulo-city',
    '/simulacro': '/es/practice-exam',
    '/teoria': '/es/theory',
    '/teoria/cloud-practitioner': '/es/theory/cloud-practitioner',
    ...oldTopicPages,
  },
  env: {
    schema: {
      // Optional: without them the site runs in guest mode (progress saved in this browser).
      PUBLIC_SUPABASE_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
      // Publishable key (sb_publishable_...) or legacy anon key. The client refuses secret and service_role keys.
      PUBLIC_SUPABASE_PUBLISHABLE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
