"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { createClient } from "@/utils/supabase/client";
import type { SafeUser } from "@/lib/types/user";

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  user: SafeUser | null;
  navigation: NavigationItem[];
}

const userNavigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
  { label: "Profile", href: "/settings/profile" },
];

export function MobileMenu({ user, navigation }: MobileMenuProps) {
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-border/50 pt-4">
            {user ? (
              <div className="space-y-2">
                {userNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleSignOut}
                  className="w-full px-3 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors rounded-lg hover:bg-accent">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/sign-in" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-colors rounded-lg">
                  Get Started
                </Link>
              </div>
            )}
          </div>
          <div className="border-t border-border/50 pt-4">
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
