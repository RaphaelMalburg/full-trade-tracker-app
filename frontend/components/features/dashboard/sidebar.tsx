"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, Settings, Layout, History, Lightbulb, Download, Brain, CreditCard } from "lucide-react";
import { Sidebar as UISidebar } from "@/components/ui/sidebar";

export function Sidebar() {
  const pathname = usePathname();

  // Create navigation items
  const sidebarItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: Layout,
    },
    {
      title: "AI Copilot",
      href: "/dashboard/copilot",
      label: "AI Copilot",
      icon: Brain,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "History",
      href: "/dashboard/history",
      icon: History,
    },
    {
      title: "Platform Plugins",
      href: "/plugins",
      icon: Download,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <UISidebar>
      <div className="flex flex-col h-full p-4 space-y-4 mt-16">
        <div className="px-3 py-2">
          <h2 className="mb-2 text-2xl font-bold">Dashboard</h2>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === item.href ? "bg-secondary text-primary" : "text-muted-foreground"
              )}>
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </UISidebar>
  );
}
