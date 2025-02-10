"use server";

import { Strategy } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CreateStrategyInput {
  name: string;
  description?: string;
  userId: string;
}

export async function createStrategy(
  input: CreateStrategyInput,
): Promise<Strategy> {
  try {
    const strategy = await prisma.strategy.create({
      data: {
        name: input.name,
        description: input.description,
        userId: input.userId,
      },
    });

    revalidatePath("/dashboard/trades");
    return strategy;
  } catch (error) {
    console.error("Error creating strategy:", error);
    throw error;
  }
}

export async function updateStrategy(
  id: string,
  userId: string,
  updates: Partial<CreateStrategyInput>,
): Promise<Strategy> {
  const strategy = await prisma.strategy.findFirst({
    where: { id, userId },
  });

  if (!strategy) {
    throw new Error("Strategy not found or unauthorized");
  }

  const updatedStrategy = await prisma.strategy.update({
    where: { id },
    data: updates,
  });

  revalidatePath("/dashboard/trades");
  return updatedStrategy;
}

export async function deleteStrategy(
  id: string,
  userId: string,
): Promise<void> {
  const strategy = await prisma.strategy.findFirst({
    where: { id, userId },
  });

  if (!strategy) {
    throw new Error("Strategy not found or unauthorized");
  }

  await prisma.strategy.delete({
    where: { id },
  });

  revalidatePath("/dashboard/trades");
}

export async function getUserStrategies(userId: string): Promise<Strategy[]> {
  return prisma.strategy.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });
}
