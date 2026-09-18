// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV must be set');
}

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

const r2Domain = new URL(env.PUBLIC_R2_URL).hostname;

const SITE = 'https://lee-stires.com';

// Pages render through a single dynamic catch-all route ([...slug].astro),
// so @astrojs/sitemap's automatic route discovery can only ever see the
// static "/" route — list every non-excluded page's URL explicitly instead.
/** @returns {string[]} */
function sitemapPages() {
  const pagesDir = fileURLToPath(
    new URL('./src/content/pages', import.meta.url),
  );
  const pages = [];
  for (const file of readdirSync(pagesDir)) {
    if (!file.endsWith('.json')) continue;
    const data = JSON.parse(
      readFileSync(new URL(file, `file://${pagesDir}/`), 'utf-8'),
    );
    if (data.excludeFromSitemap) continue;
    const path = data.slug === 'index' ? '' : data.slug;
    pages.push(new URL(path, SITE).href);
  }
  return pages;
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: SITE,
  integrations: [sitemap({ customPages: sitemapPages() })],

  image: {
    domains: [r2Domain],
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
