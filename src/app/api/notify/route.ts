import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL || 'farhanaftab776@gmail.com';

export async function POST(req: Request) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.error("[Email API] CRITICAL: RESEND_API_KEY is missing.");
            return NextResponse.json({ error: "Email configuration missing" }, { status: 500 });
        }

        const payload = await req.json();
        const { type, booking } = payload;

        console.log(`[Email API] Request: ${type} for ${booking?.email}`);

        if (!booking || !booking.email) {
            return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
        }

        if (type === 'new_booking') {
            // 1. Notify Admin
            try {
                const { data, error } = await resend.emails.send({
                    from: 'ItalyTaxi <onboarding@resend.dev>',
                    to: adminEmail,
                    subject: `🚕 NEW BOOKING: ${booking.pickup} to ${booking.destination}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 25px; border: 2px solid #d4af37; border-radius: 12px; max-width: 600px; color: #333;">
                            <h2 style="color: #d4af37; margin-top: 0;">New Request Received</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Client:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${booking.name}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Contact:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${booking.email} / ${booking.phone}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Journey:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${booking.pickup} &rarr; ${booking.destination}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${booking.date} at ${booking.time}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Vehicle:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${booking.vehicle}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Flight:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${booking.flightNumber || 'N/A'}</td></tr>
                            </table>
                            <p style="margin-top: 20px; font-style: italic; color: #666;">Note: ${booking.notes || 'No special requests.'}</p>
                            <a href="https://italy-taxi-service.vercel.app/admin/dashboard" style="display: inline-block; background: #d4af37; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">Open Dashboard</a>
                        </div>
                    `
                });

                if (error) {
                    console.error("[Email API] Admin Email REJECTED by Resend:", error);
                } else {
                    console.log("[Email API] Admin Email ACCEPTED by Resend:", data);
                }
            } catch (err) {
                console.error("[Email API] Admin Email FAILED:", err);
            }

            // 2. Acknowledge Customer
            try {
                const customerRes = await resend.emails.send({
                    from: 'ItalyTaxi Support <onboarding@resend.dev>',
                    to: booking.email,
                    subject: '🇮🇹 Your ItalyTaxi Booking Receipt',
                    html: `
                        <div style="font-family: sans-serif; padding: 25px; color: #333; max-width: 600px;">
                            <h2 style="color: #d4af37;">Grazie, ${booking.name}!</h2>
                            <p>We've received your request for a journey from <strong>${booking.pickup}</strong> to <strong>${booking.destination}</strong>.</p>
                            <p>Our team is verifying availability for your <strong>${booking.vehicle}</strong> on <strong>${booking.date}</strong>. We will confirm your ride shortly.</p>
                        </div>
                    `
                });
                console.log("[Email API] Customer Receipt Success:", customerRes);
            } catch (err) {
                console.error("[Email API] Customer Receipt FAILED:", err);
            }
        }

        else if (type === 'status_update') {
            const isConfirmed = booking.status === 'confirmed';
            try {
                const statusRes = await resend.emails.send({
                    from: 'ItalyTaxi Support <onboarding@resend.dev>',
                    to: booking.email,
                    subject: isConfirmed ? '✅ Your ItalyTaxi Booking is CONFIRMED!' : '❌ Important Update: Your ItalyTaxi Booking',
                    html: `
                        <div style="font-family: sans-serif; padding: 25px; color: #333; max-width: 600px;">
                            <h2 style="color: ${isConfirmed ? '#10b981' : '#ef4444'};">${isConfirmed ? 'Booking Confirmed!' : 'Booking Update'}</h2>
                            <p>Hello ${booking.name},</p>
                            <p>Your journey on <strong>${booking.date}</strong> has been updated to: <strong>${booking.status.toUpperCase()}</strong>.</p>
                        </div>
                    `
                });
                console.log("[Email API] Status Update Success:", statusRes);
            } catch (err) {
                console.error("[Email API] Status Update FAILED:", err);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[Email API] Fatal Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
