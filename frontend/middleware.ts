import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { securityMonitor } from "@/lib/utils/security-monitor";
import { getAuthSession } from "@/lib/auth";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/utils/supabase/middleware";

// Initialize Sentry
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
  environment: process.env.NODE_ENV,
  enableTracing: true,
});

export async function middleware(request: NextRequest) {
  const session = await getAuthSession();
  const response = NextResponse.next();
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip") || "unknown";
  const supabase = createClient(request);

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self';
      img-src 'self' blob: data: https://*.googleusercontent.com https://ui-avatars.com;
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.posthog.com https://*.i.posthog.com https://eu-assets.i.posthog.com;
      style-src 'self' 'unsafe-inline';
      font-src 'self';
      frame-src 'self';
      connect-src 'self' https://*.supabase.co https://*.posthog.com https://*.i.posthog.com https://eu.i.posthog.com https://eu-assets.i.posthog.com;
    `
      .replace(/\s+/g, " ")
      .trim()
  );
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");

  // Skip CSRF check for server actions
  if (request.method === "POST" && !request.headers.get("next-action")) {
    const csrfToken = request.cookies.get("csrf_token");
    const headerToken = request.headers.get("X-CSRF-Token");

    if (!csrfToken || !headerToken || csrfToken.value !== headerToken) {
      securityMonitor.trackCsrfViolation(ip, request.nextUrl.pathname);
      return new NextResponse(null, { status: 403 });
    }
  }

  const isAuthPage = request.nextUrl.pathname.startsWith("/sign-in") || request.nextUrl.pathname.startsWith("/sign-up") || request.nextUrl.pathname.startsWith("/forgot-password");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // Handle auth redirects
  if (session) {
    // If user is logged in and tries to access auth pages, redirect to dashboard
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    // If user is not logged in and tries to access dashboard, redirect to sign-in
    if (isDashboardPage) {
      const redirectUrl = new URL("/sign-in", request.url);
      redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Check if we're on a dashboard route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Check onboarding status from custom claims or metadata
    const onboardingCompleted = session.user.user_metadata?.hasCompletedOnboarding;

    if (onboardingCompleted === false) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  const requestId = crypto.randomUUID();

  // Add request tracking headers
  response.headers.set("x-request-id", requestId);
  response.headers.set("x-request-url", request.url);
  response.headers.set("x-request-method", request.method);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - auth (auth endpoints)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|auth).*)",
  ],
};
