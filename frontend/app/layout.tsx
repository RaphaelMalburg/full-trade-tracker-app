import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RootLayoutWrapper } from "@/components/layout/root-layout-wrapper";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/shared/auth-provider";
import { CSPostHogProvider } from "@/components/shared/posthog-provider";
import { Toaster } from "sonner";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trade Tracker - Your AI-Powered Trading Copilot",
  description: "Enhance your trading with computer vision analysis, real-time insights, and automated journaling. Connect with popular platforms and make data-driven decisions.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {" "}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        try {
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        } catch (_) {}
      `,
        }}
      />
      <RootLayoutWrapper className={inter.className}>
        <CSPostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="trade-tracker-theme">
            <AuthProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </CSPostHogProvider>
      </RootLayoutWrapper>
    </html>
  );
}
