import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type BackgroundVariant = "gradient" | "mesh" | "dots" | "subtle" | "solid";

interface BackgroundProps {
  children: React.ReactNode;
  variant?: BackgroundVariant;
  className?: string;
  animate?: boolean;
}

interface BaseElement {
  className: string;
}

interface AnimatedElement extends BaseElement {
  animation: string;
  style?: never;
}

interface StyledElement extends BaseElement {
  style: Record<string, string>;
  animation?: never;
}

type BackgroundElement = AnimatedElement | StyledElement;

interface VariantConfig {
  wrapper: string;
  elements: BackgroundElement[];
}

export function Background({ children, variant = "gradient", className = "", animate = true }: BackgroundProps) {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  const baseClasses = "relative min-h-screen w-full overflow-hidden";
  const themeClasses = isDark ? "bg-slate-950" : "bg-slate-50";

  const variantClasses: Record<BackgroundVariant, VariantConfig> = {
    gradient: {
      wrapper: "absolute inset-0 overflow-hidden",
      elements: [
        {
          className: `absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full ${
            isDark ? "bg-gradient-to-r from-blue-500/20 to-cyan-400/20" : "bg-gradient-to-r from-blue-400/30 to-cyan-300/30"
          } blur-3xl`,
          animation: "pulse 8s infinite",
        },
        {
          className: `absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full ${
            isDark ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20" : "bg-gradient-to-r from-blue-500/30 to-cyan-400/30"
          } blur-3xl`,
          animation: "pulse 8s infinite 4s",
        },
      ],
    },
    mesh: {
      wrapper: "absolute inset-0",
      elements: [
        {
          className: `absolute inset-0 ${
            isDark ? "bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10" : "bg-gradient-to-br from-blue-400/20 via-transparent to-cyan-300/20"
          }`,
          style: {
            backgroundImage: `radial-gradient(${isDark ? "#3b82f610" : "#3b82f620"} 1px, transparent 1px), radial-gradient(${isDark ? "#22d3ee10" : "#22d3ee20"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px, 35px 35px",
            backgroundPosition: "0 0, 20px 20px",
            opacity: "0.5",
          },
        },
        {
          className: `absolute inset-0 ${
            isDark ? "bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5" : "bg-gradient-to-br from-blue-400/10 via-transparent to-cyan-300/10"
          }`,
          style: {
            backgroundImage: `linear-gradient(${isDark ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.1)"} 1px, transparent 1px), linear-gradient(to right, ${isDark ? "rgba(34, 211, 238, 0.05)" : "rgba(34, 211, 238, 0.1)"} 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            opacity: "0.3",
          },
        },
      ],
    },
    dots: {
      wrapper: "absolute inset-0",
      elements: [
        {
          className: `absolute inset-0 ${isDark ? "bg-slate-900/50" : "bg-slate-100/50"}`,
          style: {
            backgroundImage: `radial-gradient(${isDark ? "#3b82f620" : "#3b82f630"} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          },
        },
      ],
    },
    subtle: {
      wrapper: "absolute inset-0",
      elements: [
        {
          className: `absolute inset-0 ${
            isDark ? "bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800/90" : "bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-100/90"
          }`,
          style: { opacity: "1" },
        },
      ],
    },
    solid: {
      wrapper: "absolute inset-0",
      elements: [
        {
          className: isDark ? "bg-slate-900" : "bg-slate-50",
          style: { opacity: "1" },
        },
      ],
    },
  };

  const selectedVariant = variantClasses[variant];

  return (
    <div className={cn(baseClasses, themeClasses, className)}>
      <div className={selectedVariant.wrapper}>
        {selectedVariant.elements.map((element, index) => {
          const elementStyle = element.animation && animate ? { animation: element.animation } : element.style || {};

          return <div key={index} className={element.className} style={elementStyle} />;
        })}
      </div>
      <div className="relative z-10">{children}</div>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
