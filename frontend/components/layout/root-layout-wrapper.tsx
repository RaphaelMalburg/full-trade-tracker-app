"use client";

import { usePathname } from "next/navigation";

interface RootLayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function RootLayoutWrapper({
  children,
  className = "",
}: RootLayoutWrapperProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <body
      className={`${className} ${isDashboard ? "scrollbar-hide" : "mt-20"}`}
      suppressHydrationWarning
    >
      {children}
    </body>
  );
}
