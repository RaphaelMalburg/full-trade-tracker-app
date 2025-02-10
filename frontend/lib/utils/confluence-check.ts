import { TradingPattern, TradingPrinciple } from "@prisma/client";

export const generateConfluenceChecklist = (
  patterns: TradingPattern[],
  principles: TradingPrinciple[],
): string => {
  const checks: string[] = [];

  // Pattern-based checks
  patterns.forEach((pattern) => {
    checks.push(
      `✓ ${pattern.name} Pattern Detected`,
      `  - Required Confirmation: ${pattern.conditions}`,
      `  - Typical Success Rate: ${Math.round((pattern.successRate || 0) * 100)}%`,
    );
  });

  // Principle-based checks
  principles.forEach((principle) => {
    checks.push(
      `✓ ${principle.category} Principle: ${principle.name}`,
      `  - Application: ${principle.description}`,
      `  - Key Rule: ${JSON.stringify(principle.rules)}`,
    );
  });

  // Risk management checklist
  checks.push(
    "✓ Risk/Reward Validation",
    "  - Minimum 1:2 R/R Ratio Required",
    "  - Position Size Verified Against Volatility",
  );

  return checks.join("\n");
};
