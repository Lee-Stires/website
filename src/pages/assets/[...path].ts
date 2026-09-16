import type { APIRoute } from 'astro';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const prerender = false;

const s3 = new S3Client({
  region: 'auto',
  endpoint: import.meta.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
  },
});

export const GET: APIRoute = async ({ params }) => {
  const key = params.path;
  if (!key) return new Response('Not found', { status: 404 });

  let object;
  try {
    object = await s3.send(
      new GetObjectCommand({
        Bucket: import.meta.env.R2_BUCKET_NAME,
        Key: key,
      }),
    );
  } catch (err) {
    const name = (err as { name?: string }).name;
    const status = (err as { $metadata?: { httpStatusCode?: number } })
      .$metadata?.httpStatusCode;
    if (name === 'NoSuchKey' || status === 404) {
      return new Response('Not found', { status: 404 });
    }
    throw err;
  }

  const body = await object.Body?.transformToWebStream();
  if (!body) return new Response('Not found', { status: 404 });

  const headers = new Headers({
    'Content-Type': object.ContentType ?? 'application/octet-stream',
    'Cache-Control': 'public, max-age=31536000, immutable',
  });
  if (object.ContentLength != null) {
    headers.set('Content-Length', String(object.ContentLength));
  }
  if (object.ETag) headers.set('ETag', object.ETag);

  return new Response(body, { headers });
};
