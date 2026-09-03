import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { blockSchema } from '@/blocks/schema';

const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    blocks: z.array(blockSchema),
  }),
});

export const collections = { pages };
