import * as React from "react";
import { BaseEmailLayout } from "./base-email-layout";

interface ContactConfirmationEmailProps {
  name: string;
  subject: string;
  message: string;
}

export const ContactConfirmationEmail = ({
  name,
  subject,
  message,
}: ContactConfirmationEmailProps) => {
  return (
    <BaseEmailLayout>
      <h2
        style={{
          color: "#47F3A3",
          marginTop: 0,
          textAlign: "center",
        }}
      >
        Thank you for contacting Trade Tracker Pro
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <p style={{ margin: "10px 0" }}>Dear {name},</p>
        <p style={{ margin: "10px 0", lineHeight: "1.5" }}>
          We've received your message and will get back to you as soon as
          possible, usually within 24 hours.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "15px",
          borderRadius: "6px",
          border: "1px solid #eee",
          marginBottom: "20px",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>
          For your reference, here's a copy of your message:
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>Subject:</strong> {subject}
        </p>
        <p style={{ margin: "5px 0 10px 0" }}>
          <strong>Message:</strong>
        </p>
        <p
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            lineHeight: "1.5",
          }}
        >
          {message}
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid #eee",
          paddingTop: "20px",
          marginTop: "20px",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>Best regards,</p>
        <p style={{ margin: 0, color: "#47F3A3" }}>Trade Tracker Pro Team</p>
      </div>
    </BaseEmailLayout>
  );
};
