"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CTraderAIGuide() {
  return (
    <div className="min-h-screen bg-background/50 dark:bg-[#0A0B0D] py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/plugins">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plugins
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            cTrader AI Assistant Setup Guide
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn how to set up the AI Assistant integration in cTrader
          </p>
        </div>

        {/* Setup Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>cTrader Desktop installed</li>
                <li>Active cTrader account</li>
                <li>Trade Tracker Pro API key</li>
                <li>Pro or Enterprise subscription</li>
                <li>Available AI credits</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Step 1: Download the AI Assistant
              </h2>
              <p className="text-muted-foreground mb-4">
                Download the AI Assistant bot from the downloads section and
                save it to your computer.
              </p>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm">
                  <strong>Note:</strong> The AI Assistant is a separate bot from
                  the Trade Journal webhook. You'll need both for full
                  functionality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Step 2: Install in cTrader
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li>Open cTrader</li>
                <li>Go to the Automate section</li>
                <li>Click "Import Bot"</li>
                <li>Select the downloaded AI Assistant file</li>
                <li>Click "Open" to import</li>
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Step 3: Configure the AI Assistant
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li>Double-click the imported bot to open settings</li>
                <li>Enter your Trade Tracker Pro API key</li>
                <li>
                  Configure AI analysis preferences:
                  <ul className="list-disc list-inside ml-8 mt-2">
                    <li>Chart pattern recognition</li>
                    <li>Support/resistance levels</li>
                    <li>Trade suggestions</li>
                    <li>Risk management alerts</li>
                  </ul>
                </li>
                <li>Set analysis timeframes</li>
                <li>Click "Save" to apply settings</li>
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Step 4: Start Using AI Features
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                <li>Select your preferred chart</li>
                <li>Click "Start" in the bot window</li>
                <li>Wait for initial analysis to complete</li>
                <li>
                  AI insights will appear in:
                  <ul className="list-disc list-inside ml-8 mt-2">
                    <li>Chart annotations</li>
                    <li>Bot window notifications</li>
                    <li>Trade Tracker Pro dashboard</li>
                  </ul>
                </li>
              </ol>
            </motion.div>
          </div>

          {/* Images Column */}
          <div className="space-y-8 sticky top-24 h-fit hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/guides/ctrader/ai-setup.png"
                  alt="AI Assistant Configuration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Configure the AI Assistant settings and analysis preferences
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/guides/ctrader/ai-analysis.png"
                  alt="AI Analysis Example"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Example of AI-powered chart analysis and annotations
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">AI Credit Usage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Understanding AI credit consumption:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Pattern Recognition: 3 credits per analysis</li>
                <li>Trade Suggestions: 2 credits per suggestion</li>
                <li>Risk Analysis: 1 credit per calculation</li>
              </ul>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm">
                  <strong>Tip:</strong> Configure analysis intervals carefully
                  to optimize credit usage. More frequent updates consume more
                  credits.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6 mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Common issues and solutions:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>"No credits available" - Purchase additional AI credits</li>
                <li>"Analysis failed" - Check internet connection and retry</li>
                <li>"Invalid API key" - Verify your API key in settings</li>
                <li>"Feature not available" - Check your subscription tier</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
