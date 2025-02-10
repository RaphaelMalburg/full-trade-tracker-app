"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MT4EAGuide() {
  return (
    <div className="min-h-screen bg-background/50 dark:bg-[#0A0B0D] py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <Button
            variant="ghost"
            asChild
            className="mb-8 hover:bg-background/60"
          >
            <Link href="/plugins">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plugins
            </Link>
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              MetaTrader 4 EA Setup Guide
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Learn how to install and configure the Trade Journal Expert
              Advisor (EA) in MetaTrader 4 for automated trade tracking.
            </p>
          </motion.div>
        </div>

        {/* Setup Steps */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,400px] gap-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-8 overflow-hidden group hover:border-primary/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Prerequisites
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>MetaTrader 4 installed</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Active trading account</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Trade Tracker Pro API key</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Expert Advisors enabled by your broker</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-8 overflow-hidden group hover:border-primary/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  Download & Install
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Download the Expert Advisor
                      </p>
                      <p className="text-muted-foreground">
                        Download the Trade Journal EA (.ex4 file) from the
                        downloads section and save it to your computer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Install in MetaTrader 4
                      </p>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Open MetaTrader 4
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Go to File → Open Data Folder
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Open the "experts" folder
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Copy the downloaded .ex4 file here
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Restart MetaTrader 4
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-8 overflow-hidden group hover:border-primary/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Configuration
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Enable Expert Advisors
                      </p>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Go to Tools → Options → Expert Advisors
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Enable "Allow automated trading"
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Enable "Allow DLL imports"
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Enable "Allow WebRequest for listed URL"
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Add "https://api.tradetracker.pro" to allowed URLs
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Note:</strong> Some
                        brokers may have additional requirements for enabling
                        Expert Advisors. Contact your broker's support if
                        needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-8 overflow-hidden group hover:border-primary/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Attach & Configure EA
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Attach to Chart
                      </p>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Open any chart
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Open Navigator window (Ctrl+N)
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Find "Trade Journal" under Expert Advisors
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Drag and drop it onto the chart
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Configure Settings
                      </p>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Enter your Trade Tracker Pro API key
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Enable "Allow live trading"
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Enable "Allow DLL imports"
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Click "OK" to start the EA
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Images Column */}
          <div className="space-y-8 sticky top-24 h-fit hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden group hover:border-primary/50 transition-colors duration-300"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src="/guides/mt4/ea-settings.png"
                  alt="MT4 Expert Advisor Settings"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Configure the Expert Advisor settings in MetaTrader 4
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden group hover:border-primary/50 transition-colors duration-300"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src="/guides/mt4/ea-running.png"
                  alt="EA Running on Chart"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  The Expert Advisor running on a chart with successful
                  connection
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Verification Steps</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm font-medium">1</span>
                </div>
                <p className="text-muted-foreground">
                  Check if the EA icon in the top-right corner is smiling
                </p>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm font-medium">2</span>
                </div>
                <p className="text-muted-foreground">
                  Look for "EA initialized successfully" in the "Experts" tab
                </p>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm font-medium">3</span>
                </div>
                <p className="text-muted-foreground">
                  Place a test trade and verify it appears in your Trade Tracker
                  Pro journal
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 p-8 mt-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Troubleshooting</h2>
            <div className="grid gap-6">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-primary mr-2" />
                  EA Shows ☹ or X Icon
                </h3>
                <p className="text-muted-foreground">
                  Verify automated trading and DLL imports are enabled in
                  settings
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-primary mr-2" />
                  WebRequest Failed
                </h3>
                <p className="text-muted-foreground">
                  Check if the API URL is properly added to the allowed
                  WebRequest URLs
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-primary mr-2" />
                  Invalid API Key
                </h3>
                <p className="text-muted-foreground">
                  Verify your API key is entered correctly in the EA settings
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
