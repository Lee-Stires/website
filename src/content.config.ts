import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

import { blockSchema } from '@/blocks/schema';

const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogType: z.enum(['website', 'article']).optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().optional(),
    excludeFromSitemap: z.boolean().optional(),
    includeStructuredData: z.boolean().optional(),
    blocks: z.array(blockSchema),
  }),
});

export const collections = { pages };
