/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
    // The on-disk module cache keeps old import.meta.glob results, so new mission files would go unnoticed.
    fsModuleCache: false,
  },
});
