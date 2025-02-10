"use client";

import BillingDashboard from "@/components/features/billing/billing-dashboard";
import { withAuth } from "@/components/shared/with-auth";

function BillingPage() {
  return (
    <div className="container max-w-6xl py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and credit purchases</p>
      </div>
      <BillingDashboard />
    </div>
  );
}

export default withAuth(BillingPage);
