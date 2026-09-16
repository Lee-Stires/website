const UUID =
  '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';
const RENDITION_RE = new RegExp(
  `^(?:https?://[^/]+)?(?<base>/media/${UUID}/[a-z0-9]+/[a-z0-9]+)/\\d+\\.(?:avif|webp|jpg)(?:[?#].*)?$`,
  'i',
);

export interface ParsedRendition {
  /** Path from `/media/{id}` up to and including `{variant}` — no domain, no trailing slash. */
  base: string;
}

export function parseRendition(url: string): ParsedRendition | null {
  const base = RENDITION_RE.exec(url)?.groups?.base;
  return base ? { base } : null;
}

export function renditionSrcset(
  base: string,
  widths: number[],
  ext: string,
): string {
  return [...new Set(widths)]
    .sort((a, b) => a - b)
    .map((w) => `${base}/${w}.${ext} ${w}w`)
    .join(', ');
}
