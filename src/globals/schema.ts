import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const headerSchema = z
  .object({
    navLinks: z.array(linkSchema),
  })
  .meta({ title: 'Header', description: 'Site-wide navigation links' });

const footerSchema = z
  .object({
    tagline: z.string(),
    licenses: z.array(z.object({ text: z.string() })),
    copyright: z
      .string()
      .meta({ description: 'The current year is added automatically' }),
    legalLinks: z.array(linkSchema),
  })
  .meta({ title: 'Footer', description: 'Site-wide footer content' });

export const globalsSchema = z.object({
  header: headerSchema,
  footer: footerSchema,
});

export type Header = z.infer<typeof headerSchema>;
export type Footer = z.infer<typeof footerSchema>;
