import type { APIRoute } from 'astro';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Resend } from 'resend';

export const prerender = false;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: APIRoute = async ({ request, redirect }) => {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response('Invalid form submission.', { status: 400 });
  }

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();
  const message = formData.get('message')?.toString().trim();
  const file = formData.get('application');

  if (!name || !email || !phone) {
    return new Response('Missing required fields.', { status: 400 });
  }

  let fileUrl: string | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.type !== 'application/pdf') {
      return new Response('Only PDF files are accepted.', { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return new Response('File exceeds the 5MB size limit.', { status: 400 });
    }

    const s3 = new S3Client({
      region: 'auto',
      endpoint: import.meta.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
      },
    });

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `applications/${timestamp}-${safeName}`;

    const buffer = await file.arrayBuffer();

    await s3.send(
      new PutObjectCommand({
        Bucket: import.meta.env.R2_BUCKET_NAME,
        Key: key,
        Body: new Uint8Array(buffer),
        ContentType: 'application/pdf',
      }),
    );

    fileUrl = `${import.meta.env.PUBLIC_R2_URL}/${key}`;
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Careers Form <server-noreply@phoenixtechlab.com>',
    to: 'info@lee-stires.com',
    replyTo: email,
    subject: `New Job Application from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      message ? `\nMessage:\n${message}` : null,
      fileUrl ? `\nResume/Application: ${fileUrl}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
  });

  return redirect('/careers/success');
};
