"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: "primary" | "secondary" | "accent" | "none";
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({ gradient = "none", hover = true, className, children, ...props }: GlassCardProps) {
  return (
    <div className={cn("glass-card", hover && "hover-card", gradient !== "none" && `gradient-${gradient}`, className)} {...props}>
      {children}
    </div>
  );
}

export function GlassCardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function GlassCardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("font-semibold leading-none tracking-tight text-xl", className)} {...props}>
      {children}
    </h3>
  );
}

export function GlassCardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function GlassCardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function GlassCardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center pt-4", className)} {...props}>
      {children}
    </div>
  );
}
