"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/use-user-store";
import { Loader2, CreditCard, Coins, Crown, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { CREDIT_PACKAGES, SUBSCRIPTION_TIERS, BillingInterval } from "@/lib/const/pricing";
import { BillingStatus } from "../settings/billing-status";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditDashboard from "../credits/credit-dashboard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export default function BillingDashboard() {
  console.log("BillingDashboard: Component mounting");

  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState<BillingInterval>("yearly");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("BillingDashboard: User state:", user);
    console.log("BillingDashboard: Subscription tiers:", SUBSCRIPTION_TIERS);
  }, [user]);

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
    } catch (err: any) {
      console.error("Subscription error:", err);
      toast.error(err.message || "Failed to initiate subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (loading || !user) return;

    try {
      setLoading(true);
      const response = await fetch("/api/stripe/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel subscription");
      }

      toast.success("Your subscription has been cancelled");
      setCancelDialogOpen(false);
      router.refresh();
    } catch (err: any) {
      console.error("Cancel subscription error:", err);
      toast.error(err.message || "Failed to cancel subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const userTier = (user?.tier || "FREE").toUpperCase() as keyof typeof SUBSCRIPTION_TIERS;
  const canCancel = userTier !== "FREE";

  return (
    <div className="space-y-6">
      <BillingStatus />

      <Tabs defaultValue="subscription" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6">
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
                {canCancel && (
                  <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-destructive hover:text-destructive">
                        Cancel Subscription
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Subscription</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div className="space-y-2">
                            <p className="font-medium">What happens when you cancel:</p>
                            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
                              <li>Your subscription will remain active until the end of the current billing period</li>
                              <li>You'll lose access to premium features when the subscription ends</li>
                              <li>Your account will be downgraded to the Free tier</li>
                              <li>You can resubscribe at any time</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setCancelDialogOpen(false)}>
                          Keep Subscription
                        </Button>
                        <Button variant="destructive" onClick={handleCancelSubscription} disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            "Cancel Subscription"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
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
        </TabsContent>

        <TabsContent value="credits">
          <CreditDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
