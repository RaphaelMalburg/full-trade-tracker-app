import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.CRONJOB_API_KEY) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const now = new Date();
    const isWeeklyReset = now.getDay() === 0; // Sunday

    // Reset all risk settings
    await prisma.$transaction(async (tx) => {
      const riskSettings = await tx.riskSettings.findMany();

      for (const settings of riskSettings) {
        const lastReset = settings.lastResetDate;
        const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));

        // Skip if already reset today
        if (daysSinceReset < 1) continue;

        await tx.riskSettings.update({
          where: { id: settings.id },
          data: {
            currentDailyLoss: 0,
            dailyTradeCount: 0,
            currentWeeklyLoss: isWeeklyReset ? 0 : settings.currentWeeklyLoss,
            lastResetDate: now,
          },
        });
      }
    });

    return new NextResponse("Risk metrics reset successfully", { status: 200 });
  } catch (error) {
    console.error("Failed to reset risk metrics:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
