"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, LineChart, Zap, Shield } from "lucide-react";

export default function DesktopPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
              <h1 className="text-4xl font-bold sm:text-5xl">TradeTracker Desktop</h1>
              <p className="text-xl text-muted-foreground">Powerful AI trading analysis right on your desktop</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500">
                <Download className="mr-2 h-4 w-4" />
                Download for Windows
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">Version 1.0.0 • macOS coming soon</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative space-y-4 p-6 bg-background/50 backdrop-blur-xl rounded-xl border">
                <div className="p-3 bg-blue-500/10 rounded-lg w-fit">
                  <LineChart className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Analysis</h3>
                <p className="text-muted-foreground">Get instant AI-powered analysis of your trades and market conditions directly from your desktop</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative space-y-4 p-6 bg-background/50 backdrop-blur-xl rounded-xl border">
                <div className="p-3 bg-blue-500/10 rounded-lg w-fit">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Native Performance</h3>
                <p className="text-muted-foreground">Experience lightning-fast analysis with our native desktop application built for performance</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative space-y-4 p-6 bg-background/50 backdrop-blur-xl rounded-xl border">
                <div className="p-3 bg-blue-500/10 rounded-lg w-fit">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Secure & Private</h3>
                <p className="text-muted-foreground">Your trading data stays on your computer, ensuring maximum privacy and security</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">Ready to elevate your trading?</h2>
            <p className="text-muted-foreground">Download TradeTracker Desktop today and experience AI-powered trading analysis like never before.</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500">
              <Download className="mr-2 h-4 w-4" />
              Download Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
