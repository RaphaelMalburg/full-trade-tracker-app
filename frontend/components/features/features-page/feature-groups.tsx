"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Brain, ChartBar, Eye, LineChart, Lock, Plug, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featureGroups = [
  {
    title: "AI-Powered Analysis",
    tagline: "See what others miss",
    description: "Our advanced AI systems analyze market patterns and trading opportunities in real-time.",
    features: [
      {
        title: "Computer Vision Analysis",
        description: "Advanced pattern recognition that sees and analyzes charts like a professional trader",
        icon: Eye,
      },
      {
        title: "AI Trading Copilot",
        description: "Real-time trade suggestions and market analysis powered by advanced AI",
        icon: Bot,
      },
      {
        title: "AI Insights",
        description: "Personalized trading insights and recommendations from your historical data",
        icon: Brain,
      },
    ],
    imagePath: "/features/ai-analysis.png",
    imageAlt: "AI Trading Analysis Visualization",
  },
  {
    title: "Trading Automation",
    tagline: "Trade smarter, not harder",
    description: "Automate your trading workflow with powerful integration and customization options.",
    features: [
      {
        title: "Platform Integration",
        description: "Seamless connection with major trading platforms through official APIs",
        icon: Plug,
      },
      {
        title: "Custom Alerts",
        description: "Personalized notifications based on your trading strategy",
        icon: Zap,
      },
      {
        title: "Trading Bot Marketplace",
        description: "Discover and deploy pre-built trading bots or sell your own",
        icon: Rocket,
      },
    ],
    imagePath: "/features/automation.png",
    imageAlt: "Trading Automation System",
  },
  {
    title: "Performance Analytics",
    tagline: "Master your trading journey",
    description: "Comprehensive analytics and journaling to track and improve your trading performance.",
    features: [
      {
        title: "Automated Trading Journal",
        description: "Auto-generated journal with detailed performance metrics",
        icon: ChartBar,
      },
      {
        title: "Real-time Analytics",
        description: "Live performance tracking and visualization",
        icon: LineChart,
      },
      {
        title: "Secure Infrastructure",
        description: "Enterprise-grade security for your trading data",
        icon: Lock,
      },
    ],
    imagePath: "/features/analytics.png",
    imageAlt: "Trading Analytics Dashboard",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeatureGroups() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {featureGroups.map((group, groupIndex) => (
        <motion.section
          key={groupIndex}
          variants={itemVariants}
          className={`py-24 ${groupIndex % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"} flex flex-col lg:flex-row items-center gap-12`}>
          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-primary text-sm font-medium">{group.tagline}</span>
              <h2 className="text-3xl md:text-4xl font-bold">{group.title}</h2>
              <p className="text-muted-foreground text-lg">{group.description}</p>
            </div>

            <div className="space-y-6">
              {group.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/5">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {groupIndex === 0 && (
              <Link href="/sign-up" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Start Trading Now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square w-full max-w-lg mx-auto rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm before:absolute before:inset-0 before:z-10 before:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
              <div className="absolute inset-0 bg-grid-white/5" />
              <Image src={group.imagePath} alt={group.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority={groupIndex === 0} />
            </div>
          </div>
        </motion.section>
      ))}
    </motion.div>
  );
}
