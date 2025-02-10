import { useEffect, useState } from "react";

interface SubscriptionStatus {
  isPro: boolean;
  isEnterprise: boolean;
}

export function useSubscription() {
  const [isPro, setIsPro] = useState(false);
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkSubscription() {
      try {
        const response = await fetch("/api/subscription");
        if (!response.ok) {
          throw new Error("Failed to fetch subscription status");
        }

        const data: SubscriptionStatus = await response.json();
        setIsPro(data.isPro);
        setIsEnterprise(data.isEnterprise);
        setError(null);
      } catch (error) {
        console.error("Error checking subscription:", error);
        setError(error instanceof Error ? error.message : "Failed to check subscription");
      } finally {
        setIsLoading(false);
      }
    }

    checkSubscription();
  }, []);

  return {
    isPro,
    isEnterprise,
    isLoading,
    error,
    isBasic: !isPro && !isEnterprise,
  };
}
