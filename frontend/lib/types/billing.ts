export interface BillingHistoryItem {
  id: string;
  date: Date;
  amount: number;
  status: "succeeded" | "failed" | "pending";
  description: string;
  planName?: string;
  invoiceUrl?: string;
}

export interface CreditHistoryItem {
  id: string;
  date: Date;
  amount: number;
  type: "purchase" | "usage" | "bonus";
  description: string;
  feature?: string;
  balance: number;
}

export interface BillingHistory {
  items: BillingHistoryItem[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface CreditHistory {
  items: CreditHistoryItem[];
  hasMore: boolean;
  nextCursor?: string;
  currentBalance: number;
}
