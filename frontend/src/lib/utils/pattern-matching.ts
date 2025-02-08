import { generateEmbedding, findSimilarPatterns, findSimilarPrinciples } from "./vector";
import { type SimilarPatternResult, type ChartAnalysisResult, type SimilarPrincipleResult } from "@/lib/types/ai";

export interface MarketCondition {
  symbol: string;
  timeframe: string;
  price: number;
  previousPrices: number[];
  volume?: number;
  volatility?: number;
  trend?: "up" | "down" | "sideways";
  indicators?: {
    rsi?: number;
    macd?: {
      value: number;
      signal: number;
      histogram: number;
    };
    movingAverages?: {
      ma20: number;
      ma50: number;
      ma200: number;
    };
  };
}

export async function analyzeChart(condition: MarketCondition, minConfidence = 0.7): Promise<ChartAnalysisResult> {
  try {
    // Generate a description of the market condition
    const description = `
      ${condition.symbol} on ${condition.timeframe} timeframe at price ${condition.price}.
      ${condition.trend ? `Current trend is ${condition.trend}.` : ""}
      ${condition.volatility ? `Volatility is ${condition.volatility}.` : ""}
      Price movement: ${describePriceMovement(condition.previousPrices)}
      ${describeIndicators(condition.indicators)}
    `.trim();

    // Generate embedding for the market condition
    const embedding = await generateEmbedding(description);

    // Find similar patterns and principles
    const [patterns, principles] = await Promise.all([findSimilarPatterns(embedding, 3), findSimilarPrinciples(embedding, 5)]);

    // Filter patterns by confidence
    const filteredPatterns = patterns.filter((p) => p.similarity >= minConfidence);

    // Generate suggestions based on patterns and principles
    const suggestions = generateSuggestions(filteredPatterns, principles, condition);

    // Calculate overall confidence
    const confidence = calculateConfidence(filteredPatterns, principles);

    return {
      patterns: filteredPatterns,
      principles,
      suggestions,
      confidence,
    };
  } catch (error) {
    console.error("Error analyzing chart:", error);
    throw error;
  }
}

function describePriceMovement(prices: number[]): string {
  if (prices.length < 2) return "insufficient price data";

  const changes = prices.slice(1).map((price, i) => price - prices[i]);
  const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
  const volatility = Math.sqrt(changes.map((c) => Math.pow(c - avgChange, 2)).reduce((sum, sq) => sum + sq, 0) / changes.length);

  return `
    Average price change: ${avgChange.toFixed(4)},
    Volatility: ${volatility.toFixed(4)},
    Direction: ${avgChange > 0 ? "upward" : avgChange < 0 ? "downward" : "sideways"}
  `.trim();
}

function describeIndicators(indicators?: MarketCondition["indicators"]): string {
  if (!indicators) return "";

  const descriptions: string[] = [];

  if (indicators.rsi !== undefined) {
    descriptions.push(`RSI: ${indicators.rsi}`);
  }

  if (indicators.macd) {
    descriptions.push(`MACD: value=${indicators.macd.value}, signal=${indicators.macd.signal}, histogram=${indicators.macd.histogram}`);
  }

  if (indicators.movingAverages) {
    const { ma20, ma50, ma200 } = indicators.movingAverages;
    descriptions.push(`Moving Averages: MA20=${ma20}, MA50=${ma50}, MA200=${ma200}`);
  }

  return descriptions.join(". ");
}

function generateSuggestions(patterns: SimilarPatternResult[], principles: SimilarPrincipleResult[], condition: MarketCondition): string[] {
  const suggestions: string[] = [];

  // Add pattern-based suggestions
  patterns.forEach((pattern) => {
    suggestions.push(`${pattern.name} pattern detected with ${(pattern.similarity * 100).toFixed(1)}% confidence.`);

    if (pattern.failureConditions.length > 0) {
      suggestions.push("Watch out for these failure conditions: " + pattern.failureConditions.join(", "));
    }
  });

  // Add principle-based suggestions
  principles
    .filter((p) => p.importance >= 8)
    .forEach((p) => {
      suggestions.push(...p.warnings);
    });

  // Add indicator-based suggestions
  if (condition.indicators) {
    if (condition.indicators.rsi !== undefined) {
      if (condition.indicators.rsi > 70) {
        suggestions.push("RSI indicates overbought conditions");
      } else if (condition.indicators.rsi < 30) {
        suggestions.push("RSI indicates oversold conditions");
      }
    }

    if (condition.indicators.macd) {
      const { value, signal } = condition.indicators.macd;
      if (value > signal) {
        suggestions.push("MACD shows bullish momentum");
      } else if (value < signal) {
        suggestions.push("MACD shows bearish momentum");
      }
    }
  }

  return suggestions;
}

function calculateConfidence(patterns: SimilarPatternResult[], principles: SimilarPrincipleResult[]): number {
  if (patterns.length === 0) return 0;

  // Calculate average pattern confidence
  const patternConfidence = patterns.reduce((sum, p) => sum + p.similarity, 0) / patterns.length;

  // Weight high-importance principles more heavily
  const importantPrinciples = principles.filter((p) => p.importance >= 8);
  const principleConfidence = importantPrinciples.length > 0 ? importantPrinciples.reduce((sum, p) => sum + p.similarity, 0) / importantPrinciples.length : 0;

  // Combine confidences with weights
  return patternConfidence * 0.7 + principleConfidence * 0.3;
}
