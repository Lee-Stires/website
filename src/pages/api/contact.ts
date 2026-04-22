import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const ALLOWED_EMAILS = [
  'info@lee-stires.com',
  'estimating@lee-stires.com',
  'accounting@lee-stires.com',
];

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();
  const to = formData.get('to')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !to || !message) {
    return new Response('Missing required fields.', { status: 400 });
  }

  if (!ALLOWED_EMAILS.includes(to)) {
    return new Response('Invalid recipient.', { status: 400 });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Contact Form <server-noreply@phoenixtechlab.com>',
    to,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      ``,
      `Message:`,
      message,
    ]
      .filter(Boolean)
      .join('\n'),
  });

  return redirect('/contact/success');
};
