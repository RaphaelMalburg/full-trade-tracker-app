import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface AuthFormData {
  email: string;
  password: string;
}

export function useAuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const signIn = async ({ email, password }: AuthFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      router.refresh();
      router.push("/dashboard");
      toast.success("Welcome back!");
    } catch (error) {
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password }: AuthFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Check your email to confirm your account!");
    } catch (error) {
      toast.error("An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }

      router.refresh();
      router.push("/");
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("An error occurred during sign out");
    }
  };

  return {
    loading,
    signIn,
    signUp,
    signOut,
  };
}
