"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Steps } from "@/components/ui/steps";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Platform } from "@/lib/const/platforms";
import { saveOnboardingPreferences } from "@/lib/actions/user/onboarding";
import { getTradingAccounts } from "@/lib/actions/accounts/trading-accounts";
import { initDemoData } from "@/lib/actions/user/init-user";
import { useUserStore } from "@/lib/store/use-user-store";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const steps = [
  {
    title: "Profile Setup",
    description: "Tell us about yourself",
  },
  {
    title: "Trading Experience",
    description: "Your trading background",
  },
  {
    title: "Platform Setup",
    description: "Connect your trading platform",
  },
  {
    title: "Demo Account",
    description: "Start with a demo account",
  },
];

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedToS, setAcceptedToS] = useState(false);
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    yearsTrading: "",
    tradingStyle: "",
    preferredMarkets: [] as string[],
    platform: "" as Platform | "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        if (!formData.name.trim()) {
          toast.error("Please enter your name");
          return false;
        }
        return true;
      case 1:
        if (!formData.yearsTrading) {
          toast.error("Please select your trading experience");
          return false;
        }
        if (!formData.tradingStyle) {
          toast.error("Please select your trading style");
          return false;
        }
        return true;
      case 2:
        if (!formData.platform) {
          toast.error("Please select your preferred trading platform");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) return;

    if (!acceptedToS) {
      toast.error("Please accept the Terms of Service to continue");
      return;
    }

    setIsLoading(true);

    try {
      if (!user?.id) {
        throw new Error("User not found");
      }

      await saveOnboardingPreferences({
        name: formData.name,
        bio: formData.bio || null,
        yearsTrading: formData.yearsTrading,
        tradingStyle: formData.tradingStyle,
        platform: formData.platform as Platform,
        acceptedToS: true,
      });

      const accounts = await getTradingAccounts();
      if (accounts.length === 0) {
        await initDemoData(user.id);
      }

      toast.success("Setup completed! Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during onboarding:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Your Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-background/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-background/50 min-h-[100px] resize-none"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="yearsTrading">
                Years of Trading Experience{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.yearsTrading}
                onValueChange={(value) =>
                  handleInputChange("yearsTrading", value)
                }
                required
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label htmlFor="tradingStyle">
                Primary Trading Style <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.tradingStyle}
                onValueChange={(value) =>
                  handleInputChange("tradingStyle", value)
                }
                required
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day Trading</SelectItem>
                  <SelectItem value="swing">Swing Trading</SelectItem>
                  <SelectItem value="position">Position Trading</SelectItem>
                  <SelectItem value="scalping">Scalping</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="platform">
                Preferred Trading Platform{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.platform}
                onValueChange={(value) =>
                  handleInputChange("platform", value as Platform)
                }
                required
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Platform).map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              We&apos;ve created a demo account for you with $10,000 virtual
              balance and some sample trades. This will help you explore the
              platform&apos;s features before connecting your real trading
              account.
            </p>
            <div className="rounded-lg border border-primary/10 p-6 bg-background/50">
              <h3 className="font-medium text-lg mb-4">Demo Account Details</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                  Initial Balance: $10,000
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                  Sample trades included
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                  All features unlocked
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                  Risk-free practice
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Steps steps={steps} currentStep={currentStep} className="mb-6" />

      <div className="min-h-[250px]">{renderStep()}</div>

      <div className="flex flex-col space-y-4 pt-4 border-t">
        {currentStep === steps.length - 1 && (
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedToS}
              onCheckedChange={(checked) => setAcceptedToS(checked as boolean)}
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-muted-foreground">
                By accepting, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || isLoading}
          >
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              type="submit"
              disabled={isLoading || !acceptedToS}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing Setup...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90"
            >
              Next Step
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
