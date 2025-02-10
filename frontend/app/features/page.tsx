"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LineChart, Zap, Brain, Target, ChartBar, Shield } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Brain className="w-12 h-12 text-blue-500" />,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze market patterns and trends to provide actionable trading insights.",
  },
  {
    icon: <LineChart className="w-12 h-12 text-blue-500" />,
    title: "Pattern Recognition",
    description: "Automatically identify chart patterns and potential trading opportunities with high accuracy.",
  },
  {
    icon: <Target className="w-12 h-12 text-blue-500" />,
    title: "Smart Alerts",
    description: "Get real-time notifications for market movements and pattern formations that match your trading strategy.",
  },
  {
    icon: <ChartBar className="w-12 h-12 text-blue-500" />,
    title: "Performance Analytics",
    description: "Track your trading performance with detailed analytics and AI-driven improvement suggestions.",
  },
  {
    icon: <Zap className="w-12 h-12 text-blue-500" />,
    title: "Real-Time Processing",
    description: "Lightning-fast analysis of market data with our optimized desktop application.",
  },
  {
    icon: <Shield className="w-12 h-12 text-blue-500" />,
    title: "Secure & Private",
    description: "Your trading data stays private with enterprise-grade security and local processing.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
              <h1 className="text-4xl font-bold sm:text-5xl">AI-Powered Trading Analysis</h1>
              <p className="text-xl text-muted-foreground">Advanced analysis tools powered by machine learning to enhance your trading decisions</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500">
                  Get Started Free
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="relative space-y-4 p-6 bg-background/50 backdrop-blur-xl rounded-xl border">
                  <div className="p-3 bg-blue-500/10 rounded-lg w-fit">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">Ready to enhance your trading?</h2>
            <p className="text-muted-foreground">Join thousands of traders using AI-powered analysis to make better trading decisions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 w-full sm:w-auto">
                  Start Trading Now
                </Button>
              </Link>
              <Link href="/desktop">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Download Desktop App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
