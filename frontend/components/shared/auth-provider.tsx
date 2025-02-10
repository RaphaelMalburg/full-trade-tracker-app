"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/lib/store/use-user-store";
import { useRouter, usePathname } from "next/navigation";
import { type User, SubscriptionTier, UserStatus } from "@prisma/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setInitialized } = useUserStore();
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const createUserObj = (sessionUser: any): User => ({
      id: sessionUser.id,
      email: sessionUser.email!,
      name: sessionUser.user_metadata?.name || sessionUser.email?.split("@")[0] || "User",
      avatarUrl: sessionUser.user_metadata?.avatar_url || null,
      tier: SubscriptionTier.free,
      credits: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: sessionUser.email_confirmed_at ? new Date(sessionUser.email_confirmed_at) : null,
      apiKey: null,
      bio: null,
      isActive: true,
      lastLoginAt: new Date(),
      hasCompletedOnboarding: false,
      hasAcceptedToS: false,
      stripeSubscriptionId: null,
      stripeCustomerId: null,
      stripePriceId: null,
      role: "USER",
      status: UserStatus.ACTIVE,
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(createUserObj(session.user));
      } else {
        setUser(null);
      }
      setInitialized(true);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(createUserObj(session.user));
      } else {
        setUser(null);
      }

      // Let the server handle redirects via middleware
      if (event === "SIGNED_IN") {
        router.refresh();
      } else if (event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, setUser, setInitialized, router]);

  return <>{children}</>;
}
