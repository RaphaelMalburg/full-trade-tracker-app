"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

type MissedAlert = {
  type:
    | "daily_loss"
    | "weekly_loss"
    | "trade_loss"
    | "position_limit"
    | "trade_limit";
  message: string;
  timestamp: Date;
};

type MissedAlertsProps = {
  accountId: string;
  missedAlerts: MissedAlert[];
  className?: string;
};

export function MissedAlerts({
  accountId,
  missedAlerts,
  className,
}: MissedAlertsProps) {
  if (missedAlerts.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Potential Risk Alerts
        </CardTitle>
        <CardDescription>
          With Pro, you would have received these important alerts to protect
          your trading capital
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {missedAlerts.map((alert, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/50">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">{alert.message}</p>
                <span className="text-sm text-muted-foreground">
                  {alert.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Button className="w-full" asChild>
              <a href="/pricing">Upgrade to Pro to Enable Risk Alerts</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
