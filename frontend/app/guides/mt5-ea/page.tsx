"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MT5EAGuide() {
  return (
    <div className="min-h-screen bg-background/50 dark:bg-[#0A0B0D] py-24">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/plugins">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plugins
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">
            MetaTrader 5 EA Setup Guide
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn how to install and configure the Trade Journal Expert Advisor
            (EA) in MetaTrader 5
          </p>
        </div>

        {/* Setup Steps */}
        <div className="space-y-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>MetaTrader 5 installed</li>
              <li>Active trading account</li>
              <li>Trade Tracker Pro API key</li>
              <li>Algorithmic trading enabled by your broker</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 1: Download the Expert Advisor
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              <li>Download the Trade Journal EA (.ex5 file)</li>
              <li>Note the download location</li>
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 2: Install the EA
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              <li>Open MetaTrader 5</li>
              <li>Press Ctrl+N to open the Navigator window</li>
              <li>Right-click on "Expert Advisors"</li>
              <li>Select "Open Data Folder"</li>
              <li>Navigate to MQL5 → Experts</li>
              <li>Copy the downloaded .ex5 file here</li>
              <li>Restart MetaTrader 5</li>
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 3: Configure MetaTrader 5
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              <li>Go to Tools → Options → Expert Advisors</li>
              <li>Enable "Allow Automated Trading"</li>
              <li>Enable "Allow WebRequest for listed URL"</li>
              <li>Add "https://api.tradetracker.pro" to allowed URLs</li>
              <li>Click "OK" to save settings</li>
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Step 4: Attach the EA
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              <li>Open any chart</li>
              <li>Find "Trade Journal" in the Navigator window</li>
              <li>Drag and drop it onto the chart</li>
              <li>
                In the EA settings window:
                <ul className="list-disc list-inside ml-8 mt-2">
                  <li>Enter your Trade Tracker Pro API key</li>
                  <li>Configure sync settings</li>
                  <li>Enable "Allow live trading"</li>
                </ul>
              </li>
              <li>Click "OK" to start the EA</li>
            </ol>
            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm">
                <strong>Note:</strong> The EA must remain active on at least one
                chart to sync your trades. We recommend setting up a dedicated
                chart for this purpose.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Verification</h2>
            <p className="text-muted-foreground mb-4">
              To verify the setup is working:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              <li>
                Check the EA icon in the top-right of the chart is smiling
                (green)
              </li>
              <li>Place a test trade</li>
              <li>Check your Trade Tracker Pro journal</li>
              <li>The trade should appear within a few seconds</li>
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Common Issues</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">EA Shows Red X</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Check if automated trading is enabled</li>
                  <li>Verify API URL is in allowed WebRequest URLs</li>
                  <li>Ensure your API key is correct</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Trades Not Syncing</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Check EA logs in the "Experts" tab</li>
                  <li>Verify internet connection</li>
                  <li>Ensure EA is allowed to trade</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
