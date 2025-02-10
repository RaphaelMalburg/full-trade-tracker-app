"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { updateUserPreferences } from "@/lib/actions/user/preferences";
import { UserPreferences, SubscriptionTier } from "@prisma/client";

interface PreferenceSettingsProps {
  initialPreferences: UserPreferences & {
    tier: SubscriptionTier;
  };
}

export function PreferenceSettings({ initialPreferences }: PreferenceSettingsProps) {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreferenceChange = async (field: keyof UserPreferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updateUserPreferences({
        ...preferences,
        maxDailyLoss: preferences.maxDailyLoss ?? undefined,
        maxWeeklyLoss: preferences.maxWeeklyLoss ?? undefined,
        consecutiveLossLimit: preferences.consecutiveLossLimit ?? undefined,
      });
      toast({
        title: "Preferences updated",
        description: "Your preferences have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage your email notification settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
              <span>Product Updates & News</span>
              <span className="font-normal text-sm text-muted-foreground">Receive updates about new features and trading insights</span>
            </Label>
            <Switch id="marketing-emails" checked={preferences.emailMarketing} onCheckedChange={(checked) => handlePreferenceChange("emailMarketing", checked)} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="daily-journal" className="flex flex-col space-y-1">
              <span>Daily Trading Journal Summary</span>
              <span className="font-normal text-sm text-muted-foreground">Receive AI-powered analysis of your daily trading performance</span>
              {preferences.tier === "free" && <span className="text-xs text-primary">Pro/Enterprise feature</span>}
            </Label>
            <Switch
              id="daily-journal"
              checked={preferences.dailyJournalEmail}
              onCheckedChange={(checked) => handlePreferenceChange("dailyJournalEmail", checked)}
              disabled={preferences.tier === "free"}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="security-alerts" className="flex flex-col space-y-1">
              <span>Security Alerts</span>
              <span className="font-normal text-sm text-muted-foreground">Get notified about important security-related activities</span>
            </Label>
            <Switch id="security-alerts" checked={preferences.securityAlerts} onCheckedChange={(checked) => handlePreferenceChange("securityAlerts", checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Management Alerts</CardTitle>
          <CardDescription>Set up alerts for risk management.</CardDescription>
          {preferences.tier === "free" && <span className="text-xs text-primary">Pro/Enterprise feature</span>}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="risk-alerts" className="flex flex-col space-y-1">
              <span>Risk Management Alerts</span>
              <span className="font-normal text-sm text-muted-foreground">Get alerts when trades exceed your risk parameters</span>
            </Label>
            <Switch
              id="risk-alerts"
              checked={preferences.riskAlerts}
              onCheckedChange={(checked) => handlePreferenceChange("riskAlerts", checked)}
              disabled={preferences.tier === "free"}
            />
          </div>

          {preferences.riskAlerts && preferences.tier !== "free" && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-daily-loss">Maximum Daily Loss (%)</Label>
                  <Input
                    id="max-daily-loss"
                    type="number"
                    placeholder="e.g., 2"
                    value={preferences.maxDailyLoss || ""}
                    onChange={(e) => handlePreferenceChange("maxDailyLoss", parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-weekly-loss">Maximum Weekly Loss (%)</Label>
                  <Input
                    id="max-weekly-loss"
                    type="number"
                    placeholder="e.g., 5"
                    value={preferences.maxWeeklyLoss || ""}
                    onChange={(e) => handlePreferenceChange("maxWeeklyLoss", parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="consecutive-losses">Consecutive Loss Limit</Label>
                <Input
                  id="consecutive-losses"
                  type="number"
                  placeholder="e.g., 3"
                  value={preferences.consecutiveLossLimit || ""}
                  onChange={(e) => handlePreferenceChange("consecutiveLossLimit", parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground mt-1">Get alerted after this many consecutive losing trades</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  );
}
