import { z } from 'astro/zod';

/**
 * One Zod object per block `_type`. To add a block:
 *   1. Define its object here.
 *   2. Add it to the `blockSchema` discriminated union array below.
 *   3. Register the component in `registry.ts`.
 * Nothing else should touch the `blockSchema` array.
 */

const heroBlock = z.object({
  _type: z.literal('hero'),
  image: z.string(),
  imageAlt: z.string(),
});

const textBlock = z.object({
  _type: z.literal('text'),
  // One or more paragraphs. Separate paragraphs with a blank line.
  body: z.string(),
  // Optional link shown at the end of the last paragraph.
  link: z
    .object({
      text: z.string(),
      href: z.string(),
    })
    .optional(),
});

const imageGroupBlock = z.object({
  _type: z.literal('imageGroup'),
  images: z.array(
    z.object({
      image: z.string(),
      alt: z.string(),
    }),
  ),
});

const servicesBlock = z.object({
  _type: z.literal('services'),
  services: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
      imageAlt: z.string(),
    }),
  ),
});

const listBlock = z.object({
  _type: z.literal('list'),
  title: z.string(),
  description: z.string(),
  items: z.array(z.string()),
});

const galleryBlock = z.object({
  _type: z.literal('gallery'),
  series: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      photos: z.array(
        z.object({
          image: z.string(),
          alt: z.string(),
        }),
      ),
    }),
  ),
});

const contactBlock = z.object({
  _type: z.literal('contact'),
  heading: z.string(),
  address: z.string(),
  phone: z.string(),
  fax: z.string(),
  emails: z.array(
    z.object({
      name: z.string(),
      email: z.string(),
    }),
  ),
});

const careersBlock = z.object({
  _type: z.literal('careers'),
  heading: z.string(),
  positions: z.array(z.string()),
  applicationFile: z.string(),
});

export const blockSchema = z.discriminatedUnion('_type', [
  heroBlock,
  textBlock,
  imageGroupBlock,
  servicesBlock,
  listBlock,
  galleryBlock,
  contactBlock,
  careersBlock,
]);

export type Block = z.infer<typeof blockSchema>;
