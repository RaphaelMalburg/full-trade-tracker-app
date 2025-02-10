"use client";

import CreditDashboard from "@/components/features/credits/credit-dashboard";
import { withAuth } from "@/components/shared/with-auth";

function CreditsPage() {
  return (
    <div className="container max-w-6xl py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Credits</h1>
        <p className="text-muted-foreground">Manage your AI credits and purchase more</p>
      </div>
      <CreditDashboard />
    </div>
  );
}

export default withAuth(CreditsPage);
