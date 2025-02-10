"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-24 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
        Trading, Enhanced
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Experience the future of trading with AI-powered analysis, automation,
        and insights.
      </p>
    </motion.div>
  );
}
