"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBackground({ children, className = "" }: GradientBackgroundProps) {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <div className={`relative min-h-screen w-full overflow-hidden ${isDark ? "bg-slate-950" : "bg-slate-50"} ${className}`}>
      {/* Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Gradient */}
        <div
          className={`absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full ${
            isDark ? "bg-gradient-to-r from-blue-500/20 to-cyan-400/20" : "bg-gradient-to-r from-blue-400/30 to-cyan-300/30"
          } blur-3xl`}
          style={{ animation: "pulse 8s infinite" }}
        />

        {/* Secondary Gradient */}
        <div
          className={`absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full ${
            isDark ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20" : "bg-gradient-to-r from-blue-500/30 to-cyan-400/30"
          } blur-3xl`}
          style={{ animation: "pulse 8s infinite 4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
