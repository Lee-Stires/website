import galleryData from './gallery.json';

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface GallerySeries {
  id: string;
  name: string;
  photos: GalleryPhoto[];
}

export interface GalleryData {
  seo: { title: string; description: string };
  series: GallerySeries[];
}

/**
 * Returns gallery content. Swap this implementation to read from a CMS
 * (e.g. content/ folder, Decap, Tina) without changing the page or components.
 */
export function getGalleryData(): GalleryData {
  return galleryData as GalleryData;
}
