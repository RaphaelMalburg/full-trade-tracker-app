import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { OnboardingForm } from "@/components/features/onboarding/onboarding-form";

export default async function OnboardingPage() {
  const user = await auth();
  if (!user?.id) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background/95 flex items-center justify-center mt-16">
      <div className="container max-w-[800px] relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4">
          <div className="flex flex-col space-y-2 text-center mb-4">
            <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">Welcome to Trade Tracker</h1>
            <p className="text-muted-foreground">Let&apos;s get you set up for success</p>
          </div>

          <Card className="p-6 backdrop-blur-sm border border-primary/10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent rounded-lg" />
            <div className="relative">
              <OnboardingForm />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
