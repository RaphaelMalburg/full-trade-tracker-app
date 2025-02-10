"use client";

import { motion } from "framer-motion";
import { Shield, Scale, Lock } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    title: "Protected Trading",
    description: "Your trading data and personal information are secured with enterprise-grade encryption.",
  },
  {
    icon: <Scale className="w-8 h-8 text-blue-500" />,
    title: "Fair Usage",
    description: "We maintain transparent pricing and fair usage policies for all our services.",
  },
  {
    icon: <Lock className="w-8 h-8 text-blue-500" />,
    title: "Privacy First",
    description: "Your data privacy is our priority, with strict controls on data access and sharing.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="prose prose-gray dark:prose-invert max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 my-16">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative p-6 rounded-xl border bg-background/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent rounded-xl" />
                <div className="relative">
                  <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 my-8">
            <h2 className="mt-0 text-2xl font-bold">Trading Risk Disclosure</h2>
            <p className="mb-0 text-muted-foreground">
              Trading in financial instruments involves significant risks and may not be suitable for all investors. Before using our services, please consider your investment
              objectives, level of experience, and risk appetite. You could sustain a loss of some or all of your investment. Past performance is not indicative of future results.
            </p>
          </div>

          <h2>1. Service Agreement</h2>
          <p>
            By accessing or using TradeTracker services, including our website, desktop application, and AI analysis tools, you agree to be bound by these Terms of Service and all
            applicable laws and regulations.
          </p>

          <h2>2. Service Description</h2>
          <p>Our services include but are not limited to:</p>
          <ul>
            <li>AI-powered trading analysis and pattern recognition</li>
            <li>Real-time market data analysis and insights</li>
            <li>Performance tracking and portfolio analytics</li>
            <li>Desktop application for enhanced trading analysis</li>
            <li>Educational resources and market research</li>
          </ul>

          <h2>3. User Responsibilities</h2>
          <ul>
            <li>Maintain accurate and up-to-date account information</li>
            <li>Protect account credentials and access</li>
            <li>Use services in compliance with applicable laws</li>
            <li>Report any unauthorized access or security concerns</li>
            <li>Not attempt to manipulate or misuse our systems</li>
          </ul>

          <h2>4. Data Usage and Privacy</h2>
          <p>
            We collect and process data in accordance with our Privacy Policy. This includes trading data, user preferences, and usage information to improve our services and
            provide personalized experiences.
          </p>

          <h2>5. Subscription Terms</h2>
          <ul>
            <li>Subscription fees are billed according to the selected plan</li>
            <li>Automatic renewals can be managed in account settings</li>
            <li>Refunds are handled according to our refund policy</li>
            <li>We reserve the right to modify pricing with notice</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our services are owned by TradeTracker and protected by international copyright, trademark, and other intellectual property
            laws.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            TradeTracker is not liable for any trading losses, decisions, or consequences resulting from the use of our services. Our AI analysis tools are for informational
            purposes only and should not be considered as financial advice.
          </p>

          <h2>8. Account Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our services for violations of these terms or for any other reason at our discretion. Users may terminate their
            accounts at any time through account settings.
          </p>

          <h2>9. Modifications to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms. Users will be notified of significant
            changes.
          </p>

          <div className="mt-12 p-6 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-0">
              For questions about these terms, please contact us at{" "}
              <a href="mailto:legal@tradetracker.com" className="text-blue-500 hover:text-blue-600">
                legal@tradetracker.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
