import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple in-memory rate limiter (per-IP window)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      type = 'quote',
      fullName,
      name,
      companyName,
      email,
      phone,
      volume,
      details,
      notes,
      date,
      time,
      _hp // Honeypot field for spam prevention
    } = body;

    // Spam honeypot detection
    if (_hp) {
      console.warn(`[Anti-Spam] Bot detected via honeypot from IP: ${ip}`);
      // Silently return success to bot without executing email or storage
      return NextResponse.json({ success: true, ref: 'SPAM-BLOCKED' }, { status: 200 });
    }

    const contactName = (fullName || name || '').trim();
    const contactEmail = (email || '').trim().toLowerCase();

    // Validation
    if (!contactName || contactName.length < 2) {
      return NextResponse.json(
        { error: 'Valid contact name is required (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || !emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_EMAIL || process.env.NOTIFICATION_EMAIL || 'lidermercadeo@espaciosimportados.com.co';
    const sender = process.env.RESEND_FROM_EMAIL || 'Unitec USA Leads <onboarding@resend.dev>';
    const leadRef = `LEAD-${Date.now().toString(36).toUpperCase()}`;

    let emailSent = false;
    let emailError = null;

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const subject = type === 'meeting'
          ? `[Meeting Request] ${contactName} - ${date || 'Preferred Date'} (${leadRef})`
          : `[New Lead / Quote Request] ${companyName || contactName} (${leadRef})`;

        const htmlContent = `
          <h2>New Lead Submission via Unitec USA Design</h2>
          <p><strong>Reference:</strong> ${leadRef}</p>
          <p><strong>Type:</strong> ${type.toUpperCase()}</p>
          <hr />
          <h3>Contact Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${contactName}</li>
            <li><strong>Email:</strong> ${contactEmail}</li>
            <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
            <li><strong>Company:</strong> ${companyName || 'Not provided'}</li>
          </ul>
          ${type === 'meeting' ? `
            <h3>Meeting Preferences:</h3>
            <ul>
              <li><strong>Date:</strong> ${date || 'Not specified'}</li>
              <li><strong>Time:</strong> ${time || 'Not specified'}</li>
              <li><strong>Notes:</strong> ${notes || 'None'}</li>
            </ul>
          ` : `
            <h3>Project & Quotation Details:</h3>
            <ul>
              <li><strong>Estimated Volume:</strong> ${volume || 'Not specified'}</li>
              <li><strong>Project Details:</strong> ${details || 'None'}</li>
            </ul>
          `}
          <hr />
          <p style="font-size: 12px; color: #666;">Submitted at: ${new Date().toISOString()} from IP: ${ip}</p>
        `;

        const { data, error } = await resend.emails.send({
          from: sender,
          to: [recipient],
          replyTo: contactEmail,
          subject,
          html: htmlContent,
        });

        if (error) {
          console.error('[Resend Error]', error);
          emailError = error.message;
        } else {
          emailSent = true;
          console.log(`[Lead Delivered] Ref: ${leadRef}, To: ${recipient}, MessageId: ${data?.id}`);
        }
      } catch (err) {
        console.error('[Resend Exception]', err);
        emailError = err.message;
      }
    } else {
      console.warn(`[Lead Received] RESEND_API_KEY not configured. Lead Ref: ${leadRef} recorded successfully in server logs.`);
    }

    return NextResponse.json({
      success: true,
      ref: leadRef,
      emailSent,
      recipient: recipient,
      message: 'Lead received successfully. Our commercial engineering team will respond within 24 hours.'
    }, { status: 200 });

  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
