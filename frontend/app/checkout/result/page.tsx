"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutResult() {
  const [status, setStatus] = useState<"success" | "failure" | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`/api/stripe/checkout-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status === "complete" ? "success" : "failure");
      })
      .catch((error) => {
        console.error("Error:", error);
        setStatus("failure");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-4xl font-bold">Payment Successful!</h1>
        <p className="text-muted-foreground">Thank you for your purchase.</p>
        <Button onClick={() => (window.location.href = "/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-4xl font-bold">Payment Failed</h1>
      <p className="text-muted-foreground">Something went wrong with your payment. Please try again.</p>
      <Button onClick={() => window.history.back()}>Try Again</Button>
    </div>
  );
}

export default function CheckoutResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }>
      <CheckoutResult />
    </Suspense>
  );
}
