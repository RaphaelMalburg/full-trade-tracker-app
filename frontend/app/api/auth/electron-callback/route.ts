import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("[ElectronCallback] Received request:", request.url);
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const cookieStore = cookies();

    console.log("[ElectronCallback] Creating Supabase client...");
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // If we have a code, exchange it for a session
    if (code) {
      console.log("[ElectronCallback] Exchanging code for session...");
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error("[ElectronCallback] Code exchange error:", exchangeError);
        return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin));
      }
    }

    console.log("[ElectronCallback] Getting session...");
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log("[ElectronCallback] Session result:", {
      hasError: !!error,
      hasSession: !!session,
      errorMessage: error?.message,
    });

    if (error || !session) {
      console.error("[ElectronCallback] Auth error:", error || "No session found");
      return NextResponse.redirect(new URL("/sign-in?error=Authentication failed", requestUrl.origin));
    }

    // Construct electron deep link URL with auth data
    const params = new URLSearchParams({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: (session.expires_at || Math.floor(Date.now() / 1000) + 3600).toString(),
      user_id: session.user.id,
      email: session.user.email || "",
    });

    const electronAuthUrl = `trade-tracker://auth?${params.toString()}`;
    console.log("[ElectronCallback] Generated URL:", electronAuthUrl.replace(/access_token=[^&]+/, "access_token=***").replace(/refresh_token=[^&]+/, "refresh_token=***"));

    // Instead of returning the URL as plain text, redirect to it
    return NextResponse.redirect(electronAuthUrl);
  } catch (error: any) {
    console.error("[ElectronCallback] Error:", error);
    return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(error.message)}`, request.url));
  }
}
