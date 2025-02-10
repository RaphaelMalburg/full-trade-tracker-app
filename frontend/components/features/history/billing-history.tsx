"use client";

import { BillingHistory } from "@/lib/types/billing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ExternalLink, Receipt } from "lucide-react";

interface BillingHistoryProps {
  history: BillingHistory;
  onLoadMore?: () => void;
}

export function BillingHistoryView({
  history,
  onLoadMore,
}: BillingHistoryProps) {
  console.log("[BillingHistoryView] Rendering with data:", history);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>
          View your past transactions and invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium mb-2">No billing history yet</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your billing history will appear here once you make your first
              purchase or subscribe to a plan.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {format(item.date, "MMM d, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.planName || "-"}</TableCell>
                    <TableCell>${item.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${
                          item.status === "succeeded"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : item.status === "failed"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.invoiceUrl && (
                        <a
                          href={item.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {history.hasMore && onLoadMore && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={onLoadMore}>
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
