import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'valkyrie-api-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/submit-request', async (req, res, next) => {
            if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
              res.statusCode = 200;
              res.end();
              return;
            }

            if (req.method !== 'POST') {
              next();
              return;
            }

            // Read request body
            let bodyStr = '';
            req.on('data', chunk => {
              bodyStr += chunk;
            });

            req.on('end', async () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                const rawName = (body.visitorName || '').trim();
                const rawAge = Number(body.visitorAge);
                const rawLocation = (body.visitorLocation || '').trim();
                const rawEmail = (body.visitorEmail || '').trim();
                const rawGrievance = (body.visitorGrievance || '').trim();
                const rawCategory = (body.category || 'General Emergency').trim();
                const rawAssigned = (body.assignedValkyrie || 'FREYA').trim();

                res.setHeader('Content-Type', 'application/json');

                // Validation
                if (!rawName || isNaN(rawAge) || !rawLocation || !rawEmail || !rawGrievance) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({
                    success: false,
                    error: 'All fields (name, age, location, email, grievance) are required.'
                  }));
                  return;
                }

                const requestId = body.requestId || `#VALK-${Math.floor(10000 + Math.random() * 90000)}`;
                const submittedAt = body.submittedAt || new Date().toLocaleString('en-US', {
                  timeZone: 'UTC',
                  dateStyle: 'full',
                  timeStyle: 'medium'
                }) + ' UTC';

                const resendApiKey = (env.RESEND_API_KEY || process.env.RESEND_API_KEY)?.trim();
                const candidateEmail = (env.CANDIDATE_EMAIL || process.env.CANDIDATE_EMAIL)?.trim();

                if (!resendApiKey || !candidateEmail) {
                  console.warn('[Vite Dev Valkyrie API] RESEND_API_KEY or CANDIDATE_EMAIL not set in .env.local.');
                  res.statusCode = 500;
                  res.end(JSON.stringify({
                    success: false,
                    error: 'The Valkyrie Network encountered a communication error. Please try again.',
                    details: 'Server environment variable RESEND_API_KEY or CANDIDATE_EMAIL is not configured in .env.local'
                  }));
                  return;
                }

                // Send via Resend API
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
                    html: `
                      <div style="font-family: sans-serif; padding: 20px; background: #FAF8F5; color: #1E2229; border-radius: 10px; border: 1px solid #D4AF37;">
                        <h2 style="color: #B8860B; margin-top: 0;">VALKYRIE NETWORK — NEW HELP REQUEST</h2>
                        <p><strong>Assigned Guardian:</strong> ${rawAssigned} | <strong>Request ID:</strong> ${requestId}</p>
                        <hr style="border: 0; border-top: 1px solid #E6D5B8;" />
                        <p><strong>Visitor:</strong> ${rawName} (${rawAge} yrs)</p>
                        <p><strong>Location:</strong> ${rawLocation}</p>
                        <p><strong>Email:</strong> ${rawEmail}</p>
                        <p><strong>Category:</strong> ${rawCategory}</p>
                        <p><strong>Submitted:</strong> ${submittedAt}</p>
                        <div style="background: #FFF; padding: 15px; border-left: 4px solid #D4AF37; margin-top: 15px;">
                          <strong>Request:</strong><br>${rawGrievance}
                        </div>
                      </div>
                    `
                  })
                });

                const resendData = await resendResponse.json();

                if (!resendResponse.ok) {
                  console.error('[Resend Error]', resendData);
                  res.statusCode = 502;
                  res.end(JSON.stringify({
                    success: false,
                    error: 'The Valkyrie Network encountered a communication error. Please try again.',
                    details: resendData?.message || 'Error communicating with email dispatch provider.'
                  }));
                  return;
                }

                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  requestId,
                  submittedAt,
                  message: 'Request received and Valkyrie alert dispatched successfully.',
                  resendId: resendData.id
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({
                  success: false,
                  error: 'The Valkyrie Network encountered a communication error. Please try again.',
                  details: err?.message || 'Internal dev server error'
                }));
              }
            });
          });
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  };
});
