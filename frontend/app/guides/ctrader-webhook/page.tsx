"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CTraderWebhookGuide() {
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
              cTrader Webhook Setup Guide
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Learn how to set up the Trade Journal webhook in cTrader for
              automated trade tracking and analysis.
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
                    <span>cTrader Desktop installed</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Active cTrader account</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span>Trade Tracker Pro API key</span>
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
                        Download the Webhook Bot
                      </p>
                      <p className="text-muted-foreground">
                        Download the Trade Journal webhook bot from the
                        downloads section and save it to your computer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Install in cTrader
                      </p>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Open cTrader and go to the Automate section
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Click "Import Bot" and select the downloaded file
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Click "Open" to complete the import
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
                        Open Settings
                      </p>
                      <p className="text-muted-foreground">
                        Double-click the imported bot to access its settings
                        panel
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Configure API Key
                      </p>
                      <p className="text-muted-foreground">
                        Enter your Trade Tracker Pro API key in the designated
                        field
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Select Data to Sync
                      </p>
                      <p className="text-muted-foreground">
                        Choose which trading data you want to synchronize
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
                  Start & Verify
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-base text-foreground font-medium mb-2">
                        Start the Bot
                      </p>
                      <ol className="space-y-3 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Select your preferred chart/symbol
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Click "Start" in the bot window
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3 flex-shrink-0" />
                          Verify the bot status shows as "Running"
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Important:</strong>{" "}
                        The bot needs to remain running to sync your trades. We
                        recommend adding it to your cTrader startup items.
                      </p>
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
                  src="/guides/ctrader/step1.png"
                  alt="cTrader Automate Section"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  The cTrader Automate section where you'll import the bot
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
                  src="/guides/ctrader/step2.png"
                  alt="Bot Configuration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Configure the bot settings with your API key
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
                  Place a test trade in cTrader
                </p>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm font-medium">2</span>
                </div>
                <p className="text-muted-foreground">
                  Open your Trade Tracker Pro journal
                </p>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-sm font-medium">3</span>
                </div>
                <p className="text-muted-foreground">
                  Verify the trade appears within a few seconds
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
                  API Key Issues
                </h3>
                <p className="text-muted-foreground">
                  Verify your API key is entered correctly in the bot settings
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-primary mr-2" />
                  Bot Not Running
                </h3>
                <p className="text-muted-foreground">
                  Check if the bot shows as "Running" in the Automate window
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-primary mr-2" />
                  Connection Issues
                </h3>
                <p className="text-muted-foreground">
                  Ensure your internet connection is stable and check cTrader's
                  "Automate" logs
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
