"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "./glass-card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps } from "recharts";

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  data?: ChartData[];
  dataKey?: string;
  gradient?: "primary" | "secondary" | "accent" | "none";
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export function ChartCard({ title, value, subtitle, data, dataKey = "value", gradient = "primary", stats, className, ...props }: ChartCardProps) {
  const CustomTooltip = React.useCallback(({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
              <span className="font-bold">{payload[0].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  return (
    <GlassCard gradient={gradient} className={cn("w-full", className)} {...props}>
      <GlassCardHeader>
        <div className="flex items-center justify-between">
          <GlassCardTitle>{title}</GlassCardTitle>
          <button className="rounded-full p-2 hover:bg-accent">
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-4xl font-bold tracking-tighter">{value}</span>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {data && (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `${value}`} />
                  <Tooltip content={CustomTooltip} />
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    strokeWidth={2}
                    activeDot={{
                      r: 4,
                      style: { fill: "var(--primary)" },
                    }}
                    style={
                      {
                        stroke: "var(--primary)",
                        "--primary": "hsl(var(--primary))",
                      } as React.CSSProperties
                    }
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {stats && (
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}
