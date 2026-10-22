// @ts-check
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  // The dev toolbar overlaps the full-screen game canvas.
  devToolbar: { enabled: false },
  env: {
    schema: {
      // Optional: without them the site runs in guest mode (progress saved in this browser).
      PUBLIC_SUPABASE_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
      // Publishable keys are safe in the browser; legacy JWT "anon" keys and secret keys are rejected.
      PUBLIC_SUPABASE_PUBLISHABLE_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        startsWith: 'sb_publishable_',
      }),
    },
  },
});
