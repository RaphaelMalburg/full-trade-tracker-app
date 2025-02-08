import { Resend } from "resend";
import WelcomeEmail from "@/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ email, name, confirmLink }: { email: string; name: string; confirmLink: string }) {
  try {
    await resend.emails.send({
      from: "Trading App <noreply@yourdomain.com>",
      to: email,
      subject: "Welcome to Trading App - Confirm your email",
      react: WelcomeEmail({ name, confirmLink }),
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}

export async function sendPasswordResetEmail({ email, resetLink }: { email: string; resetLink: string }) {
  try {
    await resend.emails.send({
      from: "Trading App <noreply@yourdomain.com>",
      to: email,
      subject: "Reset your Trading App password",
      text: `Click this link to reset your password: ${resetLink}`,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}
