"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/store/use-user-store";
import { UserNav } from "./user-nav";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Desktop App", href: "/desktop" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-gradient-to-r from-black/10 via-black/5 to-black/10 dark:from-white/10 dark:via-white/5 dark:to-white/10 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 ">
        <div className="flex w-full items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
            <span className="font-bold">TradeTracker</span>
          </Link>
          <div className="hidden md:flex md:gap-x-6 mx-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn("text-sm transition-colors hover:text-foreground/80", pathname === item.href ? "text-foreground" : "text-foreground/60")}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
