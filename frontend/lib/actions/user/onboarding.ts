"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Platform } from "@/lib/const/platforms";

interface OnboardingData {
  name: string;
  bio: string | null;
  yearsTrading: string;
  tradingStyle: string;
  platform: Platform;
  acceptedToS: boolean;
}

export async function saveOnboardingPreferences(data: OnboardingData) {
  const user = await auth();
  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        bio: data.bio,
        hasAcceptedToS: data.acceptedToS,
        preferences: {
          upsert: {
            create: {
              yearsTrading: data.yearsTrading,
              tradingStyle: data.tradingStyle,
              preferredPlatform: data.platform,
              theme: "system",
              emailMarketing: false,
              dailyJournalEmail: false,
              riskAlerts: false,
              securityAlerts: true,
            },
            update: {
              yearsTrading: data.yearsTrading,
              tradingStyle: data.tradingStyle,
              preferredPlatform: data.platform,
            },
          },
        },
        hasCompletedOnboarding: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving onboarding preferences:", error);
    throw error;
  }
}
