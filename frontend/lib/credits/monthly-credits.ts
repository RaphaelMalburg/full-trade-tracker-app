import { prisma } from "@/lib/prisma";
import { CreditActionType } from "@prisma/client";
import { addCredits } from "./credit-manager";
import { MONTHLY_CREDITS } from "../const/pricing";

export async function grantMonthlyCredits(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      tier: true,
      lastLoginAt: true,
    },
  });

  if (!user) return;

  const now = new Date();
  const lastLogin = user.lastLoginAt;
  const monthlyCredits =
    MONTHLY_CREDITS[user.tier.toLowerCase() as keyof typeof MONTHLY_CREDITS] ??
    0;

  // Skip if not eligible for monthly credits
  if (!monthlyCredits) return;

  // Check if it's a new month since last login
  const isNewMonth =
    !lastLogin ||
    lastLogin.getMonth() !== now.getMonth() ||
    lastLogin.getFullYear() !== now.getFullYear();

  if (isNewMonth) {
    await addCredits(
      userId,
      monthlyCredits,
      CreditActionType.MONTHLY_GRANT,
      `Monthly credit grant for ${user.tier} tier`,
    );
  }
}
