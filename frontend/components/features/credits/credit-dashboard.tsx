"use client";

import { useState, useEffect } from "react";
import { SubscriptionTier } from "@prisma/client";
import { useUserStore } from "@/lib/store/use-user-store";
import { useCredits } from "@/lib/hooks/use-credits";
import { FEATURE_CREDITS, SUBSCRIPTION_FEATURES } from "@/lib/const/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, History, Crown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function CreditDashboard() {
  console.log("CreditDashboard: Component mounting");

  const { toast } = useToast();
  const user = useUserStore((state) => state.user);
  const { credits, isLoading, error, history } = useCredits(user?.id ?? "");

  useEffect(() => {
    console.log("CreditDashboard: User state:", user);
    console.log("CreditDashboard: Credits state:", { credits, isLoading, error });
  }, [user, credits, isLoading, error]);

  const userTier = user?.tier ?? SubscriptionTier.free;
  const isProOrEnterprise = userTier === SubscriptionTier.pro || userTier === SubscriptionTier.enterprise;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>{userTier === SubscriptionTier.free ? "Free Tier" : userTier === SubscriptionTier.pro ? "Pro Plan" : "Enterprise Plan"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {userTier === SubscriptionTier.free
                ? SUBSCRIPTION_FEATURES.FREE.features[3]
                : userTier === SubscriptionTier.pro
                  ? SUBSCRIPTION_FEATURES.PRO.features[4]
                  : SUBSCRIPTION_FEATURES.ENTERPRISE.features[2]}
            </p>
            {!isProOrEnterprise && (
              <Button variant="outline" asChild className="w-full mt-4">
                <Link href="/pricing">Upgrade Plan</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>AI Credits</CardTitle>
            <CardDescription>Your current credit balance and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-2xl font-bold">{credits}</span>
              </div>
              <Button variant="outline" asChild>
                <Link href="/credits/purchase">Buy Credits</Link>
              </Button>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Feature Costs</h4>
              <div className="space-y-2">
                {Object.entries(FEATURE_CREDITS).map(([key, feature]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span>{feature.name}</span>
                    <span>{feature.credits} credits</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit History</CardTitle>
          <CardDescription>Recent credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading credit history...</p>
          ) : error ? (
            <p>Error loading credit history. Please try again.</p>
          ) : history && history.length > 0 ? (
            <div className="space-y-4">
              {history.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    <div>
                      <p>{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}</p>
                    </div>
                  </div>
                  <span className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No credit history available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
