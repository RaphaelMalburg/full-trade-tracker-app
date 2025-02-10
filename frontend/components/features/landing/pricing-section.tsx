"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { SUBSCRIPTION_TIERS, BillingInterval } from "@/lib/const/pricing";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/use-user-store";
import { toast } from "sonner";
import type { User } from "@prisma/client";

export function PricingSection() {
  const [interval, setInterval] = useState<BillingInterval>("yearly");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user, initialized } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getButtonText = (planId: string) => {
    if (!mounted || !initialized) return "Loading...";

    if (user?.tier?.toLowerCase() === planId.toLowerCase()) return "Current Plan";
    if (planId === "ENTERPRISE") return "Contact Sales";
    if (planId === "FREE") {
      if (user) return user.tier?.toLowerCase() === "free" ? "Current Plan" : "Downgrade";
      return "Get Started";
    }

    return user ? "Subscribe" : "Get Started";
  };

  const handlePlanClick = async (planId: string) => {
    if (loading || !mounted) return;

    if (planId === "ENTERPRISE") {
      router.push("/contact");
      return;
    }

    if (!user) {
      console.log("[Pricing Section] Redirecting to sign-in - no user");
      router.push("/sign-in");
      return;
    }

    if (user.tier?.toLowerCase() === planId.toLowerCase()) {
      router.push("/dashboard");
      return;
    }

    try {
      setLoading(true);
      const selectedPlan = SUBSCRIPTION_TIERS[planId as keyof typeof SUBSCRIPTION_TIERS];
      const priceId = selectedPlan.prices[interval].priceId;

      if (!priceId) {
        throw new Error("Invalid plan selected");
      }

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({
          priceId,
          mode: "subscription",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please sign in to continue");
          return;
        }
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (!data.url) {
        throw new Error("No checkout URL received");
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error(error.message || "Failed to initiate subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-black/5 dark:bg-white/5 backdrop-blur-xl">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-bold">Transparent Pricing</h2>
          <p className="mt-4 text-muted-foreground">Choose the perfect plan for your trading journey</p>
          <div className="flex justify-center mt-8">
            <div className="flex p-1 gap-1 items-center bg-black/10 dark:bg-white/10 rounded-lg">
              <button
                onClick={() => setInterval("monthly")}
                className={cn("px-4 py-2 rounded-md transition-all", interval === "monthly" ? "bg-black/20 dark:bg-white/20" : "hover:bg-black/5 dark:hover:bg-white/5")}>
                Monthly
              </button>
              <button
                onClick={() => setInterval("yearly")}
                className={cn(
                  "px-4 py-2 rounded-md transition-all flex items-center gap-2",
                  interval === "yearly" ? "bg-primary text-primary-foreground" : "hover:bg-black/5 dark:hover:bg-white/5"
                )}>
                <span>Yearly</span>
                <span className="text-sm bg-primary-foreground/10 px-2 py-0.5 rounded-full">Up to 25% off</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(SUBSCRIPTION_TIERS).map((plan) => (
            <div
              key={plan.id}
              className={cn("flex flex-col p-6 space-y-6 rounded-lg shadow-lg backdrop-blur-xl bg-white/80 dark:bg-black/80", plan.popular && "ring-2 ring-primary relative")}>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">{plan.name}</h4>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-2">
                {plan.prices[interval].amount > 0 ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${interval === "yearly" ? (plan.prices[interval].amount / 12).toFixed(2) : plan.prices[interval].amount}</span>
                      <span className="text-xl text-muted-foreground">per month</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      {interval === "yearly" ? (
                        <>
                          ${plan.prices[interval].amount} billed annually
                          <span className="text-primary font-medium">
                            (save {(((plan.prices.monthly.amount * 12 - plan.prices[interval].amount) / (plan.prices.monthly.amount * 12)) * 100).toFixed(0)}%)
                          </span>
                        </>
                      ) : (
                        "Billed monthly"
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">Free</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Always free</div>
                  </>
                )}
              </div>

              <Button
                onClick={() => handlePlanClick(plan.id)}
                disabled={loading || !mounted || !initialized}
                className={cn("w-full", plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90")}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  getButtonText(plan.id)
                )}
              </Button>

              <div className="space-y-4">
                <div className="text-sm font-medium">{plan.id === "FREE" ? "Free features" : `All ${plan.id === "ENTERPRISE" ? "Pro" : "Free"} features plus`}</div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
