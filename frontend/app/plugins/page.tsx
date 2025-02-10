"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Download,
  ChevronRight,
  Sparkles,
  GitBranch,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const platforms = [
  {
    name: "cTrader",
    logo: "/platforms/logo-ctrader.png",
    description: "Advanced trading platform with sophisticated tools",
    downloads: [
      {
        name: "Trade Journal Webhook",
        description: "Automatically sync your trades",
        downloadUrl: "/downloads/ctrader/trade-journal-webhook.algo",
        setupGuide: "/guides/ctrader-webhook",
      },
      {
        name: "AI Assistant Integration",
        description: "Enable AI-powered analysis",
        downloadUrl: "/downloads/ctrader/ai-assistant.algo",
        setupGuide: "/guides/ctrader-webhook",
      },
    ],
  },
  {
    name: "MetaTrader 4",
    logo: "/platforms/logo-metatrader.png",
    description: "World's most popular forex trading platform",
    downloads: [
      {
        name: "Trade Journal EA",
        description: "Automatic trade tracking",
        downloadUrl: "/downloads/mt4/trade-journal.ex4",
        setupGuide: "/guides/mt4-ea",
      },
      {
        name: "AI Assistant EA",
        description: "AI-powered analysis",
        downloadUrl: "/downloads/mt4/ai-assistant.ex4",
        setupGuide: "/guides/mt4-ea",
      },
    ],
  },
  {
    name: "MetaTrader 5",
    logo: "/platforms/logo-metatrader.png",
    description: "Next-generation multi-asset trading platform",
    downloads: [
      {
        name: "Trade Journal EA",
        description: "Automatic trade tracking",
        downloadUrl: "/downloads/mt5/trade-journal.ex5",
        setupGuide: "/guides/mt5-ea",
      },
      {
        name: "AI Assistant EA",
        description: "AI-powered analysis",
        downloadUrl: "/downloads/mt5/ai-assistant.ex5",
        setupGuide: "/guides/mt5-ea",
      },
    ],
  },
];

export default function PluginsPage() {
  return (
    <div className="min-h-screen bg-background/50 dark:bg-[#0A0B0D] py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">
              Platform Integrations
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          >
            Download & Install
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Get started with our platform integrations to enable automatic trade
            journaling and AI features
          </motion.p>
        </div>

        {/* Platforms Grid */}
        <div className="grid gap-8 mb-20">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative">
                {/* Platform Card */}
                <div className="relative bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Platform Header */}
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl" />
                      <Image
                        src={platform.logo}
                        alt={platform.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {platform.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  {/* Downloads Section */}
                  <div className="border-t border-border/50">
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                      {platform.downloads.map((download) => (
                        <div
                          key={download.name}
                          className="p-6 md:p-8 group/download hover:bg-primary/5 transition-colors duration-300"
                        >
                          <div className="flex flex-col h-full">
                            <h3 className="text-xl font-semibold mb-2 group-hover/download:text-primary transition-colors">
                              {download.name}
                            </h3>
                            <p className="text-muted-foreground mb-6 flex-grow">
                              {download.description}
                            </p>
                            <div className="flex items-center gap-4 relative z-10">
                              <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() =>
                                  (window.location.href = download.setupGuide)
                                }
                              >
                                Setup Guide
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                              </Button>
                              <Button
                                size="sm"
                                className="cursor-pointer"
                                onClick={() =>
                                  (window.location.href = download.downloadUrl)
                                }
                              >
                                <Download className="mr-2 h-4 w-4 group-hover/button:scale-110 transition-transform" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <GitBranch className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">
              Coming Soon
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">More Platforms</h2>
          <p className="text-muted-foreground">
            We're working on adding support for more trading platforms
          </p>
        </motion.div>
      </div>
    </div>
  );
}
