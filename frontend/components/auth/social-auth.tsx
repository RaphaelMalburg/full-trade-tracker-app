"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SocialAuthProps {
  isLoading?: boolean;
  onError?: (error: string) => void;
}

export function SocialAuth({ isLoading, onError }: SocialAuthProps) {
  const supabase = createClient();
  const router = useRouter();
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const electron = params.get("electron") === "true";
    console.log("[SocialAuth] Detected electron parameter:", { electron, search: window.location.search });
    setIsElectron(electron);
  }, []);

  async function handleElectronAuth(session: any) {
    console.log("[SocialAuth] Handling electron auth with session:", {
      userId: session.user.id,
      hasSession: !!session,
    });

    try {
      const electronAuthUrl = `${window.location.origin}/api/auth/electron-callback`;
      console.log("[SocialAuth] Fetching electron callback:", electronAuthUrl);

      const response = await fetch(electronAuthUrl);
      console.log("[SocialAuth] Callback response status:", response.status);

      const text = await response.text();
      console.log("[SocialAuth] Callback response:", text.substring(0, 100) + "...");

      if (response.ok && text.startsWith("trade-tracker://")) {
        console.log("[SocialAuth] Redirecting to electron app");
        window.location.href = text;
      } else {
        console.error("[SocialAuth] Invalid callback response");
        if (onError) onError("Failed to complete electron authentication");
      }
    } catch (error) {
      console.error("[SocialAuth] Callback request failed:", error);
      if (onError) onError("Failed to complete electron authentication");
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      console.log("[SocialAuth] Starting Google sign in, isElectron:", isElectron);

      const redirectUrl = new URL("/api/auth/electron-callback", window.location.origin);
      console.log("[SocialAuth] Using redirect URL:", redirectUrl.toString());

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl.toString(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          scopes: "email profile",
        },
      });

      if (error) {
        console.error("[SocialAuth] OAuth error:", error);
        if (onError) onError(error.message);
        return;
      }

      if (data?.url) {
        console.log("[SocialAuth] Redirecting to OAuth URL:", data.url);
        window.location.href = data.url;
      } else {
        console.error("[SocialAuth] No OAuth URL received");
        if (onError) onError("Failed to start authentication");
      }
    } catch (err) {
      console.error("[SocialAuth] Unexpected error:", err);
      if (onError) onError("An unexpected error occurred");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" disabled={isLoading} onClick={handleGoogleSignIn} className="w-full">
        <Icons.google className="mr-2 h-4 w-4" /> Google
      </Button>
    </div>
  );
}
