import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const callbackUrl = requestUrl.searchParams.get("callbackUrl");
    const next = callbackUrl || "/dashboard";

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(new URL("/sign-in", requestUrl.origin));
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (authError) {
      console.error("Auth error:", authError);
      return NextResponse.redirect(new URL("/sign-in", requestUrl.origin));
    }

    if (user) {
      try {
        // Ensure user exists in database with all required fields
        const timestamp = new Date().toISOString();
        await prisma.user.upsert({
          where: { id: user.id },
          create: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata.full_name || user.email?.split("@")[0] || "User",
            avatarUrl: user.user_metadata.avatar_url || null,
            createdAt: timestamp,
            updatedAt: timestamp,
            emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at).toISOString() : null,
            isActive: true,
            tier: "free",
            credits: 0,
            hasCompletedOnboarding: false,
            hasAcceptedToS: false,
          },
          update: {
            email: user.email!,
            name: user.user_metadata.full_name || user.user_metadata.name || undefined,
            avatarUrl: user.user_metadata.avatar_url || undefined,
            emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at).toISOString() : undefined,
            updatedAt: timestamp,
            lastLoginAt: timestamp,
          },
        });
      } catch (error) {
        console.error("Failed to sync user in callback:", error);
        // Continue with auth flow even if sync fails
      }
    }

    // Refresh the session to ensure it has the latest data
    await supabase.auth.refreshSession();

    // Redirect to the callback URL or dashboard
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}
