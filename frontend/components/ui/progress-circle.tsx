"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "danger";
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

const variantClasses = {
  default: "text-primary",
  success: "text-green-500",
  danger: "text-red-500",
};

export function ProgressCircle({
  value,
  max = 100,
  size = "md",
  variant = "default",
  className,
  ...props
}: ProgressCircleProps) {
  const percentage = (value / max) * 100;
  const strokeWidth = 10;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          className="text-muted-foreground/20"
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="currentColor"
        />
        {/* Progress circle */}
        <circle
          className={cn(
            "transition-all duration-300 ease-in-out",
            variantClasses[variant],
          )}
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
