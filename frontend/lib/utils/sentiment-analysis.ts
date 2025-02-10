type PatternAnalysis = {
  patterns: string[];
  conditions: string[];
  risks: string[];
};

export const analyzeSentiment = (
  analysis: PatternAnalysis,
): "BULLISH" | "BEARISH" | "NEUTRAL" => {
  const bullishKeywords = [
    "bullish",
    "breakout",
    "support holding",
    "oversold",
    "buy signal",
    "trend reversal up",
  ];

  const bearishKeywords = [
    "bearish",
    "breakdown",
    "resistance holding",
    "overbought",
    "sell signal",
    "trend reversal down",
  ];

  const content = [
    ...analysis.patterns,
    ...analysis.conditions,
    ...analysis.risks,
  ]
    .join(" ")
    .toLowerCase();

  const bullishMatches = bullishKeywords.filter((kw) =>
    content.includes(kw),
  ).length;
  const bearishMatches = bearishKeywords.filter((kw) =>
    content.includes(kw),
  ).length;

  if (bullishMatches > bearishMatches + 2) return "BULLISH";
  if (bearishMatches > bullishMatches + 2) return "BEARISH";
  return "NEUTRAL";
};
