"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { SUBSCRIPTION_TIERS, CREDIT_PACKAGES } from "@/lib/const/pricing";

export const dynamic = "force-dynamic";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const priceId = searchParams.get("priceId");

  const getSuccessMessage = () => {
    if (!mode || !priceId)
      return {
        title: "Payment Successful!",
        description:
          "Thank you for your purchase. Your account has been updated.",
      };

    if (mode === "subscription") {
      const tier = Object.values(SUBSCRIPTION_TIERS).find(
        (t) => t.id === priceId,
      );
      return {
        title: `Welcome to ${tier?.name || "Pro"} Plan!`,
        description: `You now have access to all ${tier?.name || "premium"} features. Your account has been upgraded and is ready to use.`,
      };
    }

    if (mode === "payment") {
      const creditPkg = Object.values(CREDIT_PACKAGES).find(
        (p) => p.id === priceId,
      );
      return {
        title: "Credits Added Successfully!",
        description: `${creditPkg?.credits || ""} credits have been added to your account. You can start using them right away.`,
      };
    }

    return {
      title: "Payment Successful!",
      description:
        "Thank you for your purchase. Your account has been updated.",
    };
  };

  const message = getSuccessMessage();

  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 mt-20">
      <Card className="p-8 space-y-6 h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-200" />
          </div>
          <h1 className="text-3xl font-bold">{message.title}</h1>
          <p className="text-muted-foreground">{message.description}</p>
          <div className="flex gap-4">
            {mode === "subscription" && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/settings/billing")}
              >
                View Subscription
              </Button>
            )}
            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Card className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-pulse bg-green-100 dark:bg-green-900 h-20 w-20 rounded-full" />
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
          </Card>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
