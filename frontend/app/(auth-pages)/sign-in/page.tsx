"use client";

import { AuthCard, AuthCardHeader, AuthCardFooter } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { SocialAuth } from "@/components/auth/social-auth";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const electron = params.get("electron") === "true";
    console.log("[SignIn] Detected electron parameter:", { electron, search: window.location.search });
    setIsElectron(electron);
  }, []);

  async function handleElectronAuth(session: any) {
    console.log("[SignIn] Handling electron auth with session:", {
      userId: session.user.id,
      hasSession: !!session,
    });

    try {
      const electronAuthUrl = `${window.location.origin}/api/auth/electron-callback`;
      console.log("[SignIn] Fetching electron callback:", electronAuthUrl);

      const response = await fetch(electronAuthUrl);
      console.log("[SignIn] Callback response status:", response.status);

      const text = await response.text();
      console.log("[SignIn] Callback response:", text.substring(0, 100) + "...");

      if (response.ok && text.startsWith("trade-tracker://")) {
        console.log("[SignIn] Redirecting to electron app");
        window.location.href = text;
      } else {
        console.error("[SignIn] Invalid callback response");
        setError("Failed to complete electron authentication");
      }
    } catch (error) {
      console.error("[SignIn] Callback request failed:", error);
      setError("Failed to complete electron authentication");
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("[SignIn] Attempting sign in for:", { email, isElectron });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("[SignIn] Auth error:", error);
        setError(error.message);
        return;
      }

      console.log("[SignIn] Sign in successful, session:", {
        userId: data.user?.id,
        hasSession: !!data.session,
        isElectron,
      });

      if (isElectron && data.session) {
        await handleElectronAuth(data.session);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("[SignIn] Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      cardHeader={<AuthCardHeader title="Welcome back" description="Enter your email and password to sign in to your account" />}
      cardFooter={
        <AuthCardFooter>
          <div className="flex flex-col space-y-2 text-center text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign up
              </Link>
            </p>
            <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">
              Forgot your password?
            </Link>
          </div>
        </AuthCardFooter>
      }>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoCapitalize="none" autoComplete="current-password" autoCorrect="off" disabled={isLoading} required />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>

      <SocialAuth isLoading={isLoading} onError={setError} />
    </AuthCard>
  );
}
