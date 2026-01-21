export function getR2Url(path: string): string {
  const baseUrl = import.meta.env.PUBLIC_R2_URL as string;

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${baseUrl}/${cleanPath}`;
}
