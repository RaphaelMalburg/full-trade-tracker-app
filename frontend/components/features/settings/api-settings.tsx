"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw, Eye, EyeOff, Copy } from "lucide-react";
import { useUserStore } from "@/lib/store/use-user-store";
import { getApiKey, regenerateApiKey } from "@/lib/actions/user/api-keys";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export function APISettings() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const user = useUserStore((state) => state.user);

  const fetchApiKey = async () => {
    try {
      setLoading(true);
      const result = await getApiKey();
      if (result.success) {
        setApiKey(result.apiKey ?? null);
        setShowApiKey(true);
      } else {
        toast.error(result.error || "Failed to fetch API key");
      }
    } catch (error) {
      toast.error("Failed to fetch API key");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApiKey();
  }, []);

  const handleRegenerateKey = async () => {
    toast.warning(
      "Warning: Regenerating your API key will immediately invalidate the previous one.",
      {
        action: {
          label: "Proceed",
          onClick: async () => {
            try {
              setLoading(true);
              const result = await regenerateApiKey();
              if (result.success) {
                setApiKey(result.apiKey ?? null);
                setShowApiKey(true);
                toast.success("API key regenerated successfully");
              } else {
                toast.error(result.error || "Failed to regenerate API key");
              }
            } catch (error) {
              toast.error("Failed to regenerate API key");
            } finally {
              setLoading(false);
            }
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
        duration: 6000,
      },
    );
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const copyToClipboard = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        toast.success("API key copied to clipboard", {
          description:
            "Your API key has been copied. Remember to keep it secure!",
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
          duration: 3000,
        });
      } catch (err) {
        toast.error("Failed to copy API key", {
          description: "Please try again or copy manually",
          duration: 3000,
        });
      }
    } else {
      toast.error("No API key available to copy", {
        description: "Please generate an API key first",
        duration: 3000,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>
          Manage your API keys for programmatic access to the platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your API Key</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey || "••••••••••••••••"}
                readOnly
                className="font-mono pr-28"
              />
              <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-transparent"
                        onClick={toggleApiKeyVisibility}
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {showApiKey ? "Hide API Key" : "Show API Key"}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-transparent"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to Clipboard</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-transparent"
                        onClick={handleRegenerateKey}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Regenerate API Key</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Keep this key secure. It provides full access to your account via
            the API.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
