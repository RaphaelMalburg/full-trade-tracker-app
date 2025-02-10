import { Resend } from "resend";
import { NextResponse } from "next/server";
import { ContactFormEmail } from "@/components/emails/contact-form-email";
import { ContactConfirmationEmail } from "@/components/emails/contact-confirmation-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Send notification to support
    await resend.emails.send({
      from: "Trade Tracker Pro <support@trade-tracker.net>",
      to: "support@tradetracker.com",
      subject: `Contact Form: ${subject}`,
      react: ContactFormEmail({ name, email, subject, message }),
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Trade Tracker Pro <support@trade-tracker.net>",
      to: email,
      subject: "We've received your message - Trade Tracker Pro",
      react: ContactConfirmationEmail({ name, subject, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
