import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkCredits } from "@/lib/credits/credit-manager";
import { AIFeature } from "@prisma/client";

// Map routes to features that require credits
const PROTECTED_ROUTES = {
  "/api/ai/chart-analysis": AIFeature.CHART_ANALYSIS,

  "/api/ai/trading-insights": AIFeature.TRADING_INSIGHTS,
  "/api/ai/risk-analysis": AIFeature.RISK_ANALYSIS,
} as const;

export async function creditCheckMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const feature = PROTECTED_ROUTES[path as keyof typeof PROTECTED_ROUTES];

  // If not a protected route, continue
  if (!feature) {
    return NextResponse.next();
  }

  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hasCredits = await checkCredits(userId, feature);
    if (!hasCredits) {
      return new NextResponse("Insufficient credits", { status: 402 });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Credit check failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
