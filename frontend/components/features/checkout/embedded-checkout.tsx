"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EmbeddedCheckoutProps {
  priceId: string;
  mode: "payment" | "subscription";
  interval?: string;
}

export function EmbeddedCheckoutForm({ priceId, mode, interval }: EmbeddedCheckoutProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create a Checkout Session as soon as the component loads
    fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        mode,
        interval,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [priceId, mode, interval]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div id="checkout" className="min-h-[400px]">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
