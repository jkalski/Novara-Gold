import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, err:"Method not allowed" });

  const data = req.body || {};
  const {
    formType = "contact",
    name = "",
    email = "",
    phone = "",
    subject = "",
    message = "",
  } = data;

  const smsConsent = Boolean(data.smsConsent ?? data.consent ?? false);

  // Decide type-specific labeling
  const isLead = formType === "lead";
  const title = isLead ? "Investor Kit Lead" : "Customer Contact";
  const prettySubject = title;

  // Plain text fallback
  const textLines = [
    `${title}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
  ];

  if (isLead) {
    textLines.push(`SMS Consent: ${smsConsent ? "Yes" : "No"}`);
  } else {
    textLines.push(
      subject ? `Subject: ${subject}` : "",
      "",
      "Message:",
      message || "(none)"
    );
  }

  const textBody = textLines.filter(Boolean).join("\n");

  // HTML body (slightly simplified version)
  const htmlRows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
  ];

  if (isLead) {
    htmlRows.push(["SMS Consent", smsConsent ? "Yes" : "No"]);
  } else {
    if (subject) htmlRows.push(["Subject", subject]);
  }

  const htmlBody = `
<!doctype html>
<html><head>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:20px;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:620px;margin:auto;background:#fff;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
    <tr><td style="padding:20px 24px;border-bottom:1px solid #eee;">
      <h2 style="margin:0;font-size:18px;color:#111827;">${title}</h2>
      <p style="margin:6px 0 0 0;font-size:12px;color:#6b7280;">Submitted via novaragold.com</p>
    </td></tr>
    <tr><td style="padding:16px 24px;">
      <table width="100%" style="border-collapse:collapse;font-size:14px;color:#111827;">
        ${htmlRows.map(([label, value]) => `
          <tr>
            <td style="padding:8px 0;width:140px;color:#6b7280;">${label}</td>
            <td style="padding:8px 0;">${value || "<span style='color:#9ca3af'>(none)</span>"}</td>
          </tr>`).join("")}
        ${isLead ? "" : `
          <tr><td colspan="2" style="padding-top:12px;">
            <div style="margin:0 0 6px 0;color:#6b7280;">Message</div>
            <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#fafafa;color:#111827;white-space:pre-wrap;line-height:1.5;">
              ${message ? String(message).replace(/[<>&]/g, s => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[s])) : "(none)"}
            </div>
          </td></tr>`}
      </table>
    </td></tr>
    <tr><td style="padding:12px 24px;background:#f9fafb;border-top:1px solid #eee;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">You can reply directly to this email to reach the sender.</p>
    </td></tr>
  </table>
</body></html>`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    const info = await transporter.sendMail({
      from: `Novara Gold <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      subject: prettySubject,
      replyTo: email || process.env.SMTP_USER,
      text: textBody,
      html: htmlBody,
    });
    return res.status(200).json({ ok:true, id:info?.messageId || null });
  } catch (e) {
    console.error("sendMail failed:", e?.message || e);
    return res.status(500).json({ ok:false, err:String(e?.message||e) });
  }
}
