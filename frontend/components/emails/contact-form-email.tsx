import * as React from "react";
import { BaseEmailLayout } from "./base-email-layout";

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  subject,
  message,
}: ContactFormEmailProps) => {
  return (
    <BaseEmailLayout>
      <h2 style={{ color: "#0A0B0D", marginTop: 0 }}>
        New Contact Form Submission
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <p style={{ margin: "10px 0" }}>
          <strong>From:</strong> {name} ({email})
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>Subject:</strong> {subject}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "15px",
          borderRadius: "6px",
          border: "1px solid #eee",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>
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
    </BaseEmailLayout>
  );
};
