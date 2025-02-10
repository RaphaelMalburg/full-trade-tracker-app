"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, LineChart } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[hsl(var(--trading-background))] overflow-hidden">
      {/* Background effects */}

      <div className="absolute inset-0">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent dark:from-[hsl(var(--trading-green))]/10 dark:via-[hsl(var(--trading-green))]/5 dark:to-transparent" />

        {/* Top-right gradient blob */}
        <div className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-bl from-primary/20 via-primary/10 to-transparent dark:from-[hsl(var(--trading-green))]/10 dark:via-[hsl(var(--trading-green))]/5 dark:to-transparent rounded-full blur-[120px]" />

        {/* Bottom-left gradient blob */}
        <div className="absolute -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent dark:from-[hsl(var(--trading-green))]/10 dark:via-[hsl(var(--trading-green))]/5 dark:to-transparent rounded-full blur-[120px]" />

        {/* Center accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent dark:via-[hsl(var(--trading-green))]/5" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl lg:text-6xl font-bold pb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary dark:from-[hsl(var(--trading-green))] to-primary/60 dark:to-[hsl(var(--trading-green))]/60 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Your AI-Powered Trading Copilot
            </h1>
            <p className="text-xl text-muted-foreground dark:text-gray-200 mb-8 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              Enhance your trading with computer vision analysis, real-time insights, and automated journaling. Connect with popular platforms and make data-driven decisions.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-primary dark:bg-[hsl(var(--trading-green))] text-primary-foreground dark:text-[hsl(var(--trading-background))] hover:bg-primary/90 dark:hover:bg-[hsl(var(--trading-dark-green))] group px-6">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary dark:border-[hsl(var(--trading-green))] text-primary dark:text-[hsl(var(--trading-green))] hover:bg-primary/10 dark:hover:bg-[hsl(var(--trading-green))]/10">
                View Demo
              </Button>
            </div>
          </motion.div>

          {/* AI Trading Analysis Demo */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative bg-white/90 dark:bg-[hsl(var(--trading-card))]/95 backdrop-blur-xl rounded-xl border border-primary/10 dark:border-[hsl(var(--trading-green))]/10 p-6 shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-primary/30 dark:hover:border-[hsl(var(--trading-green))]/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">AI Trading Analysis</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">Pattern Recognition</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 dark:bg-[hsl(var(--trading-green))]/60 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-[hsl(var(--trading-green))]"></span>
                  </span>
                </div>
              </div>

              {/* Chart Analysis Demo */}
              <div className="relative h-[300px] bg-gradient-to-tr from-primary/5 dark:from-[hsl(var(--trading-green))]/5 to-transparent rounded-lg p-4">
                {/* Price Chart */}
                <div className="flex items-end space-x-1 h-full">
                  {[40, 45, 42, 50, 45, 48, 52, 48, 50, 55, 52, 58, 54, 60, 58, 65, 62, 68].map((height, i) => (
                    <div key={i} style={{ height: `${height}%` }} className="flex-1 bg-primary/30 dark:bg-[hsl(var(--trading-green))]/30 rounded-sm transition-all" />
                  ))}
                </div>

                {/* AI Analysis Overlays */}
                <div className="absolute inset-0 p-4">
                  {/* Pattern Recognition Box */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute right-12 top-16 w-32 h-24 border-2 border-primary/50 dark:border-[hsl(var(--trading-green))]/50 rounded-lg">
                    <div className="absolute -top-6 left-2 bg-primary/20 dark:bg-[hsl(var(--trading-green))]/20 backdrop-blur-md rounded px-2 py-1">
                      <span className="text-xs font-medium text-primary dark:text-[hsl(var(--trading-green))] drop-shadow-[0_1px_1px_rgba(255, 255, 255, 0.84)]">
                        Bull Flag Pattern
                      </span>
                    </div>
                  </motion.div>

                  {/* Support Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-16 left-0 right-0 h-[1px] bg-primary/30 dark:bg-[hsl(var(--trading-green))]/30">
                    <div className="absolute -right-2 -top-6 bg-primary/20 dark:bg-[hsl(var(--trading-green))]/20 backdrop-blur-md rounded px-2 py-1">
                      <span className="text-xs font-medium text-primary dark:text-[hsl(var(--trading-green))] drop-shadow-[0_1px_1px_rgba(255, 255, 255, 0.84)]">
                        Support Level
                      </span>
                    </div>
                  </motion.div>

                  {/* Buy Signal */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute bottom-8 left-8 bg-primary/20 dark:bg-[hsl(var(--trading-green))]/20 backdrop-blur-md rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary dark:bg-[hsl(var(--trading-green))]" />
                      <span className="text-xs font-medium text-primary dark:text-[hsl(var(--trading-green))]  drop-shadow-[0_1px_1px_rgba(255, 255, 255, 0.84)]">
                        Strong Buy Signal
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-gray-300 mt-1">Confidence: 89%</p>
                  </motion.div>
                </div>
              </div>

              {/* Analysis Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground dark:text-[hsl(var(--trading-muted))]">Patterns Found</p>
                  <p className="text-lg font-semibold text-primary dark:text-[hsl(var(--trading-green))]">3</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground dark:text-[hsl(var(--trading-muted))]">Signal Accuracy</p>
                  <p className="text-lg font-semibold text-primary dark:text-[hsl(var(--trading-green))]">89%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground dark:text-[hsl(var(--trading-muted))]">Analysis Time</p>
                  <p className="text-lg font-semibold text-primary dark:text-[hsl(var(--trading-green))]">0.3s</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
