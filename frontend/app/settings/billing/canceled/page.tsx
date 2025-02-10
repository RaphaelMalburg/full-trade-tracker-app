"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

function CanceledContent() {
  const router = useRouter();

  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 mt-20 h-screen">
      <Card className="p-8 space-y-6 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-200" />
          </div>
          <h1 className="text-3xl font-bold">Payment Canceled</h1>
          <p className="text-muted-foreground">
            The payment process was canceled. You can try again whenever you're
            ready.
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/settings/billing")}
            >
              Try Again
            </Button>
            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentCanceledPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Card className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-pulse bg-red-100 dark:bg-red-900 h-20 w-20 rounded-full" />
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
          </Card>
        </div>
      }
    >
      <CanceledContent />
    </Suspense>
  );
}
