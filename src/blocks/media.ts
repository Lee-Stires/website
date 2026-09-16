import { computeWidths } from '@/lib/rendition-widths';

export const HERO_IMAGE = {
  format: 'image',
  aspectRatio: '157/75',
  sizes:
    '(min-width: 1536px) 1472px, (min-width: 1024px) 960px, calc(100vw - 2rem)',
  widths: computeWidths({
    renderedWidths: [592, 960, 1472],
    dprSteps: [1, 2],
    maxWidth: 3000,
  }),
} as const;

export const SERVICES_IMAGE = {
  format: 'image',
  aspectRatio: '24/13',
  sizes: '(min-width: 360px) 360px, 100vw',
  widths: computeWidths({ renderedWidths: [360], dprSteps: [1, 2, 3] }),
} as const;

export const IMAGE_GROUP_IMAGE = {
  format: 'image',
  aspectRatio: '523/243',
  sizes:
    '(min-width: 1024px) 320px, (min-width: 640px) 490px, min(calc(100vw - 2rem), 490px)',
  widths: computeWidths({ renderedWidths: [320, 490], dprSteps: [1, 2] }),
} as const;

// The largest width also backs the JS-driven lightbox full view (Gallery.astro),
// which requests it directly rather than through a computed `sizes` breakpoint.
export const GALLERY_IMAGE = {
  format: 'image',
  aspectRatio: '1/1',
  sizes: '(min-width: 1024px) 470px, (min-width: 640px) 300px, 100vw',
  widths: [
    ...computeWidths({ renderedWidths: [300, 470], dprSteps: [1, 2] }),
    1600,
  ].sort((a, b) => a - b),
} as const;
