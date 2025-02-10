"use server";

import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function regenerateApiKey() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const newApiKey = uuidv4();

    await prisma.user.update({
      where: { id: user.id },
      data: { apiKey: newApiKey },
    });

    return { success: true, apiKey: newApiKey };
  } catch (error) {
    console.error("Error regenerating API key:", error);
    return { success: false, error: "Failed to regenerate API key" };
  }
}

export async function getApiKey() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { apiKey: true },
    });

    return { success: true, apiKey: dbUser?.apiKey };
  } catch (error) {
    console.error("Error fetching API key:", error);
    return { success: false, error: "Failed to fetch API key" };
  }
}
