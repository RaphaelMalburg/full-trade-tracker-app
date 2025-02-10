"use client";

import { useCallback, useEffect, useState } from "react";
import { AIFeature, CreditTransaction } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { getCreditBalance, getCreditHistory } from "../credits/credit-manager";
import { FEATURE_CREDIT_COSTS } from "@/lib/const/pricing";

const LOW_CREDIT_THRESHOLD = 10;

export function useCredits(userId: string) {
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [history, setHistory] = useState<CreditTransaction[]>([]);
  const { toast } = useToast();

  // Fetch credit balance
  const fetchCredits = useCallback(async () => {
    try {
      setError(null);
      const balance = await getCreditBalance(userId);
      setCredits(balance);

      // Show warning if credits are low
      if (balance <= LOW_CREDIT_THRESHOLD) {
        toast({
          title: "Low Credits",
          description: `You have ${balance} credits remaining. Consider purchasing more.`,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Failed to fetch credits:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch credit balance"));
      toast({
        title: "Error",
        description: "Failed to fetch credit balance",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId, toast]);

  // Fetch credit history
  const fetchHistory = useCallback(async () => {
    try {
      const transactions = await getCreditHistory(userId);
      setHistory(transactions);
    } catch (error) {
      console.error("Failed to fetch credit history:", error);
    }
  }, [userId]);

  // Check if user has enough credits for a feature
  const canUseFeature = useCallback(
    (feature: AIFeature) => {
      return credits >= FEATURE_CREDIT_COSTS[feature];
    },
    [credits]
  );

  // Get cost for a feature
  const getFeatureCost = useCallback((feature: AIFeature) => {
    return FEATURE_CREDIT_COSTS[feature];
  }, []);

  useEffect(() => {
    fetchCredits();
    fetchHistory();
  }, [fetchCredits, fetchHistory]);

  return {
    credits,
    isLoading,
    error,
    history,
    canUseFeature,
    getFeatureCost,
    refreshCredits: fetchCredits,
    refreshHistory: fetchHistory,
  };
}
