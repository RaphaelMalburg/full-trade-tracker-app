"use client";

import { motion } from "framer-motion";
import { Brain, LineChart, Target } from "lucide-react";

const metrics = [
  {
    icon: LineChart,
    label: "Real-time",
    value: "$2.5M+",
    description: "Daily trading volume analyzed",
  },
  {
    icon: Brain,
    label: "AI-Powered",
    value: "10K+",
    description: "Patterns analyzed daily",
  },
  {
    icon: Target,
    label: "Success Rate",
    value: "85%",
    description: "Average prediction accuracy",
  },
];

export function MetricsShowcase() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Light mode glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.15] via-primary/[0.1] to-transparent rounded-xl blur-[2px] group-hover:blur-[5px] transition-all duration-500" />

            {/* Dark mode glow effect */}
            <div className="absolute hidden dark:block inset-0 bg-gradient-to-br from-[hsl(var(--trading-green))]/10 via-[hsl(var(--trading-green))]/5 to-transparent rounded-xl blur-xl transition-opacity duration-500" />

            {/* Card */}
            <div className="relative p-6 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-[12px] border border-white/40 dark:border-white/[0.05] shadow-lg shadow-black/[0.03] dark:shadow-none hover:border-primary/30 dark:hover:border-[hsl(var(--trading-green))]/20 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 dark:bg-[hsl(var(--trading-green))]/10">
                  <metric.icon className="w-5 h-5 text-primary dark:text-[hsl(var(--trading-green))]" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </span>
              </div>
              <p className="text-3xl font-bold mt-4 text-foreground">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {metric.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
