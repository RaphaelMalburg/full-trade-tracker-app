import * as React from "react";

interface BaseEmailLayoutProps {
  children: React.ReactNode;
}

export const BaseEmailLayout = ({ children }: BaseEmailLayoutProps) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        color: "#0A0B0D",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            color: "#47F3A3",
            margin: "0",
            fontSize: "24px",
          }}
        >
          Trade Tracker Pro
        </h1>
      </div>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {children}
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#6C7075",
        }}
      >
        <p>
          © {new Date().getFullYear()} Trade Tracker Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};
