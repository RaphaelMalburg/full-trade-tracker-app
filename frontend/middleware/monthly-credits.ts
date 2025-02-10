import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { grantMonthlyCredits } from "@/lib/credits/monthly-credits";

export async function monthlyCreditsMiddleware(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.next();
    }

    // Grant monthly credits if eligible
    await grantMonthlyCredits(userId);

    return NextResponse.next();
  } catch (error) {
    console.error("Monthly credits middleware error:", error);
    // Continue even if credit grant fails
    return NextResponse.next();
  }
}
