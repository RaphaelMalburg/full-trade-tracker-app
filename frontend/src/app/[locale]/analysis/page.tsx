"use client";

import { ChartCard } from "@/components/ui/chart-card";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";

const sampleData = [
  { name: "10:00", value: 120 },
  { name: "11:00", value: 150 },
  { name: "12:00", value: 135 },
  { name: "13:00", value: 180 },
  { name: "14:00", value: 165 },
  { name: "15:00", value: 200 },
  { name: "16:00", value: 185 },
];

const patternData = [
  { name: "Bullish", value: 75 },
  { name: "Bearish", value: 45 },
  { name: "Neutral", value: 60 },
  { name: "Reversal", value: 85 },
  { name: "Continuation", value: 70 },
];

export default function AnalysisPage() {
  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Chart Analysis</h1>
        <p className="text-muted-foreground">AI-powered pattern recognition and market analysis</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Market Activity"
          value="185.25"
          subtitle="Current price level"
          data={sampleData}
          gradient="primary"
          stats={[
            { label: "24h Change", value: "+2.5%" },
            { label: "Volume", value: "1.2M" },
          ]}
        />

        <ChartCard
          title="Pattern Recognition"
          value="85%"
          subtitle="Pattern confidence"
          data={patternData}
          gradient="secondary"
          stats={[
            { label: "Patterns Found", value: "3" },
            { label: "Reliability", value: "High" },
          ]}
        />

        <GlassCard className="md:col-span-2" gradient="accent">
          <GlassCardHeader>
            <GlassCardTitle>Analysis Results</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Detected Patterns</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span>Double Bottom (85% confidence)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span>Bullish Divergence (75% confidence)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span>Support Level (90% confidence)</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Key Insights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Strong support level identified at 180.00</li>
                  <li>• Positive momentum indicators</li>
                  <li>• Volume increasing on upward moves</li>
                  <li>• Multiple timeframe confirmation</li>
                </ul>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}
