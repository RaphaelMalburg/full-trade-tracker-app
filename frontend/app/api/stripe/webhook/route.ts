import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { PaymentStatus, SubscriptionStatus, SubscriptionTier } from "@prisma/client";
import { TIER_VALUES } from "@/lib/const/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("[Stripe Webhook] Error verifying webhook:", err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("[Stripe Webhook] Event received:", event.type);

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get the price ID from the subscription
        const priceId = subscription.items.data[0].price.id;

        // Get the user from the customer ID
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error("[Stripe Webhook] User not found for customer:", customerId);
          return new NextResponse("User not found", { status: 404 });
        }

        // Get the product details to determine the tier
        const product = await stripe.products.retrieve(subscription.items.data[0].price.product as string);

        // Determine the tier based on the product metadata or name
        let tier: SubscriptionTier;
        if (product.name.toLowerCase().includes("pro")) {
          tier = SubscriptionTier.pro;
        } else if (product.name.toLowerCase().includes("enterprise")) {
          tier = SubscriptionTier.enterprise;
        } else {
          tier = SubscriptionTier.free;
        }

        // Map Stripe status to our status
        const status: SubscriptionStatus =
          subscription.status === "active" ? SubscriptionStatus.active : subscription.status === "past_due" ? SubscriptionStatus.past_due : SubscriptionStatus.inactive;

        // Update user and subscription in a transaction
        await prisma.$transaction([
          prisma.user.update({
            where: { id: user.id },
            data: {
              tier,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
            },
          }),
          prisma.subscription.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              status,
              plan: tier,
              startDate: new Date(subscription.current_period_start * 1000),
              endDate: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
              stripeSubscriptionId: subscription.id,
            },
            update: {
              status,
              plan: tier,
              startDate: new Date(subscription.current_period_start * 1000),
              endDate: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
              stripeSubscriptionId: subscription.id,
            },
          }),
        ]);

        console.log("[Stripe Webhook] Updated user subscription:", {
          userId: user.id,
          tier,
          subscriptionId: subscription.id,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error("[Stripe Webhook] User not found for customer:", customerId);
          return new NextResponse("User not found", { status: 404 });
        }

        // Update user and subscription in a transaction
        await prisma.$transaction([
          prisma.user.update({
            where: { id: user.id },
            data: {
              tier: SubscriptionTier.free,
              stripeSubscriptionId: null,
              stripePriceId: null,
            },
          }),
          prisma.subscription.update({
            where: { userId: user.id },
            data: {
              status: "inactive" as SubscriptionStatus,
              plan: SubscriptionTier.free,
              endDate: new Date(),
            },
          }),
        ]);

        console.log("[Stripe Webhook] Removed user subscription:", {
          userId: user.id,
          subscriptionId: subscription.id,
        });
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Handle subscription checkout
        if (session.mode === "subscription") {
          // Log the completion - subscription details will be handled by subscription.created event
          console.log("[Stripe Webhook] Subscription checkout completed for user:", session.metadata?.userId);
        }

        // Handle one-time credit purchase
        if (session.mode === "payment") {
          const customerId = session.customer as string;
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId },
          });

          if (!user) {
            console.error("[Stripe Webhook] User not found for customer:", customerId);
            return new NextResponse("User not found", { status: 404 });
          }

          // Update the credit purchase record
          if (session.metadata?.creditPurchaseId) {
            await prisma.creditPurchase.update({
              where: { id: session.metadata.creditPurchaseId },
              data: { status: PaymentStatus.COMPLETED },
            });

            // Add credits to user's balance
            if (session.metadata?.credits) {
              const credits = parseInt(session.metadata.credits);
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  credits: { increment: credits },
                },
              });

              // Record the credit transaction
              await prisma.creditTransaction.create({
                data: {
                  userId: user.id,
                  amount: credits,
                  type: "PURCHASE",
                  description: `Purchased ${credits} credits`,
                },
              });
            }
          }
        }
        break;
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error("[Stripe Webhook] Error processing event:", err);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
