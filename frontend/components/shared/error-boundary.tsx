"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
      <Card className="max-w-md w-full">
        <CardHeader>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message || "An unexpected error occurred"}</AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>{error.digest && <p className="text-xs text-muted-foreground">Error ID: {error.digest}</p>}</CardContent>
        <CardFooter>
          <Button onClick={reset} className="w-full" variant="default">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
