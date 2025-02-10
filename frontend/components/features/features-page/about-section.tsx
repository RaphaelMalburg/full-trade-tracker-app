"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-20 text-center max-w-4xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
        Your AI-Powered Trading Companion
      </h2>
      <div className="space-y-6 text-muted-foreground">
        <p className="text-lg">
          Trade Tracker revolutionizes your trading experience by combining
          advanced computer vision technology with sophisticated AI algorithms.
          Our platform seamlessly analyzes market patterns, automates your
          trading journal, and provides real-time insights to help you make
          informed decisions.
        </p>
        <p className="text-lg">
          Whether you're a day trader focusing on quick opportunities or a swing
          trader looking for longer-term positions, our AI copilot adapts to
          your trading style. With enterprise-grade security and reliable
          platform integrations, you can focus on what matters most - making
          successful trades.
        </p>
      </div>
    </motion.div>
  );
}
