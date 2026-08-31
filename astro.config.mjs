// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ctgfederal.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
  // Externalize inline scripts so the CSP script-src can stay strict 'self'
  // (no 'unsafe-inline', no per-script hashes to maintain).
  vite: { build: { assetsInlineLimit: 0 } },
});
