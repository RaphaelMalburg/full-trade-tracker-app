"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, Bell, UserCheck } from "lucide-react";

const privacyFeatures = [
  {
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    title: "Data Protection",
    description: "Enterprise-grade encryption for all your trading data and personal information.",
  },
  {
    icon: <Lock className="w-8 h-8 text-blue-500" />,
    title: "Secure Storage",
    description: "Advanced security measures to protect your data at rest and in transit.",
  },
  {
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    title: "Privacy Controls",
    description: "Granular control over your data sharing and privacy preferences.",
  },
  {
    icon: <Server className="w-8 h-8 text-blue-500" />,
    title: "Local Processing",
    description: "Desktop app processes sensitive data locally on your device.",
  },
  {
    icon: <Bell className="w-8 h-8 text-blue-500" />,
    title: "Transparency",
    description: "Clear notifications about how your data is used and processed.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-blue-500" />,
    title: "User Rights",
    description: "Full control over your data with easy export and deletion options.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="prose prose-gray dark:prose-invert max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">Your privacy is our priority. Learn how we protect and manage your data.</p>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Privacy Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
            {privacyFeatures.map((feature) => (
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

          <h2>1. Data Collection</h2>
          <p>We collect and process the following types of information:</p>
          <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
            <div className="p-6 rounded-xl border bg-background/50">
              <h3 className="text-lg font-semibold mb-3">Essential Data</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Account information (email, name)</li>
                <li>Authentication credentials</li>
                <li>Trading preferences and settings</li>
                <li>User-provided profile information</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border bg-background/50">
              <h3 className="text-lg font-semibold mb-3">Usage Data</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Trading patterns and analytics</li>
                <li>Feature usage statistics</li>
                <li>Performance metrics</li>
                <li>Technical diagnostics</li>
              </ul>
            </div>
          </div>

          <h2>2. How We Use Your Data</h2>
          <p>Your data helps us provide and improve our services:</p>
          <ul>
            <li>Personalize your trading analysis experience</li>
            <li>Generate AI-powered insights and recommendations</li>
            <li>Improve our algorithms and analysis accuracy</li>
            <li>Provide customer support and technical assistance</li>
            <li>Ensure platform security and prevent fraud</li>
            <li>Send important updates and notifications</li>
          </ul>

          <h2>3. Data Protection</h2>
          <p>We implement industry-leading security measures to protect your data:</p>
          <ul>
            <li>End-to-end encryption for sensitive data</li>
            <li>Regular security audits and penetration testing</li>
            <li>Secure data centers with redundant backups</li>
            <li>Access controls and authentication protocols</li>
            <li>Regular security training for our team</li>
          </ul>

          <h2>4. Your Privacy Rights</h2>
          <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
            <div className="p-6 rounded-xl border bg-background/50">
              <h3 className="text-lg font-semibold mb-3">Data Access</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Request a copy of your data</li>
                <li>Export trading history and analytics</li>
                <li>View and update personal information</li>
                <li>Access usage logs and activity history</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border bg-background/50">
              <h3 className="text-lg font-semibold mb-3">Data Control</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Delete your account and data</li>
                <li>Opt-out of data collection</li>
                <li>Manage marketing preferences</li>
                <li>Control data sharing settings</li>
              </ul>
            </div>
          </div>

          <h2>5. Data Sharing</h2>
          <p>We only share your data with trusted partners and service providers who help us deliver our services. We never sell your personal information to third parties.</p>

          <h2>6. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to improve your experience and analyze platform usage. You can control cookie preferences through your browser settings.</p>

          <h2>7. Updates to Privacy Policy</h2>
          <p>We may update this policy to reflect changes in our practices or legal requirements. We'll notify you of significant changes via email or platform notifications.</p>

          <div className="mt-12 p-6 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-0">
              For privacy-related questions or concerns, please contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@tradetracker.com" className="text-blue-500 hover:text-blue-600">
                privacy@tradetracker.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
