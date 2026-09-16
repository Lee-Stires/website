export const R2_PROXY_PATH = '/api/image';

export function getR2Url(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${R2_PROXY_PATH}/${cleanPath}`;
}

const MIME_TYPES: Record<string, string> = {
  svg: 'image/svg+xml',
  avif: 'image/avif',
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
};

export function getR2ImageType(path: string): string | undefined {
  const clean = path.split(/[?#]/)[0];
  const ext = clean.slice(clean.lastIndexOf('.') + 1).toLowerCase();
  return MIME_TYPES[ext];
}
