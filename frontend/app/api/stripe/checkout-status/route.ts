import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return new NextResponse("Session ID is required", { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({ status: session.status });
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return new NextResponse("Error retrieving checkout session", { status: 500 });
  }
}
