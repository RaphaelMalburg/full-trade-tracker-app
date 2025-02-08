"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartCard } from "@/components/ui/chart-card";

const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 450 },
  { name: "May", value: 600 },
  { name: "Jun", value: 550 },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40rem] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl" />
          <div className="absolute -top-[30rem] right-[11rem] h-[60rem] w-[60rem] rounded-full bg-gradient-to-l from-blue-400/20 to-emerald-400/20 blur-3xl" />
        </div>

        {/* Content */}
        <div className="container relative pt-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">AI-Powered Chart Analysis & Trading Knowledge</h1>
                <p className="text-xl text-muted-foreground">
                  Enhance your trading with advanced pattern recognition and a comprehensive knowledge hub powered by artificial intelligence.
                </p>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                  <Link href="/analysis">Try Analysis</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/hub">Explore Hub</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-r from-blue-400 to-indigo-400" />
                  ))}
                </div>
                <p>Join 2,000+ traders using our platform</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              <ChartCard
                title="Pattern Recognition"
                value="85%"
                subtitle="Confidence Score"
                data={sampleData}
                gradient="primary"
                stats={[
                  { label: "Patterns Found", value: "3" },
                  { label: "Accuracy", value: "92%" },
                ]}
              />
              <div className="absolute -right-4 top-1/2 rotate-12">
                <GlassCard className="w-64" gradient="secondary">
                  <div className="space-y-2 p-4">
                    <div className="h-2 w-1/2 rounded bg-primary/20" />
                    <div className="h-2 w-3/4 rounded bg-primary/20" />
                    <div className="h-2 w-1/3 rounded bg-primary/20" />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-32 grid gap-8 md:grid-cols-3">
            <GlassCard gradient="none" className="relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-2xl" />
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-600/10 p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Real-time Analysis</h3>
                <p className="text-sm text-muted-foreground">Get instant pattern recognition and market analysis powered by advanced AI algorithms.</p>
              </div>
            </GlassCard>

            <GlassCard gradient="none" className="relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-2xl" />
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-600/10 p-2">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Knowledge Hub</h3>
                <p className="text-sm text-muted-foreground">Access a comprehensive library of trading patterns, strategies, and market insights.</p>
              </div>
            </GlassCard>

            <GlassCard gradient="none" className="relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-pink-600/20 to-red-600/20 blur-2xl" />
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-600/10 p-2">
                  <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Smart Insights</h3>
                <p className="text-sm text-muted-foreground">Get personalized recommendations and insights based on market conditions.</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </>
  );
}
