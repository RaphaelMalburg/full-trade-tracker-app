import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const headers = req.headers;
    const userId = headers.get("x-user-id");
    const body = await req.json();
    const { priceId, mode } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!priceId || !mode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get or create Stripe customer for the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
      });

      customerId = customer.id;
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: mode as "payment" | "subscription",
      metadata: {
        userId,
      },
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/result?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/result?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      client_reference_id: userId,
    });

    if (!checkoutSession.url) {
      throw new Error("Failed to create checkout session URL");
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    console.error("Checkout error:", err.message);
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}
