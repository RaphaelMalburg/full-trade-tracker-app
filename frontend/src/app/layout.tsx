import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { unstable_setRequestLocale } from "next-intl/server";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trading App",
  description: "A modern trading application with AI-powered insights",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
