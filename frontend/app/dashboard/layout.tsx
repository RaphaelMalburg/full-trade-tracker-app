import { DashboardLayoutWrapper } from "@/components/features/dashboard/dashboard-layout-wrapper";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
