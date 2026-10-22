// @ts-check
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  // The dev toolbar overlaps the full-screen game canvas.
  devToolbar: { enabled: false },
  // The progress page became part of the profile.
  redirects: { '/progreso': '/perfil' },
  env: {
    schema: {
      // Optional: without them the site runs in guest mode (progress saved in this browser).
      PUBLIC_SUPABASE_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
      // Publishable key (sb_publishable_...) or legacy anon key. The client refuses secret and service_role keys.
      PUBLIC_SUPABASE_PUBLISHABLE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
