/**
 * Netlify event function — fires automatically on every verified Netlify Forms
 * submission (the "submission-created" event). It routes the notification email
 * to a different inbox based on the contact form's "department" dropdown.
 *
 * Addresses come from the "NOTIFICATION CTG FEDERAL" column of the routing sheet.
 *
 * Requires two environment variables set in the Netlify UI:
 *   RESEND_API_KEY   API key from resend.com
 *   FROM_EMAIL       verified sender, e.g. "CTG Federal <website@ctgfederal.com>"
 */

// Dropdown label -> destination inbox. Keep labels identical to ContactForm.astro.
const DEPARTMENT_ROUTES = {
  'U.S. Federal Sales': 'contact@ctgfederal.com',
  Engineering: 'architects@ctgfederal.com',
  Marketing: 'marketing@ctgfederal.com',
  'Contracts & Human Resources': 'contracts@ctgfederal.com',
  'Partnerships & Alliances': 'channel@ctgfederal.com',
  Operations: 'operations@ctgfederal.com',
  'Customer Nurture': 'nurture@ctgfederal.com',
  'For all other inquiries': 'contact@ctgfederal.com',
};

// Used when there is no department field or the value is unrecognized.
const FALLBACK_INBOX = 'contact@ctgfederal.com';

export default async (req) => {
  const body = await req.json();
  const submission = body?.payload ?? {};
  const data = submission.data ?? {};

  const department = (data.department || '').trim();
  const to = DEPARTMENT_ROUTES[department] || FALLBACK_INBOX;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Missing RESEND_API_KEY or FROM_EMAIL environment variable.');
    return new Response('Email service not configured', { status: 500 });
  }

  const formName = submission.form_name || 'contact';
  const subjectDept = department || 'General';
  const subject = `[${subjectDept}] New ${formName} form submission`;

  // Build a readable body from every submitted field, in a stable order.
  const lines = Object.entries(data)
    .filter(([key]) => key !== 'bot-field' && key !== 'form-name')
    .map(([key, value]) => `${label(key)}: ${value}`);
  const text = lines.join('\n');

  const html = `<h2>New ${escapeHtml(formName)} submission</h2>
<p><strong>Routed to:</strong> ${escapeHtml(subjectDept)} (${escapeHtml(to)})</p>
<table cellpadding="6" style="border-collapse:collapse">
${lines.map((l) => `<tr><td style="border:1px solid #ddd">${escapeHtml(l)}</td></tr>`).join('\n')}
</table>`;

  const payload = {
    from,
    to: [to],
    subject,
    text,
    html,
  };
  // Let the recipient hit Reply and reach the person who filled out the form.
  if (data.email) payload.reply_to = data.email;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error(`Resend send failed (${res.status}): ${detail}`);
    return new Response('Send failed', { status: 502 });
  }

  console.log(`Routed "${formName}" submission (${subjectDept}) to ${to}`);
  return new Response('OK', { status: 200 });
};

function label(key) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
