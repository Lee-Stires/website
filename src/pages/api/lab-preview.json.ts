// Lab CMS visual editor — powers live preview in the Lab admin.
import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import BlockRenderer from '@/blocks/BlockRenderer.astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const blocks = Array.isArray(body) ? body : [body];

  const container = await AstroContainer.create();
  const html = await container.renderToString(BlockRenderer, {
    props: { blocks },
  });

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
};
