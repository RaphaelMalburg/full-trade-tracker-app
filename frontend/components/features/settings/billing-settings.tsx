"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/use-user-store";
import { Loader2, CreditCard, Coins, HelpCircle, Crown, Check, Receipt, Clock } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CREDIT_PACKAGES, FEATURE_CREDITS, SUBSCRIPTION_TIERS, BillingInterval } from "@/lib/const/pricing";
import { BillingStatus } from "./billing-status";
import { HistoryDialog } from "./history-dialog";
import { getBillingHistory, getCreditHistory } from "@/lib/actions/user/billing";
import { format } from "date-fns";
import { CreditActionType, AIFeature, PaymentStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BillingHistoryItem {
  id: string;
  amount: number;
  cost: number;
  status: PaymentStatus;
  createdAt: Date;
  packageId: string;
}

interface CreditHistoryItem {
  id: string;
  amount: number;
  type: CreditActionType;
  feature: AIFeature | null;
  description: string | null;
  createdAt: Date;
}

export function BillingSettings() {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState<BillingInterval>("yearly");
  const [billingHistoryOpen, setBillingHistoryOpen] = useState(false);
  const [creditHistoryOpen, setCreditHistoryOpen] = useState(false);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>([]);
  const [creditHistory, setCreditHistory] = useState<CreditHistoryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (billingHistoryOpen) {
      getBillingHistory()
        .then((data) => setBillingHistory(data as BillingHistoryItem[]))
        .catch(console.error);
    }
  }, [billingHistoryOpen]);

  useEffect(() => {
    if (creditHistoryOpen) {
      getCreditHistory()
        .then((data) => setCreditHistory(data as CreditHistoryItem[]))
        .catch(console.error);
    }
  }, [creditHistoryOpen]);

  const handlePurchaseCredits = async (packageId: string) => {
    if (loading || !user) {
      toast.error("Please sign in to purchase credits");
      return;
    }

    try {
      setLoading(true);
      const selectedPackage = CREDIT_PACKAGES.find((pkg) => pkg.id === packageId);

      if (!selectedPackage?.priceId) {
        throw new Error("Invalid package selected");
      }

      console.log("Initiating credit purchase:", {
        packageId,
        priceId: selectedPackage.priceId,
        userId: user.id,
      });

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({
          priceId: selectedPackage.priceId,
          mode: "payment",
        }),
      });

      const data = await response.json();
      console.log("Credit purchase response:", {
        status: response.status,
        data,
      });

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
    } catch (err: any) {
      console.error("Purchase error:", err);
      toast.error(err.message || "Failed to initiate purchase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlanClick = async (planId: string) => {
    if (loading || !user) {
      toast.error("Please sign in to subscribe");
      return;
    }

    if (planId === "ENTERPRISE") {
      router.push("/contact");
      return;
    }

    try {
      setLoading(true);
      const selectedPlan = SUBSCRIPTION_TIERS[planId as keyof typeof SUBSCRIPTION_TIERS];
      const priceId = selectedPlan.prices[interval].priceId;

      if (!priceId) {
        throw new Error("Invalid plan selected");
      }

      console.log("Initiating subscription:", {
        planId,
        priceId,
        userId: user.id,
      });

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
      console.log("Subscription response:", { status: response.status, data });

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
    } catch (err: any) {
      console.error("Subscription error:", err);
      toast.error(err.message || "Failed to initiate subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const userTier = (user?.tier || "FREE").toUpperCase() as keyof typeof SUBSCRIPTION_TIERS;

  const renderBillingHistoryItem = (item: any) => (
    <div key={item.id} className="flex items-center justify-between p-4 bg-card border rounded-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          <p className="font-medium">{item.amount} Credits</p>
        </div>
        <p className="text-sm text-muted-foreground">
          ${item.cost} • {item.status.toLowerCase()}
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        {format(new Date(item.createdAt), "MMM d, yyyy")}
      </div>
    </div>
  );

  const renderCreditHistoryItem = (item: any) => (
    <div key={item.id} className="flex items-center justify-between p-4 bg-card border rounded-lg">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <p className="font-medium">
            {item.type === "USAGE" ? "-" : "+"}
            {item.amount} Credits
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {item.description} {item.feature && `• ${item.feature.toLowerCase()}`}
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        {format(new Date(item.createdAt), "MMM d, yyyy")}
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <BillingStatus />

        {/* Current Credits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Credit Balance
            </CardTitle>
            <CardDescription>Your current credit balance and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{user?.credits || 0}</p>
                <p className="text-sm text-muted-foreground">Available Credits</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/credits">Buy Credits</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Current Subscription
            </CardTitle>
            <CardDescription>Your current subscription plan and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{SUBSCRIPTION_TIERS[userTier].name}</p>
                <p className="text-sm text-muted-foreground">{SUBSCRIPTION_TIERS[userTier].description}</p>
              </div>
              <Button variant="outline" onClick={() => setBillingHistoryOpen(true)}>
                View History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="space-y-4">
          <div className="flex justify-center">
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(SUBSCRIPTION_TIERS).map((plan) => (
              <div
                key={`${plan.id}-${interval}`}
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
                              (save {(((plan.prices.monthly.amount * 12 - plan.prices[interval].amount) / (plan.prices.monthly.amount * 12)) * 100).toFixed(0)}
                              %)
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
                  disabled={loading || userTier === plan.id}
                  className={cn("w-full", plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90")}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : userTier === plan.id ? "Current Plan" : plan.id === "ENTERPRISE" ? "Contact Sales" : "Subscribe"}
                </Button>

                <div className="space-y-4">
                  <div className="text-sm font-medium">{plan.id === "FREE" ? "Free features" : `All ${plan.id === "ENTERPRISE" ? "Pro" : "Free"} features plus`}</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Usage</CardTitle>
            <CardDescription>How credits are used in different features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {Object.values(FEATURE_CREDITS).map((feature) => (
                <div key={feature.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{feature.name}</p>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[300px] p-4">
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <p className="font-medium">{feature.credits} credits</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <HistoryDialog open={billingHistoryOpen} onOpenChange={setBillingHistoryOpen} title="Billing History" items={billingHistory} renderItem={renderBillingHistoryItem} />

        <HistoryDialog open={creditHistoryOpen} onOpenChange={setCreditHistoryOpen} title="Credit History" items={creditHistory} renderItem={renderCreditHistoryItem} />
      </div>
    </TooltipProvider>
  );
}
