import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory store for rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

export async function middleware(request: NextRequest) {
  const key =
    request.headers.get("x-api-key") ||
    request.headers.get("x-forwarded-for") ||
    "anonymous";
  const now = Date.now();

  const windowStart = now - WINDOW_MS;
  const record = rateLimit.get(key);

  if (!record) {
    rateLimit.set(key, { count: 1, timestamp: now });
    return NextResponse.next();
  }

  if (record.timestamp < windowStart) {
    // Reset if window has passed
    record.count = 1;
    record.timestamp = now;
    return NextResponse.next();
  }

  if (record.count >= MAX_REQUESTS) {
    return new NextResponse("Too many requests, please try again later", {
      status: 429,
      headers: {
        "Retry-After": String(
          Math.ceil((record.timestamp + WINDOW_MS - now) / 1000),
        ),
      },
    });
  }

  record.count++;
  return NextResponse.next();
}

export const config = {
  matcher: "/api/webhook/trading-platform/:path*",
};
