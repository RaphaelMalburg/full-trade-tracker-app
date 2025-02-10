"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, LineChart, Webhook, Bot } from "lucide-react";

const features = [
  {
    title: "Computer Vision Analysis",
    description:
      "Advanced chart pattern recognition and market analysis powered by AI.",
    icon: Brain,
  },
  {
    title: "Platform Integration",
    description:
      "Seamless connection with major trading platforms via webhooks and APIs.",
    icon: Webhook,
  },
  {
    title: "Automated Trading Journal",
    description:
      "Auto-generated trading journal with detailed analytics and insights.",
    icon: LineChart,
  },
  {
    title: "Trading Bots Marketplace",
    description:
      "Discover and deploy automated trading strategies from verified developers.",
    icon: Bot,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[hsl(var(--trading-background))] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/20 via-primary/10 to-transparent dark:from-[hsl(var(--trading-green))]/20 dark:via-[hsl(var(--trading-green))]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent dark:from-[hsl(var(--trading-green))]/20 dark:via-[hsl(var(--trading-green))]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 dark:from-[hsl(var(--trading-green))]/10 dark:via-transparent dark:to-[hsl(var(--trading-green))]/10 opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary dark:from-[hsl(var(--trading-green))] to-primary/60 dark:to-[hsl(var(--trading-green))]/60 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-200 max-w-2xl mx-auto drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
            Everything you need to enhance your trading experience and make
            data-driven decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 min-h-[240px] bg-white/90 dark:bg-[hsl(var(--trading-card))]/95 backdrop-blur-xl border-primary/10 dark:border-[hsl(var(--trading-green))]/10 hover:border-primary/30 dark:hover:border-[hsl(var(--trading-green))]/30 transition-all shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary dark:from-[hsl(var(--trading-green))] to-primary/60 dark:to-[hsl(var(--trading-green))]/60 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
                  <feature.icon className="h-12 w-12 text-primary dark:text-[hsl(var(--trading-green))] relative drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white mt-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground dark:text-gray-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
