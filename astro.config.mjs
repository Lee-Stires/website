// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import svelte from '@astrojs/svelte';

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV must be set');
}

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

const r2Domain = new URL(env.PUBLIC_R2_URL).hostname;

// https://astro.build/config
export default defineConfig({
  site: 'https://lee-stires.com',

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

  integrations: [svelte()],
});
