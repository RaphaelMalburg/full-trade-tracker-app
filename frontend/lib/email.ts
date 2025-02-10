import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

type EmailProps = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: EmailProps) {
  try {
    await resend.emails.send({
      from: "Trade Tracker <info@trade-tracker.net>",
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
