"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI trading analysis work?",
    answer:
      "Our AI system analyzes chart patterns, market indicators, and historical data to provide insights and predictions about potential market movements. It uses advanced machine learning algorithms trained on millions of trading patterns to identify opportunities and risks.",
  },
  {
    question: "What types of analysis does the AI provide?",
    answer:
      "The AI provides pattern recognition, trend analysis, support/resistance levels, momentum indicators, and market sentiment analysis. Pro users get access to additional features like custom indicators and advanced pattern recognition.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "While no trading analysis is 100% accurate, our AI system maintains a high accuracy rate in pattern recognition and trend identification. However, it's important to use the AI insights as part of a comprehensive trading strategy rather than relying on them exclusively.",
  },
  {
    question: "Can I use the desktop app offline?",
    answer: "The desktop app requires an internet connection for real-time analysis and updates. However, you can view previously generated analyses and saved charts offline.",
  },
  {
    question: "What markets does the AI analysis support?",
    answer:
      "Our AI analysis supports major stock markets, forex pairs, and cryptocurrency markets. The system is trained on diverse market data to provide relevant insights across different trading instruments.",
  },
  {
    question: "How often is the AI model updated?",
    answer:
      "We continuously train and update our AI models with new market data and patterns. Updates are automatically deployed to ensure you always have access to the latest analysis capabilities.",
  },
  {
    question: "What technical requirements are needed?",
    answer:
      "For the desktop app, you need Windows 10 or later with at least 4GB RAM and 1GB free disk space. MacOS support is coming soon. The web version works on any modern browser.",
  },
  {
    question: "How do I get started?",
    answer:
      "Sign up for a free account to access basic AI analysis features. Download our desktop app for the best experience. Upgrade to Pro when you need more advanced features and unlimited analyses.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
            Frequently Asked Questions
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground">
            Everything you need to know about our AI trading analysis
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mt-16">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="/contact" className="text-blue-500 hover:text-blue-600 font-medium">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
