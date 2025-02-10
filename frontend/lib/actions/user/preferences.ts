"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateUserPreferences(preferences: {
  theme?: string;
  emailMarketing?: boolean;
  dailyJournalEmail?: boolean;
  riskAlerts?: boolean;
  securityAlerts?: boolean;
  maxDailyLoss?: number;
  maxWeeklyLoss?: number;
  consecutiveLossLimit?: number;
}) {
  const user = await auth();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    await prisma.userPreferences.update({
      where: { userId: user.id },
      data: preferences,
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw new Error("Failed to update preferences");
  }
}

export async function getUserPreferences() {
  const user = await auth();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    const userWithTier = await prisma.user.findUnique({
      where: { id: user.id },
      select: { tier: true },
    });

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: user.id },
    });

    if (!preferences) {
      // Create default preferences if they don't exist
      const newPreferences = await prisma.userPreferences.create({
        data: {
          userId: user.id,
          theme: "system",
          emailMarketing: false,
          dailyJournalEmail: false,
          riskAlerts: true,
          securityAlerts: true,
          yearsTrading: "0-1",
          tradingStyle: "Day Trading",
          preferredPlatform: "MT5",
        },
      });
      return { ...newPreferences, tier: userWithTier?.tier || "free" };
    }

    return { ...preferences, tier: userWithTier?.tier || "free" };
  } catch (error) {
    console.error("Error fetching preferences:", error);
    throw new Error("Failed to fetch preferences");
  }
}
