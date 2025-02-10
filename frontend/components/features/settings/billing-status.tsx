"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BillingStatus() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (success) {
      toast.success("Payment completed successfully!");
    }
    if (canceled) {
      toast.error("Payment was canceled.");
    }
  }, [success, canceled]);

  if (!success && !canceled) return null;

  return (
    <Alert variant={success ? "default" : "destructive"}>
      {success ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Payment Successful</AlertTitle>
          <AlertDescription>
            Thank you for your purchase! Your account has been updated.
          </AlertDescription>
        </>
      ) : (
        <>
          <XCircle className="h-4 w-4" />
          <AlertTitle>Payment Canceled</AlertTitle>
          <AlertDescription>
            The payment was canceled. Please try again if you wish to proceed
            with the purchase.
          </AlertDescription>
        </>
      )}
    </Alert>
  );
}
