"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
      const checkUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          router.replace("/sign-in");
        }
      };

      checkUser();

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (!session) {
          router.replace("/sign-in");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }, [router]);

    return <Component {...props} />;
  };
}
