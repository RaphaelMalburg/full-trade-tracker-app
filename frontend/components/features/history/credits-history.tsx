"use client";

import { CreditHistory } from "@/lib/types/billing";
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
import { Coins } from "lucide-react";

interface CreditsHistoryProps {
  history: CreditHistory;
  onLoadMore?: () => void;
}

export function CreditsHistoryView({
  history,
  onLoadMore,
}: CreditsHistoryProps) {
  console.log("[CreditsHistoryView] Rendering with data:", history);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Credits History</CardTitle>
          <CardDescription>
            Track your AI credits usage and purchases
          </CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {history.currentBalance}
          </div>
          <div className="text-xs text-muted-foreground">Current Balance</div>
        </div>
      </CardHeader>
      <CardContent>
        {history.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Coins className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium mb-2">No credits activity yet</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Purchase credits to start using AI-powered features like chart
              analysis and pattern recognition.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Feature</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {format(item.date, "MMM d, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${
                          item.type === "purchase"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : item.type === "usage"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        }`}
                      >
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell>{item.feature || "-"}</TableCell>
                    <TableCell
                      className={
                        item.type === "usage"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {item.type === "usage" ? "-" : "+"}
                      {item.amount}
                    </TableCell>
                    <TableCell>{item.balance}</TableCell>
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
