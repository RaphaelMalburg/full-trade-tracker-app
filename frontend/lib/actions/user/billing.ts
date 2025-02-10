"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getBillingHistory() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const billingHistory = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      creditPurchases: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          amount: true,
          cost: true,
          status: true,
          createdAt: true,
          packageId: true,
        },
      },
    },
  });

  return billingHistory?.creditPurchases || [];
}

export async function getCreditHistory() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const creditHistory = await prisma.creditTransaction.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      amount: true,
      type: true,
      feature: true,
      description: true,
      createdAt: true,
    },
  });

  return creditHistory;
}
