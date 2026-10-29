import { Resend } from 'resend';
import { siteSettings } from 'lib/siteSettings';

export async function POST(request) {
    const resend = new Resend(process.env.RESEND_API_KEY || 'no-key-provided');
    try {
        const { email, brand } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { data, error } = await resend.emails.send({
            from: 'UnitecUsa Subscriptions <onboarding@resend.dev>',
            to: [siteSettings.public_email],
            subject: `New Subscriber: ${email}`,
            html: `<p>New subscriber for <strong>${brand || siteSettings.brand_name}</strong>: ${email}</p>`,
        });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
