"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Metadata } from "next";
/*
export const metadata: Metadata = {
  title: "Pricing - Trade Tracker Pro",
  description: "Choose the perfect plan for your trading journey. From free tier to enterprise solutions, we have a plan that fits your needs.",
};*/

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started with AI trading analysis",
    features: ["Basic AI chart analysis", "5 analyses per day", "Standard response time", "Community support", "Desktop app access"],
    cta: "Get Started",
    href: "/sign-up",
  },
  {
    name: "Pro",
    price: "29",
    description: "For serious traders who need comprehensive analysis",
    features: [
      "Advanced AI chart analysis",
      "Unlimited analyses",
      "Priority response time",
      "Priority support",
      "Desktop app access",
      "Custom indicators",
      "Pattern recognition",
      "Market sentiment analysis",
    ],
    cta: "Upgrade to Pro",
    href: "/sign-up?plan=pro",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For trading firms and professional teams",
    features: ["Everything in Pro", "Custom AI models", "API access", "Team collaboration", "Dedicated support", "Custom integrations", "Advanced analytics", "SLA guarantee"],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            Simple, transparent pricing
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground">
            Choose the plan that best fits your trading needs
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group ${tier.featured ? "scale-105 md:-mt-4 md:-mb-4" : ""}`}>
              {tier.featured && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm py-1 text-center">
                  Most Popular
                </div>
              )}

              <div className={`h-full relative space-y-6 p-8 bg-background/50 backdrop-blur-xl rounded-xl border ${tier.featured ? "border-blue-500/20" : ""}`}>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className="text-muted-foreground">{tier.description}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-4xl font-bold">
                    ${tier.price}
                    {tier.price !== "Custom" && <span className="text-base font-normal text-muted-foreground">/month</span>}
                  </p>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${tier.featured ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500" : ""}`}
                  variant={tier.featured ? "default" : "outline"}>
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
