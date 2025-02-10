"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserNav } from "@/components/shared/user-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import type { SafeUser } from "@/lib/types/user";

interface NavbarClientProps {
  user: SafeUser | null;
}

const navigation = [
  { label: "Features", href: "/features" },
  { label: "Store", href: "/store" },
  { label: "Plugins", href: "/plugins" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function NavbarClient({ user }: NavbarClientProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/50 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">TT</span>
        </Link>

        <div className="hidden md:flex md:items-center md:justify-center flex-1 mx-4">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserNav user={user} />
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20" asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>
          <MobileMenu user={user} navigation={navigation} />
        </div>
      </div>
    </nav>
  );
}
