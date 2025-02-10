"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function usePerformanceMonitoring() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Add route information as tags to any future events
    Sentry.setTag("route", pathname);
    if (searchParams?.toString()) {
      Sentry.setTag("search_params", searchParams.toString());
    }
  }, [pathname, searchParams]);

  // Function to measure performance of async operations
  const measureOperation = async <T>(
    name: string,
    operation: () => Promise<T>,
  ): Promise<T> => {
    const startTime = performance.now();

    try {
      const result = await operation();
      const duration = performance.now() - startTime;

      // Report successful operation to Sentry
      Sentry.addBreadcrumb({
        category: "performance",
        message: `Operation '${name}' completed successfully`,
        data: {
          duration: `${duration.toFixed(2)}ms`,
        },
        level: "info",
      });

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;

      // Report failed operation to Sentry
      Sentry.addBreadcrumb({
        category: "performance",
        message: `Operation '${name}' failed`,
        data: {
          duration: `${duration.toFixed(2)}ms`,
          error: error instanceof Error ? error.message : String(error),
        },
        level: "error",
      });

      throw error;
    }
  };

  return {
    measureOperation,
  };
}
