import { AIFeature, SubscriptionStatus as PrismaSubscriptionStatus, SubscriptionTier as PrismaSubscriptionTier } from "@prisma/client";

export type BillingInterval = "monthly" | "yearly";

export const TIER_VALUES = {
  FREE: PrismaSubscriptionTier.free,
  PRO: PrismaSubscriptionTier.pro,
  ENTERPRISE: PrismaSubscriptionTier.enterprise,
} as const;

export type TierValue = PrismaSubscriptionTier;

export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: "FREE",
    name: "Free",
    description: "Perfect for getting started with automated trading",
    popular: false,
    features: ["50 trades/month", "Basic trade journal", "Single platform integration", "15 AI credits/month", "Community support", "Basic analytics dashboard"],
    prices: {
      monthly: {
        amount: 0,
        priceId: "",
      },
      yearly: {
        amount: 0,
        priceId: "",
      },
    },
  },
  PRO: {
    id: "PRO",
    name: "Pro",
    description: "For serious traders who want to scale their success",
    popular: true,
    features: [
      "Unlimited trades",
      "Advanced trade journal",

      "100 AI credits/month",
      "Priority support",
      "Advanced analytics & reports",
      "Trading bot marketplace discount",

      "Real-time market alerts",
    ],
    prices: {
      monthly: {
        amount: 18.99,
        priceId: "price_1QjRbSDQoH9Sl5KXhQWfoJ6y",
      },
      yearly: {
        amount: 203.88,
        priceId: "price_1QjQLUDQoH9Sl5KXSzT95tVR",
      },
    },
  },
  ENTERPRISE: {
    id: "ENTERPRISE",
    name: "Enterprise",
    description: "For trading teams and institutions",
    popular: false,
    features: [
      "Everything in Pro, plus:",
      "Unlimited team members",
      "150 AI credits/month",
      "API access & webhooks",
      "Custom integrations",
      "Dedicated account manager",
      "1-on-1 training sessions",
      "Custom feature development",
      "Custom trade strategies",
    ],
    prices: {
      monthly: {
        amount: 59,
        priceId: "price_1QjQP3DQoH9Sl5KXG2cvSymf",
      },
      yearly: {
        amount: 575.88,
        priceId: "price_1QjQQJDQoH9Sl5KXAWHbQGSW",
      },
    },
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export const FEATURE_CREDIT_COSTS = {
  [AIFeature.TRADING_INSIGHTS]: 1, // Chat messages
  [AIFeature.CHART_ANALYSIS]: 3, // AI chart analysis
  [AIFeature.RISK_ANALYSIS]: 4, // Risk analysis
} as const;

export const MONTHLY_CREDITS = {
  FREE: 15,
  PRO: 100,
  ENTERPRISE: 150,
} as const;

export const CREDIT_PACKAGES = [
  {
    id: "CREDITS_50",
    description: "Starter Pack",
    credits: 50,
    price: 17.49,
    proPrice: 13.99,
    discount: 20,
    featured: false,
    priceId: "price_1QfpLEDQoH9Sl5KXwtTnFpv7",
    proPriceId: "price_1QfpLEDQoH9Sl5KXwtTnFpv8",
  },
  {
    id: "CREDITS_200",
    description: "Popular Pack",
    credits: 200,
    price: 49.99,
    proPrice: 39.99,
    discount: 20,
    featured: true,
    priceId: "price_1QfpLdDQoH9Sl5KXKI3IU9iM",
    proPriceId: "price_1QfpLdDQoH9Sl5KXKI3IU9iN",
  },
  {
    id: "CREDITS_500",
    description: "Power Pack",
    credits: 500,
    price: 99.99,
    proPrice: 79.99,
    discount: 20,
    featured: false,
    priceId: "price_1QfpLxDQoH9Sl5KXmWldFNbN",
    proPriceId: "price_1QfpLxDQoH9Sl5KXmWldFNbO",
  },
] as const;

export const SUBSCRIPTION_FEATURES = {
  FREE: {
    maxTrades: 50,
    platforms: 1,
    monthlyCredits: MONTHLY_CREDITS.FREE,
    storage: "1GB",
    teamMembers: 1,
    support: "Community",
    features: ["Basic trade tracking", "Simple analytics", "Single platform integration", `${MONTHLY_CREDITS.FREE} monthly AI credits`, "Community support"],
  },
  PRO: {
    maxTrades: "Unlimited",
    platforms: "All",
    monthlyCredits: MONTHLY_CREDITS.PRO,
    storage: "10GB",
    teamMembers: 1,
    support: "Priority",
    features: [
      "Everything in Free",
      "Unlimited trades",
      "Advanced analytics",
      "All platform integrations",
      `${MONTHLY_CREDITS.PRO} monthly AI credits`,
      "20% discount on credit packages",
      "Priority support",
      "API access",
    ],
  },
  ENTERPRISE: {
    maxTrades: "Unlimited",
    platforms: "All",
    monthlyCredits: MONTHLY_CREDITS.ENTERPRISE,
    storage: "50GB",
    teamMembers: "Unlimited",
    support: "Dedicated",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      `${MONTHLY_CREDITS.ENTERPRISE} monthly AI credits`,
      "Custom integrations",
      "Dedicated support",
      "Training sessions",
      "Custom feature development",
    ],
  },
} as const;

export const FEATURE_CREDITS = {
  CHAT: {
    name: "AI Trading Assistant",
    credits: FEATURE_CREDIT_COSTS[AIFeature.TRADING_INSIGHTS],
    description: "Get personalized trading advice and market analysis",
    tooltip: "Our AI analyzes market conditions and your trading history to provide actionable insights and recommendations",
  },
  CHART: {
    name: "Smart Chart Analysis",
    credits: FEATURE_CREDIT_COSTS[AIFeature.CHART_ANALYSIS],
    description: "Advanced pattern recognition and predictions",
    tooltip: "AI-powered technical analysis that identifies patterns, support/resistance levels, and potential entry/exit points",
  },
} as const;

export const BILLING_LABELS = {
  monthly: "Monthly billing",
  yearly: "Yearly billing (Save 20%)",
} as const;
