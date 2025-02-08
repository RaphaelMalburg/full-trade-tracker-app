"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");

  const navItems = [
    { href: "/analysis", label: t("analysis") },
    { href: "/hub", label: t("hub") },
    { href: "/pricing", label: t("pricing") },
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="glass border-b bg-background/50">
        <div className="container flex h-16 items-center">
          <div className="mr-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-primary/20 p-1">
                <div className="h-full w-full rounded-sm bg-gradient-to-br from-primary to-primary-foreground" />
              </div>
              <span className="font-bold tracking-tight">TradingAI</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center space-x-6 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn("transition-colors hover:text-foreground/80", "text-foreground/60")}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                <Link href="/signup">{t("signup")}</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
