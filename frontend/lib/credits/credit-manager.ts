import { prisma } from "@/lib/prisma";
import {
  AIFeature,
  CreditActionType,
  Prisma,
  PrismaClient,
} from "@prisma/client";
import { FEATURE_CREDIT_COSTS } from "@/lib/const/pricing";

export class InsufficientCreditsError extends Error {
  constructor(required: number, available: number) {
    super(
      `Insufficient credits. Required: ${required}, Available: ${available}`,
    );
    this.name = "InsufficientCreditsError";
  }
}

export async function checkCredits(
  userId: string,
  feature: AIFeature,
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  if (!user) throw new Error("User not found");
  return user.credits >= FEATURE_CREDIT_COSTS[feature];
}

export async function useCredits(
  userId: string,
  feature: AIFeature,
): Promise<void> {
  const creditCost = FEATURE_CREDIT_COSTS[feature];

  // Use transaction to ensure atomicity
  await prisma.$transaction(async (tx: TransactionClient) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user) throw new Error("User not found");
    if (user.credits < creditCost) {
      throw new InsufficientCreditsError(creditCost, user.credits);
    }

    // Deduct credits
    await tx.user.update({
      where: { id: userId },
      data: { credits: user.credits - creditCost },
    });

    // Record transaction
    await tx.creditTransaction.create({
      data: {
        userId,
        amount: -creditCost,
        type: CreditActionType.USAGE,
        feature,
        description: `Used ${creditCost} credits for ${feature}`,
      },
    });
  });
}

export async function addCredits(
  userId: string,
  amount: number,
  type: CreditActionType,
  description?: string,
): Promise<void> {
  await prisma.$transaction(async (tx: TransactionClient) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user) throw new Error("User not found");

    // Add credits
    await tx.user.update({
      where: { id: userId },
      data: { credits: user.credits + amount },
    });

    // Record transaction
    await tx.creditTransaction.create({
      data: {
        userId,
        amount,
        type,
        description,
      },
    });
  });
}

export async function getCreditBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  if (!user) throw new Error("User not found");
  return user.credits;
}

export async function getCreditHistory(userId: string) {
  return prisma.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

type TransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
