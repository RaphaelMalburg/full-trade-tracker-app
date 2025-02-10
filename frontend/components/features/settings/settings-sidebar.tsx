import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";

const menuItems = [
  {
    title: "General",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/settings/profile",
    icon: User,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    title: "Security",
    href: "/settings/security",
    icon: Shield,
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    icon: Palette,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground">Settings</h2>
        <nav className="mt-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
