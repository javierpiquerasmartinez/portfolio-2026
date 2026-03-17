import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const TO_EMAIL = 'javierpiquerasmartinez@gmail.com';
// Change FROM_EMAIL to your verified domain once set up in Resend dashboard
const FROM_EMAIL = 'Portfolio <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_body' }), { status: 400, headers });
  }

  const { name, email, message } = data;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), { status: 400, headers });
  }

  if (!EMAIL_RE.test(email.trim())) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_email' }), { status: 400, headers });
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `Portfolio contact — ${name.trim()}`,
    text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    replyTo: email.trim(),
  });

  if (error) {
    console.error('Resend error:', error);
    return new Response(JSON.stringify({ ok: false, error: 'send_failed' }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
