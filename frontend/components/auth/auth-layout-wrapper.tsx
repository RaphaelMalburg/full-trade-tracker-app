"use client";

import { Background } from "@/components/ui/background-variations";

export function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Background variant="mesh" animate={false}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[400px] mx-auto">{children}</div>
      </div>
    </Background>
  );
}
