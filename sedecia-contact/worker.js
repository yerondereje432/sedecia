/**
 * SEDECIA Contact Form — Cloudflare Worker
 * Receives form data from the website and sends it to info@sedecia.com via Resend.
 * Also sends a welcome email to the client from yeron.dereje@sedecia.com.
 */

const cors = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

function sanitize(str = '') {
  return String(str).trim().slice(0, 2000);
}

function buildInternalHtml({ name, email, company, service, message }) {
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
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#e85d04 100%);padding:32px 40px;">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">📬 New Contact Form Submission</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,.75);font-size:14px;">Someone reached out through sedecia.com</p>
    </div>
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
          💡 <strong>Tip:</strong> Hit <em>Reply</em> — the reply-to is set to <strong>${sanitize(email)}</strong> so your response goes straight back to ${sanitize(name)}.
        </p>
      </div>
    </div>
    <div style="padding:20px 40px;background:#f7fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#a0aec0;text-align:center;">
        SEDECIA · Harar, Ethiopia · <a href="https://sedecia.com" style="color:#e85d04;">sedecia.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildWelcomeHtml({ name }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Welcome to SEDECIA</title></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f7fafc;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#e85d04 100%);padding:40px;">
      <img src="https://sedecia.com/logo.png" alt="SEDECIA" style="height:36px;margin-bottom:20px;" />
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">Welcome to SEDECIA 👋</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.75);font-size:15px;">We received your message and we're on it.</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <p style="margin:0 0 16px;font-size:16px;color:#1a202c;">Hey ${sanitize(name)},</p>

      <p style="margin:0 0 16px;font-size:15px;color:#4a5568;line-height:1.7;">
        My name is Yeron Dereje — I'm the founder of SEDECIA. Thanks for reaching out.
        You will get in touch with SEDECIA's consultants shortly.
      </p>

      <p style="margin:0 0 24px;font-size:15px;color:#4a5568;line-height:1.7;">
        In the meantime, here are a few things you can explore:
      </p>

      <!-- Tips -->
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:14px 16px;background:#f7fafc;border-radius:8px;margin-bottom:10px;display:block;">
            <span style="font-size:20px;">🤖</span>
            <strong style="display:block;color:#1a202c;margin:4px 0 2px;">Our AI Solutions</strong>
            <a href="https://sedecia.com/services" style="color:#e85d04;font-size:13px;">Explore what we build →</a>
          </td>
        </tr>
        <tr><td style="height:10px;"></td></tr>
        <tr>
          <td style="padding:14px 16px;background:#f7fafc;border-radius:8px;display:block;">
            <span style="font-size:20px;">💼</span>
            <strong style="display:block;color:#1a202c;margin:4px 0 2px;">Our Portfolio</strong>
            <a href="https://sedecia.com/portfolio" style="color:#e85d04;font-size:13px;">See our work →</a>
          </td>
        </tr>
        <tr><td style="height:10px;"></td></tr>
        <tr>
          <td style="padding:14px 16px;background:#f7fafc;border-radius:8px;display:block;">
            <span style="font-size:20px;">📖</span>
            <strong style="display:block;color:#1a202c;margin:4px 0 2px;">Our Blog</strong>
            <a href="https://sedecia.com/blog" style="color:#e85d04;font-size:13px;">Read our insights →</a>
          </td>
        </tr>
      </table>

      <p style="margin:32px 0 0;font-size:15px;color:#4a5568;line-height:1.7;">
        Looking forward to working with you.
      </p>
      <p style="margin:8px 0 0;font-size:15px;color:#1a202c;font-weight:600;">— Yeron Dereje</p>
      <p style="margin:2px 0 0;font-size:13px;color:#a0aec0;">Founder & CEO, SEDECIA</p>
    </div>

    <!-- Footer -->
    <div style="padding:24px 40px;background:#f7fafc;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;color:#a0aec0;">SEDECIA · Harar, Ethiopia</p>
      <a href="https://sedecia.com" style="color:#e85d04;font-size:12px;text-decoration:none;">sedecia.com</a>
    </div>
  </div>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors() });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400);
    }

    const { name, email, company, service, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return json({ error: 'Name, email, and message are required.' }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email address.' }, 400);
    }

    // Send internal notification to info@sedecia.com
    const internalRes = await fetch('https://api.resend.com/emails', {
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
        html: buildInternalHtml({ name, email, company, service, message }),
      }),
    });

    if (!internalRes.ok) {
      const err = await internalRes.text();
      console.error('Resend internal error:', err);
      return json({ error: 'Failed to send email. Please try again.' }, 502);
    }

    // Send welcome email to the client
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Yeron Dereje at SEDECIA <yeron.dereje@sedecia.com>',
        to: [email.trim()],
        subject: `Welcome to SEDECIA, ${name.trim().split(' ')[0]}!`,
        html: buildWelcomeHtml({ name }),
      }),
    });

    return json({ success: true }, 200);
  },
};