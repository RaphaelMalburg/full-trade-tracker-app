"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getURL } from "@/lib/utils/url";
import { initDemoData } from "@/lib/actions/user/init-user";

async function syncUserToDatabase(supabaseUser: any) {
  if (!supabaseUser || !supabaseUser.id || !supabaseUser.email) {
    console.error("Invalid user data received:", supabaseUser);
    return;
  }

  try {
    console.log("Attempting to sync user: ", supabaseUser.id);
    console.log("User metadata:", supabaseUser.user_metadata);

    // First check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
    });

    if (existingUser) {
      console.log("User exists, updating...");
    } else {
      console.log("New user, creating...");
    }

    // Extract metadata with fallbacks
    const metadata = supabaseUser.user_metadata || {};

    // Get full name from various possible sources
    const name =
      metadata.name || metadata.full_name || [metadata.given_name || metadata.first_name, metadata.family_name || metadata.last_name].filter(Boolean).join(" ") || "User";

    // Default avatar using UI Avatars if no avatar URL is provided
    const avatarUrl = metadata.picture || metadata.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

    const user = await prisma.user.upsert({
      where: { id: supabaseUser.id },
      create: {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name,
        avatarUrl,
        emailVerified: supabaseUser.email_confirmed_at ? new Date(supabaseUser.email_confirmed_at) : null,
      },
      update: {
        email: supabaseUser.email,
        name,
        avatarUrl,
        emailVerified: supabaseUser.email_confirmed_at ? new Date(supabaseUser.email_confirmed_at) : undefined,
        updatedAt: new Date(),
      },
    });

    // If this is a new user, initialize demo data
    if (!existingUser) {
      try {
        await initDemoData(user.id);
      } catch (error) {
        console.error("Error initializing demo data:", error);
        // Continue even if demo data creation fails
      }
    }

    console.log("User synced successfully:", user);
    return user;
  } catch (error) {
    console.error("Error syncing user to database:", error);
    throw error;
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = formData.get("callbackUrl") as string;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/sign-in?error=" + error.message);
  }

  if (data?.user) {
    try {
      const user = await syncUserToDatabase(data.user);
      if (user && !user.hasCompletedOnboarding) {
        return redirect("/onboarding");
      }
    } catch (error) {
      console.error("Failed to sync user:", error);
      // Continue with sign in even if sync fails
    }
  }

  return redirect(callbackUrl || "/dashboard");
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const supabase = await createClient();

  console.log("[SignUp] Starting sign up process for email:", email);

  if (!email || !password || !confirmPassword) {
    console.warn("[SignUp] Missing required fields");
    return redirect("/sign-up?error=All fields are required");
  }

  if (password !== confirmPassword) {
    console.warn("[SignUp] Password mismatch detected");
    return redirect("/sign-up?error=Passwords do not match");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getURL()}/api/auth/callback`,
    },
  });

  if (error) {
    console.error("[SignUp] Failed to create account:", error.message);
    return redirect("/sign-up?error=" + error.message);
  }

  if (data?.user) {
    try {
      console.log("[SignUp] Account created successfully, syncing user data");
      const user = await syncUserToDatabase(data.user);
      if (user && !user.hasCompletedOnboarding) {
        return redirect("/onboarding");
      }
    } catch (error) {
      console.error("[SignUp] Failed to sync user:", error);
      // Continue with sign up even if sync fails
    }
  }

  return redirect("/sign-up?message=Check your email to confirm your sign up");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const signInWithGoogleAction = async (callbackUrl?: string) => {
  const supabase = await createClient();

  const redirectUrl = `${getURL()}/api/auth/callback${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("OAuth error:", error);
    return redirect("/sign-in?error=" + error.message);
  }

  if (data?.url) {
    console.log("Redirecting to:", data.url);
    redirect(data.url);
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  console.log("[ForgotPassword] Initiating password reset flow for email:", email);
  console.log("[ForgotPassword] Callback URL:", callbackUrl || "Not provided");

  if (!email) {
    console.warn("[ForgotPassword] Attempt without email address");
    return redirect("/forgot-password?error=Email is required");
  }

  console.log("[ForgotPassword] Sending reset password email...");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}/reset-password`,
  });

  if (error) {
    console.error("[ForgotPassword] Failed to send reset email:", error.message, {
      error,
      email,
    });
    return redirect("/forgot-password?error=Could not reset password");
  }

  console.log("[ForgotPassword] Reset password email sent successfully to:", email);

  if (callbackUrl) {
    console.log("[ForgotPassword] Redirecting to callback URL:", callbackUrl);
    return redirect(callbackUrl);
  }

  return redirect("/forgot-password?message=Check your email for a link to reset your password");
};

export const resetPasswordAction = async (formData: FormData) => {
  console.log("[ResetPassword] Starting password reset process");
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  console.log("[ResetPassword] Validating password inputs");

  if (!password || !confirmPassword) {
    console.warn("[ResetPassword] Missing password or confirmation");
    return redirect("/reset-password?error=Password and confirm password are required");
  }

  if (password !== confirmPassword) {
    console.warn("[ResetPassword] Password mismatch detected");
    return redirect("/reset-password?error=Passwords do not match");
  }

  console.log("[ResetPassword] Attempting to update user password");
  const { error, data } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.error("[ResetPassword] Password update failed:", error.message, {
      error,
    });
    return redirect("/reset-password?error=Password update failed");
  }

  console.log("[ResetPassword] Password updated successfully", {
    userId: data.user.id,
    updatedAt: new Date().toISOString(),
  });

  return redirect("/reset-password?message=Password updated successfully");
};
