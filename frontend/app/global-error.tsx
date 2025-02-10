"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Always log global errors to Sentry with highest severity
    Sentry.captureException(error, {
      level: "fatal",
      tags: {
        error_type: "global",
      },
    });
  }, [error]);

  return (
    <html>
      <body>
        <ErrorBoundary error={error} reset={reset} />
      </body>
    </html>
  );
}
