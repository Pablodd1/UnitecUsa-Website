/**
 * Jev Automated Website Review & Error Notification Runner
 * Powered by TypeSafe AI Jev System-1 Model (@typesafe-ai/sdk)
 */

import fs from 'fs';
import path from 'path';
import { TypeSafeClient, noul, choice } from '@typesafe-ai/sdk';

// Automatically load .env.local or .env if present
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').trim().replace(/^["']|["']$/g, '');
      if (key && val && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

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

  let decision = {
    is_operational: status >= 200 && status < 400 && !hasServerErrorKeywords,
    severity: (status >= 500 || hasServerErrorKeywords) ? 'critical' : (status >= 400 ? 'medium' : 'none'),
    should_alert: status >= 500 || hasServerErrorKeywords || Boolean(errorMsg),
    confidence: 1.0,
    model: 'heuristic-fallback'
  };

  if (client && TYPESAFE_API_KEY) {
    try {
      const response = await client.systemOne({
        state: {
          url: targetUrl,
          httpStatus: status,
          loadTimeMs,
          hasErrorMessage: Boolean(errorMsg),
          errorDetails: errorMsg || 'None',
          htmlLength: html.length,
          hasHtmlTag: html.includes('<html') || targetUrl.endsWith('.xml') || targetUrl.endsWith('.txt'),
          hasServerErrorKeywords
        },
        questions: {
          is_operational: noul('Is the page rendering normally without critical defects or errors?'),
          severity: choice('What is the severity of the operational issue?', {
            none: 'No issues detected, page loaded normally and is functional',
            low: 'Minor performance latency or warning',
            medium: 'Client error (e.g. 404 or missing asset)',
            critical: 'Server error (500), crash, blank page, or unhandled exception'
          }),
          should_alert: noul('Should an on-call engineer be immediately alerted about this page status?')
        }
      });

      if (response && response.answers) {
        decision = {
          is_operational: (response.answers.is_operational?.noul ?? 1) >= 0.5,
          operational_score: response.answers.is_operational?.noul ?? 1,
          severity: response.answers.severity?.choice || 'none',
          severity_confidence: response.answers.severity?.confidence || 1,
          should_alert: (response.answers.should_alert?.noul ?? 0) >= 0.65,
          alert_score: response.answers.should_alert?.noul ?? 0,
          model: response.model || 'jev-1'
        };
      }
    } catch (apiErr) {
      console.warn(`[Jev API Warning] Inference failed for ${targetUrl}:`, apiErr.message);
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
          subject: `🚨 [Jev Alert] Error Detected on ${alertReport.url}`,
          html: `
            <h2>Jev Automated Quality Monitor Alert</h2>
            <p><strong>URL:</strong> <a href="${alertReport.url}">${alertReport.url}</a></p>
            <p><strong>HTTP Status:</strong> ${alertReport.status}</p>
            <p><strong>Latency:</strong> ${alertReport.loadTimeMs} ms</p>
            <p><strong>Severity:</strong> <span style="color:red;font-weight:bold;">${alertReport.decision.severity}</span></p>
            <p><strong>Jev Model:</strong> ${alertReport.decision.model}</p>
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
          text: `🚨 *[Jev Monitor Alert]* Error detected on \`${alertReport.url}\` (Status: ${alertReport.status}, Severity: ${alertReport.decision.severity}, Model: ${alertReport.decision.model})`
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
  if (TYPESAFE_API_KEY) {
    console.log('⚡ TypeSafe AI Jev System-1 connection active.');
  } else {
    console.log('ℹ️  Note: TYPESAFE_API_KEY not detected. Running in heuristic fallback mode.');
  }

  const client = TYPESAFE_API_KEY ? new TypeSafeClient({ apiKey: TYPESAFE_API_KEY }) : null;
  const results = [];
  let errorCount = 0;

  for (const route of ROUTES) {
    const res = await inspectRoute(client, route);
    results.push(res);

    const mark = res.decision.is_operational ? '✅' : '❌';
    console.log(`${mark} [${res.status}] ${res.url} (${res.loadTimeMs}ms) - Severity: ${res.decision.severity} (Model: ${res.decision.model})`);

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
