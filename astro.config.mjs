// @ts-check
import { defineConfig, envField } from 'astro/config';
import legacy from './src/infrastructure/legacyTopicSlugs.json' with { type: 'json' };

// Old theory topic URLs, from before the courses page and the English slugs.
const oldTopicPages = Object.fromEntries(
  Object.entries(legacy.topics).flatMap(([oldSlug, slug]) => [
    [`/teoria/${oldSlug}`, `/theory/cloud-practitioner/${slug}`],
    [`/teoria/cloud-practitioner/${oldSlug}`, `/theory/cloud-practitioner/${slug}`],
  ]),
);

export default defineConfig({
  // The dev toolbar overlaps the full-screen game canvas.
  devToolbar: { enabled: false },
  // Routes were Spanish, the progress page became part of the profile and the game was renamed from Nimbus City.
  redirects: {
    '/ingresar': '/sign-in',
    '/perfil': '/profile',
    '/progreso': '/profile',
    '/juegos': '/games',
    '/juegos/cumulo-city': '/games/cumulo-city',
    '/juegos/nimbus-city': '/games/cumulo-city',
    '/simulacro': '/practice-exam',
    '/teoria': '/theory',
    '/teoria/cloud-practitioner': '/theory/cloud-practitioner',
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
