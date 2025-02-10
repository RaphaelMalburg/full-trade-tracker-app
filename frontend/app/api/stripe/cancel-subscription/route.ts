import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { SubscriptionStatus, SubscriptionTier } from "@prisma/client";
import { TIER_VALUES } from "@/lib/const/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[CancelSubscription] Fetching user data");
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        stripeSubscriptionId: true,
        tier: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Handle manually upgraded users (no Stripe subscription)
    if (!user.stripeSubscriptionId) {
      console.log("[CancelSubscription] User was manually upgraded, downgrading to FREE");
      await prisma.$transaction([
        prisma.user.update({
          where: { id: session.id },
          data: { tier: TIER_VALUES.FREE },
        }),
        prisma.subscription.update({
          where: { userId: session.id },
          data: {
            status: SubscriptionStatus.inactive,
            plan: SubscriptionTier.free,
            endDate: new Date(),
          },
        }),
      ]);
      return NextResponse.json({
        success: true,
        message: "Account downgraded to Free tier",
      });
    }

    console.log("[CancelSubscription] Cancelling subscription:", user.stripeSubscriptionId);
    try {
      // Fetch subscription to verify it exists and is active
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);

      if (subscription.status !== "active") {
        console.log("[CancelSubscription] Subscription not active:", subscription.status);
        // Clean up the subscription ID if it's not active
        await prisma.$transaction([
          prisma.user.update({
            where: { id: session.id },
            data: {
              tier: TIER_VALUES.FREE,
              stripeSubscriptionId: null,
            },
          }),
          prisma.subscription.update({
            where: { userId: session.id },
            data: {
              status: SubscriptionStatus.inactive,
              plan: SubscriptionTier.free,
              endDate: new Date(),
            },
          }),
        ]);
        return NextResponse.json({
          success: true,
          message: "Account downgraded to Free tier",
        });
      }

      // Cancel active subscription at period end
      await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      // Update user tier to FREE but keep stripeSubscriptionId until it expires
      await prisma.$transaction([
        prisma.user.update({
          where: { id: session.id },
          data: { tier: TIER_VALUES.FREE },
        }),
        prisma.subscription.update({
          where: { userId: session.id },
          data: {
            status: SubscriptionStatus.canceling,
            endDate: new Date(subscription.current_period_end * 1000),
          },
        }),
      ]);

      console.log("[CancelSubscription] Subscription cancelled successfully");
      return NextResponse.json({
        success: true,
        message: "Subscription cancelled successfully. You'll have access until the end of your billing period.",
      });
    } catch (stripeError: any) {
      console.error("[CancelSubscription] Stripe error:", stripeError);
      if (stripeError?.code === "resource_missing") {
        // Subscription doesn't exist in Stripe, clean up our database
        await prisma.$transaction([
          prisma.user.update({
            where: { id: session.id },
            data: {
              tier: TIER_VALUES.FREE,
              stripeSubscriptionId: null,
            },
          }),
          prisma.subscription.update({
            where: { userId: session.id },
            data: {
              status: SubscriptionStatus.inactive,
              plan: SubscriptionTier.free,
              endDate: new Date(),
            },
          }),
        ]);
        return NextResponse.json({
          success: true,
          message: "Account downgraded to Free tier",
        });
      }
      throw stripeError;
    }
  } catch (error) {
    console.error("[CancelSubscription] Error:", error);
    return NextResponse.json({ error: "Failed to cancel subscription. Please try again." }, { status: 500 });
  }
}
