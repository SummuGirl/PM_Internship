export interface SubmitRequestBody {
  visitorName: string;
  visitorAge: number | string;
  visitorLocation: string;
  visitorEmail: string;
  visitorGrievance: string;
  category?: string;
  assignedValkyrie?: string;
  requestId?: string;
  submittedAt?: string;
}

// Minimal sanitization against HTML injection in emails
function sanitize(input: unknown): string {
  if (typeof input !== 'string') return String(input ?? '');
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: any, res: any) {
  // Set CORS headers for security and flexibility
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST to submit help requests.'
    });
  }

  try {
    const body: SubmitRequestBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const rawName = (body.visitorName || '').trim();
    const rawAge = Number(body.visitorAge);
    const rawLocation = (body.visitorLocation || '').trim();
    const rawEmail = (body.visitorEmail || '').trim();
    const rawGrievance = (body.visitorGrievance || '').trim();
    const rawCategory = (body.category || 'General Emergency').trim();
    const rawAssigned = (body.assignedValkyrie || 'FREYA').trim();

    // 1. Validation
    if (!rawName) {
      return res.status(400).json({ success: false, error: 'Visitor name is required.' });
    }
    if (isNaN(rawAge) || rawAge < 1 || rawAge > 130) {
      return res.status(400).json({ success: false, error: 'A valid age between 1 and 130 is required.' });
    }
    if (!rawLocation) {
      return res.status(400).json({ success: false, error: 'Visitor location is required.' });
    }
    if (!rawEmail || !isValidEmail(rawEmail)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!rawGrievance) {
      return res.status(400).json({ success: false, error: 'Grievance / help description cannot be empty.' });
    }

    // 2. Generate or sanitize metadata
    const requestId = body.requestId && body.requestId.startsWith('#VALK-')
      ? body.requestId
      : `#VALK-${Math.floor(10000 + Math.random() * 90000)}`;

    const submittedAt = body.submittedAt || new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'medium'
    }) + ' UTC';

    const safeName = sanitize(rawName);
    const safeAge = String(rawAge);
    const safeLocation = sanitize(rawLocation);
    const safeEmail = sanitize(rawEmail);
    const safeGrievance = sanitize(rawGrievance);
    const safeCategory = sanitize(rawCategory);
    const safeAssigned = sanitize(rawAssigned);

    // 3. Check environment variables
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const candidateEmail = process.env.CANDIDATE_EMAIL?.trim();

    if (!resendApiKey || !candidateEmail) {
      console.error(
        '[Valkyrie API Error] Missing environment configuration. RESEND_API_KEY present:',
        Boolean(resendApiKey),
        '| CANDIDATE_EMAIL present:',
        Boolean(candidateEmail)
      );

      return res.status(500).json({
        success: false,
        error: 'The Valkyrie Network encountered a communication error. Please try again.',
        details: 'Server environment variable RESEND_API_KEY or CANDIDATE_EMAIL is not configured.'
      });
    }

    // 4. Build professional Gold + White + Charcoal HTML email template
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Valkyrie Network Help Request</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #F8F6F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E2229;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E6D5B8; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(184, 134, 11, 0.08);">
    <!-- Golden Accent Top Bar -->
    <tr>
      <td height="6" style="background: linear-gradient(90deg, #D4AF37 0%, #F5E6A8 50%, #B8860B 100%);"></td>
    </tr>

    <!-- Header Section -->
    <tr>
      <td style="padding: 32px 32px 24px; text-align: center; background-color: #FCFAF6; border-bottom: 1px solid #F0E6D6;">
        <div style="display: inline-block; padding: 4px 14px; background-color: #FFF9E6; border: 1px solid #D4AF37; border-radius: 999px; color: #996515; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
          ✦ VALKYRIE NETWORK INTAKE
        </div>
        <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #14171F; letter-spacing: 1px;">
          NEW HELP REQUEST
        </h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #8C7853; font-style: italic;">
          “When mortals call, the Valkyries answer.”
        </p>
      </td>
    </tr>

    <!-- Assignment Banner -->
    <tr>
      <td style="padding: 20px 32px; background-color: #FBF7EE; border-bottom: 1px solid #F0E6D6;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #8C7853;">
                Assigned Guardian
              </span>
              <div style="font-size: 18px; font-weight: 800; color: #B8860B; margin-top: 2px;">
                ⚡ ${safeAssigned}
              </div>
            </td>
            <td align="right">
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #8C7853;">
                Request Identifier
              </span>
              <div style="font-size: 16px; font-weight: 700; font-family: monospace; color: #14171F; margin-top: 2px;">
                ${requestId}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Visitor Information -->
    <tr>
      <td style="padding: 28px 32px;">
        <h2 style="margin: 0 0 16px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #736B5E; border-bottom: 2px solid #F0E6D6; padding-bottom: 6px;">
          Visitor Information
        </h2>

        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #F5EFE6;">
            <td width="35%" style="color: #736B5E; font-weight: 600;">Full Name:</td>
            <td style="color: #14171F; font-weight: 700;">${safeName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F5EFE6;">
            <td style="color: #736B5E; font-weight: 600;">Age:</td>
            <td style="color: #14171F;">${safeAge}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F5EFE6;">
            <td style="color: #736B5E; font-weight: 600;">Location:</td>
            <td style="color: #14171F;">📍 ${safeLocation}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F5EFE6;">
            <td style="color: #736B5E; font-weight: 600;">Email:</td>
            <td style="color: #14171F;"><a href="mailto:${safeEmail}" style="color: #B8860B; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #F5EFE6;">
            <td style="color: #736B5E; font-weight: 600;">Category:</td>
            <td style="color: #14171F;"><span style="display: inline-block; padding: 2px 8px; background-color: #F5EFE6; border-radius: 4px; font-size: 12px; font-weight: 600;">${safeCategory}</span></td>
          </tr>
          <tr>
            <td style="color: #736B5E; font-weight: 600;">Submitted:</td>
            <td style="color: #736B5E; font-size: 13px;">${submittedAt}</td>
          </tr>
        </table>

        <!-- Grievance / Problem Box -->
        <div style="margin-top: 24px;">
          <h2 style="margin: 0 0 10px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #736B5E;">
            Citizen Grievance & Request
          </h2>
          <div style="background-color: #FCFAF6; border: 1px solid #E6D5B8; border-left: 4px solid #D4AF37; border-radius: 8px; padding: 18px; color: #1E2229; font-size: 15px; line-height: 1.6; font-style: normal;">
            ${safeGrievance}
          </div>
        </div>
      </td>
    </tr>

    <!-- Footer Note -->
    <tr>
      <td style="padding: 20px 32px 28px; background-color: #FAF7F0; border-top: 1px solid #F0E6D6; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #8C7853; line-height: 1.5;">
          This transmission was generated by the <strong>VALKYRIE Network</strong> intake interface.<br>
          <em>Fictional superhero demonstration for candidate portfolio / internship evaluation.</em>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // 5. Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Valkyrie Network <onboarding@resend.dev>',
        to: [candidateEmail],
        reply_to: rawEmail,
        subject: `🦸 Someone Needs Your Help — Valkyrie Network [${requestId}]`,
        html: emailHtml
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('[Resend Error]', resendResponse.status, resendData);
      return res.status(502).json({
        success: false,
        error: 'The Valkyrie Network encountered a communication error. Please try again.',
        details: resendData?.message || 'Error communicating with email dispatch provider.'
      });
    }

    return res.status(200).json({
      success: true,
      requestId,
      submittedAt,
      message: 'Request received and Valkyrie alert dispatched successfully.',
      resendId: resendData.id
    });
  } catch (error: any) {
    console.error('[Valkyrie API Exception]', error);
    return res.status(500).json({
      success: false,
      error: 'The Valkyrie Network encountered a communication error. Please try again.',
      details: error?.message || 'Internal server error.'
    });
  }
}
