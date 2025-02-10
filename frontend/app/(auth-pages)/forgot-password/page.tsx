"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard, AuthCardHeader, AuthCardFooter } from "@/components/auth/auth-card";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      cardHeader={<AuthCardHeader title="Reset password" description="Enter your email address and we'll send you a link to reset your password" />}
      cardFooter={
        <AuthCardFooter>
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </AuthCardFooter>
      }>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={isLoading} className="w-full" />
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        {success && <div className="text-sm text-green-500">Check your email for a link to reset your password.</div>}
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white" disabled={isLoading}>
          {isLoading ? "Sending link..." : "Send reset link"}
        </Button>
      </form>
    </AuthCard>
  );
}
