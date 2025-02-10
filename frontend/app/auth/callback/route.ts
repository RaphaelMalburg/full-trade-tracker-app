import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    console.log("[AuthCallback] Received request:", request.url);
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const isElectron = requestUrl.searchParams.get("electron") === "true";
    const cookieStore = cookies();

    console.log("[AuthCallback] Parameters:", {
      code: code ? "present" : "missing",
      isElectron,
      search: requestUrl.search,
    });

    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (code) {
      console.log("[AuthCallback] Exchanging code for session...");
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error("[AuthCallback] Code exchange error:", exchangeError);
        return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin));
      }
    }

    console.log("[AuthCallback] Getting session...");
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log("[AuthCallback] Session result:", {
      hasError: !!sessionError,
      hasSession: !!session,
      isElectron,
      errorMessage: sessionError?.message,
    });

    if (sessionError) {
      console.error("[AuthCallback] Session error:", sessionError);
      return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(sessionError.message)}`, requestUrl.origin));
    }

    if (!session) {
      console.error("[AuthCallback] No session found");
      return NextResponse.redirect(new URL("/sign-in?error=No session found", requestUrl.origin));
    }

    if (isElectron) {
      console.log("[AuthCallback] Redirecting to electron callback");
      const electronCallbackUrl = new URL("/api/auth/electron-callback", requestUrl.origin);
      electronCallbackUrl.searchParams.set("code", code || "");
      return NextResponse.redirect(electronCallbackUrl);
    }

    console.log("[AuthCallback] Redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
  } catch (error: any) {
    console.error("[AuthCallback] Error:", error);
    return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(error.message)}`, request.url));
  }
}
