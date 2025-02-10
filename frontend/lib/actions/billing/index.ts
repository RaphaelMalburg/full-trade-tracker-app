"use server";

import { createClient } from "@/utils/supabase/server";
import { BillingHistory, CreditHistory } from "@/lib/types/billing";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getBillingHistory(cursor?: string, limit: number = 10): Promise<BillingHistory> {
  console.log("[getBillingHistory] Starting...");
  const session = await auth();
  if (!session) {
    console.log("[getBillingHistory] No session found");
    throw new Error("Unauthorized");
  }

  try {
    console.log("[getBillingHistory] Fetching data for user:", session.id);
    const billingHistory = await prisma.creditPurchase.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      select: {
        id: true,
        amount: true,
        cost: true,
        status: true,
        createdAt: true,
        packageId: true,
      },
    });

    console.log("[getBillingHistory] Raw data:", JSON.stringify(billingHistory, null, 2));

    const hasMore = billingHistory.length > limit;
    const items = billingHistory.slice(0, limit).map((item) => ({
      id: item.id,
      date: new Date(item.createdAt),
      amount: item.cost,
      status: item.status.toLowerCase() as "succeeded" | "failed" | "pending",
      description: `${item.amount} Credits Purchase`,
      planName: item.packageId,
    }));

    console.log("[getBillingHistory] Transformed data:", JSON.stringify(items, null, 2));

    return {
      items,
      hasMore,
      nextCursor: hasMore ? billingHistory[limit - 1].id : undefined,
    };
  } catch (err) {
    console.error("[getBillingHistory] Error:", err);
    return {
      items: [],
      hasMore: false,
    };
  }
}

export async function getCreditHistory(cursor?: string, limit: number = 10): Promise<CreditHistory> {
  console.log("[getCreditHistory] Starting...");
  const session = await auth();
  if (!session) {
    console.log("[getCreditHistory] No session found");
    throw new Error("Unauthorized");
  }

  try {
    console.log("[getCreditHistory] Fetching user data for:", session.id);
    // First get the current balance
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { credits: true },
    });

    if (!user) {
      console.log("[getCreditHistory] User not found");
      throw new Error("User not found");
    }

    console.log("[getCreditHistory] User credits:", user.credits);

    // Then get the history
    const creditHistory = await prisma.creditTransaction.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      select: {
        id: true,
        amount: true,
        type: true,
        feature: true,
        description: true,
        createdAt: true,
      },
    });

    console.log("[getCreditHistory] Raw data:", JSON.stringify(creditHistory, null, 2));

    const hasMore = creditHistory.length > limit;
    const items = creditHistory.slice(0, limit).map((item) => ({
      id: item.id,
      date: new Date(item.createdAt),
      amount: item.amount,
      type: item.type.toLowerCase() as "purchase" | "usage" | "bonus",
      description: item.description || "",
      feature: item.feature ? item.feature.toString() : undefined,
      balance: 0, // Note: We'll need to calculate running balance if needed
    }));

    console.log("[getCreditHistory] Transformed data:", JSON.stringify(items, null, 2));

    return {
      items,
      hasMore,
      nextCursor: hasMore ? creditHistory[limit - 1].id : undefined,
      currentBalance: user.credits,
    };
  } catch (err) {
    console.error("[getCreditHistory] Error:", err);
    return {
      items: [],
      hasMore: false,
      currentBalance: 0,
    };
  }
}

export async function purchaseCredits(amount: number, paymentMethodId: string): Promise<void> {
  console.log("[purchaseCredits] Starting...");
  const session = await auth();
  if (!session) {
    console.log("[purchaseCredits] No session found");
    throw new Error("Unauthorized");
  }

  try {
    console.log("[purchaseCredits] Creating purchase record for user:", session.id);
    const purchase = await prisma.creditPurchase.create({
      data: {
        userId: session.id,
        amount,
        cost: amount, // This should be calculated based on the credit package
        status: "PENDING",
        packageId: "custom", // This should be the actual package ID if using predefined packages
      },
    });

    console.log("[purchaseCredits] Purchase record created:", purchase);
  } catch (err) {
    console.error("[purchaseCredits] Error:", err);
    throw new Error("Failed to purchase credits");
  }
}
