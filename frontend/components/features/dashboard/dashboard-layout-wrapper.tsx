"use client";

import { Background } from "@/components/ui/background-variations";
import { Sidebar } from "@/components/features/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
}

export function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-1">
            <Background variant="subtle" animate={false} className="min-h-full">
              <main className="container p-6">
                <div className="mx-auto max-w-7xl">
                  <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-xl p-6">{children}</div>
                </div>
              </main>
            </Background>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
