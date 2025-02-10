"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createRiskSettings,
  updateRiskSettings,
} from "@/lib/actions/risk-management";
import { toast } from "sonner";
import { SubscriptionTier } from "@prisma/client";
import { cn } from "@/lib/utils";

type RiskSettingsFormProps = {
  accountId: string;
  initialData?: {
    maxDailyLoss: number;
    maxWeeklyLoss: number;
    maxLossPerTrade: number;
    maxOpenPositions: number;
    dailyTradeLimit: number;
    emailNotifications: boolean;
  };
  userTier: SubscriptionTier;
  className?: string;
  onSuccess?: () => void;
};

export function RiskSettingsForm({
  accountId,
  initialData,
  userTier,
  className,
  onSuccess,
}: RiskSettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    maxDailyLoss: initialData?.maxDailyLoss || -2.5,
    maxWeeklyLoss: initialData?.maxWeeklyLoss || -5,
    maxLossPerTrade: initialData?.maxLossPerTrade || -1,
    maxOpenPositions: initialData?.maxOpenPositions || 3,
    dailyTradeLimit: initialData?.dailyTradeLimit || 10,
    emailNotifications: initialData?.emailNotifications ?? true,
  });

  const isPro = userTier !== "free";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isPro) {
      toast.error(
        "Risk management is only available for Pro and Enterprise users",
      );
      return;
    }

    try {
      setLoading(true);
      if (initialData) {
        await updateRiskSettings(accountId, formData);
        toast.success("Risk settings updated successfully");
      } else {
        await createRiskSettings(accountId, formData);
        toast.success("Risk settings created successfully");
      }
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to save risk settings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className={cn("relative", className)}>
      {!isPro && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center p-6">
            <h3 className="text-lg font-semibold mb-2">Pro Feature</h3>
            <p className="text-muted-foreground mb-4">
              Upgrade to Pro to access advanced risk management features and
              protect your trading capital.
            </p>
            <Button
              variant="default"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              asChild
            >
              <a href="/pricing">Upgrade to Pro</a>
            </Button>
          </div>
        </div>
      )}

      <CardHeader>
        <CardTitle>Risk Management Settings</CardTitle>
        <CardDescription>
          Configure your trading risk parameters and alerts
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxDailyLoss">Maximum Daily Loss (%)</Label>
              <Input
                id="maxDailyLoss"
                type="number"
                step="0.1"
                value={formData.maxDailyLoss}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxDailyLoss: parseFloat(e.target.value),
                  })
                }
                disabled={!isPro}
              />
              <p className="text-sm text-muted-foreground">
                Stop trading when daily losses reach this percentage of account
                balance
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxWeeklyLoss">Maximum Weekly Loss (%)</Label>
              <Input
                id="maxWeeklyLoss"
                type="number"
                step="0.1"
                value={formData.maxWeeklyLoss}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxWeeklyLoss: parseFloat(e.target.value),
                  })
                }
                disabled={!isPro}
              />
              <p className="text-sm text-muted-foreground">
                Stop trading when weekly losses reach this percentage of account
                balance
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLossPerTrade">
                Maximum Loss per Trade (%)
              </Label>
              <Input
                id="maxLossPerTrade"
                type="number"
                step="0.1"
                value={formData.maxLossPerTrade}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxLossPerTrade: parseFloat(e.target.value),
                  })
                }
                disabled={!isPro}
              />
              <p className="text-sm text-muted-foreground">
                Maximum loss allowed for any single trade
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxOpenPositions">Maximum Open Positions</Label>
              <Input
                id="maxOpenPositions"
                type="number"
                value={formData.maxOpenPositions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxOpenPositions: parseInt(e.target.value),
                  })
                }
                disabled={!isPro}
              />
              <p className="text-sm text-muted-foreground">
                Maximum number of positions you can have open at once
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyTradeLimit">Daily Trade Limit</Label>
              <Input
                id="dailyTradeLimit"
                type="number"
                value={formData.dailyTradeLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dailyTradeLimit: parseInt(e.target.value),
                  })
                }
                disabled={!isPro}
              />
              <p className="text-sm text-muted-foreground">
                Maximum number of trades allowed per day
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, emailNotifications: checked })
                }
                disabled={!isPro}
              />
              <Label htmlFor="emailNotifications">Email Notifications</Label>
            </div>
          </div>

          <Button type="submit" disabled={loading || !isPro}>
            {loading
              ? "Saving..."
              : initialData
                ? "Update Settings"
                : "Save Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
