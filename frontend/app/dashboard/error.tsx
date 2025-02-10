// app/dashboard/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto p-6 space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>An error occurred while loading the dashboard. Please try again.</AlertDescription>
      </Alert>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
          Go to Dashboard
        </Button>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
