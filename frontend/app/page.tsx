"use client";

import { Background } from "@/components/ui/background-variations";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <Background variant="gradient">
      <div className="relative min-h-screen ">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-lg bg-background/50 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold text-foreground">
              TT
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-8">
              {["Home", "Features", "Pricing", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>AI-Powered Trading Solutions</span>
                </motion.div>
                <motion.h1 className="text-6xl font-bold tracking-tight text-foreground" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  Advanced
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Market Analysis</span>
                </motion.h1>
              </div>
              <motion.p className="text-lg text-muted-foreground max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                Leverage AI-powered insights and real-time analytics to make data-driven trading decisions. Professional tools for modern traders.
              </motion.p>

              {/* CTA Section */}
              <motion.div className="flex items-center gap-4 pt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-12">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-blue-200 hover:bg-blue-50/10 text-foreground px-8 h-12">
                  <PlayCircle className="mr-2 h-4 w-4 text-blue-500" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                className="grid grid-cols-2 gap-8 pt-8 border-t border-border/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}>
                <div className="space-y-2">
                  <span className="text-4xl font-bold text-foreground">250k+</span>
                  <p className="text-sm text-muted-foreground">Active traders using our platform</p>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-bold text-foreground">800k+</span>
                  <p className="text-sm text-muted-foreground">Successful trades executed</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side with interface preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 backdrop-blur-3xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border border-border">
                {/* Trading Interface Mockup */}
                <div className="absolute inset-0 p-8">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-400/5 backdrop-blur-xl border border-border/50">
                    {/* Add trading interface elements here */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Section - Trading Copilot */}
        <Background variant="dots" className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden">
              <div className="relative grid lg:grid-cols-2 gap-12 items-center p-12 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border border-border">
                <div className="space-y-8">
                  <motion.h2
                    className="text-4xl font-bold text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}>
                    Trading Copilot
                  </motion.h2>
                  <motion.p
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}>
                    Your AI-powered trading assistant that helps you make informed decisions with real-time market analysis.
                  </motion.p>
                  <motion.ul className="space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
                    {["Real-time market analysis", "AI-powered trading signals", "Risk management tools", "Portfolio optimization"].map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3 text-muted-foreground">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>
                <div className="relative aspect-square">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/5 to-cyan-400/5 backdrop-blur-xl border border-border">
                    {/* Trading Interface Preview */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </Background>
      </div>
    </Background>
  );
}
