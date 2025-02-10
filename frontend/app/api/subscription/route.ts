import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { SubscriptionTier } from "@prisma/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.id) {
      return NextResponse.json({ isPro: false, isEnterprise: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
    });

    return NextResponse.json({
      isPro: user?.tier === SubscriptionTier.pro || user?.tier === SubscriptionTier.enterprise,
      isEnterprise: user?.tier === SubscriptionTier.enterprise,
    });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json({ error: "Failed to check subscription" }, { status: 500 });
  }
}
