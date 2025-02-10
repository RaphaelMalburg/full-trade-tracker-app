"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingHistoryView } from "@/components/features/history/billing-history";
import { CreditsHistoryView } from "@/components/features/history/credits-history";
import { BillingHistory, CreditHistory } from "@/lib/types/billing";
import {
  getBillingHistory,
  getCreditHistory,
  purchaseCredits,
} from "@/lib/actions/billing";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditPurchaseForm } from "@/components/features/history/credit-purchase-form";
import { withAuth } from "@/components/shared/with-auth";
import { useUserStore } from "@/lib/store/use-user-store";

interface ServerBillingHistoryItem {
  id: string;
  createdAt: string;
  amount: number;
  cost: number;
  status: "SUCCEEDED" | "FAILED" | "PENDING";
  packageId: string;
}

interface ServerCreditHistoryItem {
  id: string;
  createdAt: string;
  amount: number;
  type: "PURCHASE" | "USAGE" | "BONUS";
  description: string | null;
  feature: string | null;
}

interface ServerBillingHistoryResponse {
  items: ServerBillingHistoryItem[];
  hasMore: boolean;
  nextCursor?: string;
}

interface ServerCreditHistoryResponse {
  items: ServerCreditHistoryItem[];
  hasMore: boolean;
  nextCursor?: string;
  currentBalance: number;
}

function transformBillingItem(item: ServerBillingHistoryItem) {
  return {
    id: item.id,
    date: new Date(item.createdAt),
    amount: item.cost,
    status: item.status.toLowerCase() as "succeeded" | "failed" | "pending",
    description: `${item.amount} Credits Purchase`,
    planName: item.packageId,
  };
}

function transformCreditItem(item: ServerCreditHistoryItem) {
  return {
    id: item.id,
    date: new Date(item.createdAt),
    amount: item.amount,
    type: item.type.toLowerCase() as "purchase" | "usage" | "bonus",
    description: item.description || "",
    feature: item.feature ? item.feature.toString() : undefined,
    balance: 0,
  };
}

function HistoryPage() {
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("billing");
  const [billingHistory, setBillingHistory] = useState<BillingHistory>({
    items: [],
    hasMore: false,
  });
  const [creditHistory, setCreditHistory] = useState<CreditHistory>({
    items: [],
    hasMore: false,
    currentBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user?.id) {
      console.log("[HistoryPage] User loaded, fetching data for:", user.id);
      loadInitialData();
    } else {
      console.log("[HistoryPage] No user found yet");
    }
  }, [user?.id]);

  async function loadInitialData() {
    try {
      console.log("[HistoryPage] Starting initial data load");
      setLoading(true);
      setError(null);

      console.log("[HistoryPage] Fetching billing and credit history");
      const [billingData, creditData] = await Promise.all([
        getBillingHistory(),
        getCreditHistory(),
      ]);
      console.log("[HistoryPage] Received data:", { billingData, creditData });

      setBillingHistory(billingData);
      setCreditHistory(creditData);
    } catch (err) {
      console.error("[HistoryPage] Error loading data:", err);
      setError("Failed to load history. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadMore(type: "billing" | "credits") {
    try {
      console.log("[HistoryPage] Loading more items for type:", type);
      setLoadingMore(true);
      const cursor =
        type === "billing"
          ? billingHistory.nextCursor
          : creditHistory.nextCursor;

      if (type === "billing") {
        const newData = await getBillingHistory(cursor);
        console.log("[HistoryPage] Received more billing data:", newData);
        if (newData?.items) {
          setBillingHistory((prev) => ({
            items: [...prev.items, ...newData.items],
            hasMore: newData.hasMore,
            nextCursor: newData.nextCursor,
          }));
        }
      } else {
        const newData = await getCreditHistory(cursor);
        console.log("[HistoryPage] Received more credit data:", newData);
        if (newData?.items) {
          setCreditHistory((prev) => ({
            items: [...prev.items, ...newData.items],
            hasMore: newData.hasMore,
            nextCursor: newData.nextCursor,
            currentBalance: newData.currentBalance || prev.currentBalance,
          }));
        }
      }
    } catch (err) {
      console.error("[HistoryPage] Error loading more items:", err);
      toast({
        title: "Error",
        description: "Failed to load more items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingMore(false);
    }
  }

  async function handlePurchaseCredits(
    amount: number,
    paymentMethodId: string,
  ) {
    try {
      console.log("[HistoryPage] Initiating credit purchase:", {
        amount,
        paymentMethodId,
      });
      await purchaseCredits(amount, paymentMethodId);
      toast({
        title: "Success",
        description: "Credits purchased successfully!",
      });
      setPurchaseDialogOpen(false);
      loadInitialData(); // Refresh the data
    } catch (err) {
      console.error("[HistoryPage] Error purchasing credits:", err);
      toast({
        title: "Error",
        description: "Failed to purchase credits. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (!user?.id) {
    console.log("[HistoryPage] No user ID found, showing sign-in prompt");
    return (
      <div className="flex items-center justify-center min-h-[400px] mt-20">
        <p className="text-muted-foreground">
          Please sign in to view your history.
        </p>
      </div>
    );
  }

  if (loading) {
    console.log("[HistoryPage] Showing loading state");
    return (
      <div className="flex items-center justify-center min-h-[400px] mt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.log("[HistoryPage] Showing error state:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 mt-20">
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={loadInitialData}>Try Again</Button>
      </div>
    );
  }

  console.log("[HistoryPage] Rendering main content");
  return (
    <div className="space-y-6 mt-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">History</h1>
          <p className="text-muted-foreground">
            View your complete platform activity history
          </p>
        </div>
        <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Purchase Credits
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Credits</DialogTitle>
              <DialogDescription>
                Choose a credit package or enter a custom amount
              </DialogDescription>
            </DialogHeader>
            <CreditPurchaseForm onPurchase={handlePurchaseCredits} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
        </TabsList>
        <TabsContent value="billing" className="space-y-4">
          <BillingHistoryView
            history={billingHistory}
            onLoadMore={
              loadingMore ? undefined : () => handleLoadMore("billing")
            }
          />
        </TabsContent>
        <TabsContent value="credits" className="space-y-4">
          <CreditsHistoryView
            history={creditHistory}
            onLoadMore={
              loadingMore ? undefined : () => handleLoadMore("credits")
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default withAuth(HistoryPage);
