/**
 * SEDECIA Contact Form — Cloudflare Worker
 * Receives form data from the website and sends it to info@sedecia.com via Resend.
 *
 * Deploy:  npx wrangler deploy
 * Secret:  npx wrangler secret put RESEND_API_KEY
 */

const ALLOWED_ORIGIN = 'https://sedecia.com';

const cors = (origin) => ({
  'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  });
}

function sanitize(str = '') {
  return String(str).trim().slice(0, 2000);
}

function buildHtml({ name, email, company, service, message }) {
  const row = (label, value) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-weight:600;color:#4a5568;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:10px 16px;color:#1a202c;">${value}</td>
         </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New SEDECIA Inquiry</title></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f7fafc;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#e85d04 100%);padding:32px 40px;">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:.5px;">
        📬 New Contact Form Submission
      </h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,.75);font-size:14px;">
        Someone reached out through sedecia.com
      </p>
    </div>

    <!-- Body -->
    <div style="padding:32px 40px;">
      <table style="border-collapse:collapse;width:100%;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        ${row('Name', sanitize(name))}
        ${row('Email', `<a href="mailto:${sanitize(email)}" style="color:#e85d04;">${sanitize(email)}</a>`)}
        ${row('Company', sanitize(company))}
        ${row('Interested In', sanitize(service))}
        ${row('Message', sanitize(message).replace(/\n/g, '<br>'))}
      </table>

      <div style="margin-top:28px;padding:16px 20px;background:#fff7ed;border-left:4px solid #e85d04;border-radius:4px;">
        <p style="margin:0;color:#7c4a03;font-size:13px;">
          💡 <strong>Tip:</strong> Hit <em>Reply</em> in your email client — the reply-to is already set to
          <strong>${sanitize(email)}</strong> so your response goes straight back to ${sanitize(name)}.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:20px 40px;background:#f7fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#a0aec0;text-align:center;">
        SEDECIA · Harar, Ethiopia · <a href="https://sedecia.com" style="color:#e85d04;">sedecia.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Pre-flight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, origin);
    }

    const { name, email, company, service, message } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return json({ error: 'Name, email, and message are required.' }, 400, origin);
    }

    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email address.' }, 400, origin);
    }

    // Send via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SEDECIA Website <noreply@sedecia.com>',
        to: ['info@sedecia.com'],
        reply_to: email.trim(),
        subject: `New Inquiry${service ? ` — ${service}` : ''} from ${name.trim()}`,
        html: buildHtml({ name, email, company, service, message }),
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          service ? `Service: ${service}` : null,
          `\nMessage:\n${message}`,
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error('Resend error:', err);
      return json({ error: 'Failed to send email. Please try again.' }, 502, origin);
    }

    return json({ success: true }, 200, origin);
  },
};
