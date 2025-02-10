"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CREDIT_PACKAGES } from "@/lib/const/pricing";
import { useUserStore } from "@/lib/store/use-user-store";
import { SubscriptionTier } from "@prisma/client";

type CreditPackageId = (typeof CREDIT_PACKAGES)[number]["id"];

interface CreditPurchaseFormProps {
  onPurchase: (amount: number, paymentMethodId: string) => Promise<void>;
}

export function CreditPurchaseForm({ onPurchase }: CreditPurchaseFormProps) {
  const [selectedPackage, setSelectedPackage] = useState<CreditPackageId>(CREDIT_PACKAGES[1].id);
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const isProOrEnterprise = user?.tier === SubscriptionTier.pro || user?.tier === SubscriptionTier.enterprise;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const creditPackage = CREDIT_PACKAGES.find((pkg) => pkg.id === selectedPackage);
    if (!creditPackage) return;

    try {
      setLoading(true);
      // In a real app, you'd collect payment method ID from Stripe Elements
      const mockPaymentMethodId = "pm_mock_123";
      await onPurchase(creditPackage.credits, mockPaymentMethodId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup value={selectedPackage} onValueChange={(value: CreditPackageId) => setSelectedPackage(value)} className="grid grid-cols-1 gap-4">
        {CREDIT_PACKAGES.map((pkg) => (
          <Label
            key={pkg.id}
            className={cn(
              "flex flex-col items-start justify-between rounded-lg border p-4 cursor-pointer hover:bg-accent",
              selectedPackage === pkg.id && "border-primary bg-accent"
            )}>
            <RadioGroupItem value={pkg.id} className="sr-only" />
            <div className="flex w-full justify-between">
              <div className="space-y-2">
                <span className="text-lg font-semibold">{pkg.credits} Credits</span>
                {isProOrEnterprise ? (
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-medium text-primary">${pkg.proPrice.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground line-through">${pkg.price.toFixed(2)}</p>
                    <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">Save {pkg.discount}%</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">${pkg.price.toFixed(2)}</p>
                )}
              </div>
              {pkg.featured && (
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {pkg.description}
                </span>
              )}
            </div>
          </Label>
        ))}
      </RadioGroup>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : "Purchase Credits"}
      </Button>
    </form>
  );
}
