/**
 * Jev Automated Website Review & Error Notification Runner
 * Powered by TypeSafe AI (@typesafe-ai/sdk)
 */

import { TypeSafeClient } from '@typesafe-ai/sdk';

const BASE_URL = process.env.BASE_URL || 'https://unitecusadesign.com';
const TYPESAFE_API_KEY = process.env.TYPESAFE_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'lidermercadeo@espaciosimportados.com.co';
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const ROUTES = [
  '/',
  '/colecciones/',
  '/colecciones/exterior/',
  '/colecciones/interior/',
  '/productos/14121301/',
  '/nosotros/historia/',
  '/contacto/',
  '/politicas/',
  '/sitemap.xml',
  '/robots.txt'
];

async function inspectRoute(client, route) {
  const targetUrl = `${BASE_URL.replace(/\/$/, '')}${route}`;
  const startTime = Date.now();
  let status = 0;
  let html = '';
  let errorMsg = null;

  try {
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'JevHealthBot/1.0 (+https://typesafe.ai)' },
      signal: AbortSignal.timeout(15000)
    });
    status = res.status;
    html = await res.text();
  } catch (err) {
    errorMsg = err.message;
  }

  const loadTimeMs = Date.now() - startTime;
  const hasServerErrorKeywords = /500 Internal Server|TypeError|Unhandled Runtime|ReferenceError/i.test(html);

  // If TypeSafe Jev API Key is available, use Jev System-1 model for classification
  let decision = {
    is_operational: status >= 200 && status < 400 && !hasServerErrorKeywords,
    severity: (status >= 500 || hasServerErrorKeywords) ? 'critical' : (status >= 400 ? 'medium' : 'none'),
    should_alert: status >= 500 || hasServerErrorKeywords || Boolean(errorMsg),
    confidence: 0.95
  };

  if (client && TYPESAFE_API_KEY) {
    try {
      const jevResult = await client.decide({
        model: 'jev-1',
        state: {
          url: targetUrl,
          httpStatus: status,
          loadTimeMs,
          hasErrorMessage: Boolean(errorMsg),
          errorDetails: errorMsg,
          htmlLength: html.length,
          hasHtmlTag: html.includes('<html'),
          hasServerErrorKeywords
        },
        questions: {
          is_operational: { type: 'boolean', description: 'Is the page rendering normally without critical defects?' },
          severity: { type: 'choice', options: ['none', 'low', 'medium', 'critical'] },
          should_alert: { type: 'boolean', description: 'Should this trigger an urgent notification to the engineering team?' }
        }
      });
      decision = { ...decision, ...jevResult };
    } catch (apiErr) {
      console.warn(`[Jev API Warning] Failed remote inference for ${targetUrl}:`, apiErr.message);
    }
  }

  return {
    url: targetUrl,
    route,
    status,
    loadTimeMs,
    errorMsg,
    decision
  };
}

async function sendNotification(alertReport) {
  console.error('\n🚨 [DISPATCHING JEV ERROR ALERT]');
  console.error(JSON.stringify(alertReport, null, 2));

  // 1. Email via Resend
  if (RESEND_API_KEY && NOTIFICATION_EMAIL) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Jev Error Monitor <onboarding@resend.dev>',
          to: [NOTIFICATION_EMAIL],
          subject: `🚨 [Jev Alert] Website Error Detected on ${alertReport.url}`,
          html: `
            <h2>Jev Automated Quality Monitor Alert</h2>
            <p><strong>URL:</strong> <a href="${alertReport.url}">${alertReport.url}</a></p>
            <p><strong>HTTP Status:</strong> ${alertReport.status}</p>
            <p><strong>Latency:</strong> ${alertReport.loadTimeMs} ms</p>
            <p><strong>Severity:</strong> <span style="color:red;font-weight:bold;">${alertReport.decision.severity}</span></p>
            <p><strong>Error Details:</strong> ${alertReport.errorMsg || 'Server returned invalid response / 500 error.'}</p>
          `
        })
      });
      if (res.ok) console.log('✅ Email notification dispatched via Resend.');
    } catch (e) {
      console.error('❌ Failed to dispatch email alert:', e.message);
    }
  }

  // 2. Slack Webhook (if configured)
  if (SLACK_WEBHOOK_URL) {
    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 *[Jev Monitor Alert]* Error detected on \`${alertReport.url}\` (Status: ${alertReport.status}, Severity: ${alertReport.decision.severity})`
        })
      });
      console.log('✅ Slack webhook alert dispatched.');
    } catch (e) {
      console.error('❌ Failed to dispatch Slack alert:', e.message);
    }
  }
}

async function run() {
  console.log(`🔍 [Jev Health Monitor] Auditing ${BASE_URL}...`);
  if (!TYPESAFE_API_KEY) {
    console.log('ℹ️  Note: TYPESAFE_API_KEY not detected. Running in heuristic fallback mode.');
  }

  const client = TYPESAFE_API_KEY ? new TypeSafeClient({ apiKey: TYPESAFE_API_KEY }) : null;
  const results = [];
  let errorCount = 0;

  for (const route of ROUTES) {
    const res = await inspectRoute(client, route);
    results.push(res);

    const mark = res.decision.is_operational ? '✅' : '❌';
    console.log(`${mark} [${res.status}] ${res.url} (${res.loadTimeMs}ms) - Severity: ${res.decision.severity}`);

    if (res.decision.should_alert) {
      errorCount++;
      await sendNotification(res);
    }
  }

  console.log('\n--- Jev Audit Summary ---');
  console.log(`Routes Audited: ${results.length}`);
  console.log(`Errors Found: ${errorCount}`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

run();
