"use client";

import { ComponentType, useCallback, useState } from "react";
import { AIFeature } from "@prisma/client";
import { useCredits } from "@/lib/hooks/use-credits";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface WithCreditCheckProps {
  userId: string;
}

export function withCreditCheck<P extends WithCreditCheckProps>(
  WrappedComponent: ComponentType<P>,
  feature: AIFeature,
) {
  return function CreditProtectedComponent(props: P) {
    const { canUseFeature, getFeatureCost, credits } = useCredits(props.userId);
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleUpgrade = useCallback(() => {
      router.push("/dashboard/credits");
    }, [router]);

    const hasCredits = canUseFeature(feature);
    const requiredCredits = getFeatureCost(feature);

    if (!hasCredits) {
      return (
        <>
          <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insufficient Credits</DialogTitle>
                <DialogDescription>
                  This feature requires {requiredCredits} credits. You currently
                  have {credits} credits.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowUpgradeDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpgrade}>Get More Credits</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <h3 className="text-lg font-semibold">Insufficient Credits</h3>
            <p className="text-sm text-muted-foreground text-center">
              This feature requires {requiredCredits} credits. You currently
              have {credits} credits.
            </p>
            <Button onClick={() => setShowUpgradeDialog(true)}>
              Get More Credits
            </Button>
          </div>
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
