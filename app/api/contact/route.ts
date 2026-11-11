import { NextResponse } from 'next/server';

/* ===========================================================================
 * Contact endpoint.
 *
 * Zero-config by design: with no email provider configured it returns 501,
 * and the client falls back to opening the visitor's mail app with the
 * message pre-filled. Set RESEND_API_KEY + CONTACT_TO_EMAIL (see .env.example)
 * to have submissions delivered straight to the inbox instead.
 * =========================================================================== */

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
};

const asText = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c,
  );

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn anything.
  if (asText(body.company, 80)) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const email = asText(body.email, 180);
  const subject = asText(body.subject, 200);
  const message = asText(body.message, 5000);

  if (!name || !email || !subject || message.length < 10 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please complete every field with valid details.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // Not configured — tell the client to use the mailto fallback.
    return NextResponse.json(
      {
        ok: false,
        fallback: 'mailto',
        error:
          'Email delivery is not configured on this deployment. Set RESEND_API_KEY and CONTACT_TO_EMAIL to enable it.',
      },
      { status: 501 },
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <h2 style="font-family:system-ui,sans-serif">New portfolio message</h2>
          <p style="font-family:system-ui,sans-serif"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <p style="font-family:system-ui,sans-serif"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr />
          <p style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
        `,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend rejected the message:', res.status, detail);
      return NextResponse.json(
        { ok: false, error: 'The email provider rejected the message.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form delivery failed:', err);
    return NextResponse.json(
      { ok: false, error: 'Unexpected error while sending the message.' },
      { status: 500 },
    );
  }
}
