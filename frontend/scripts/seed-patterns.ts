/*import { prisma } from "@/lib/prisma";
import { PatternType } from "@prisma/client";


const patterns = [
  // Candlestick Patterns
  {
    name: "Doji",
    type: PatternType.CANDLESTICK,
    description:
      "A single candlestick pattern where opening and closing prices are nearly equal, creating a cross shape. Indicates market indecision.",
    conditions: {
      bodySize: "very small",
      openCloseDistance: "minimal",
      shadowLength: "varies",
      location: "after trend",
    },
    signals: {
      entry: {
        bullish: "When appears at support after downtrend",
        bearish: "When appears at resistance after uptrend",
      },
      stopLoss: "Below/above the Doji's low/high",
      targets: "Previous swing high/low",
    },
    reliability: 0.7,
    timeframes: ["1H", "4H", "DAILY"],
    timeframeBias: ["DAILY", "4H"],
    examples: ["USDJPY 2023-03-15 daily chart", "BTCUSD 2024-01-08 4h chart"],
    failureConditions: [
      "Low volume during formation",
      "Appears in sideways market",
      "No confirmation candle follow-through",
    ],
    successRate: 0.65,
  },
  {
    name: "Hammer",
    type: PatternType.CANDLESTICK,
    description:
      "Single candlestick with small body and long lower shadow. Hammer appears in downtrends, Shooting Star in uptrends.",
    conditions: {
      bodySize: "small",
      lowerShadow: "2-3x body size",
      upperShadow: "minimal",
      location: "after downtrend",
    },
    signals: {
      entry: {
        bullish: "Above hammer high with volume confirmation",
        timing: "Wait for next candle confirmation",
      },
      stopLoss: "Below hammer low",
      targets: "Previous resistance levels",
    },
    reliability: 0.75,
  },
  {
    name: "Engulfing Pattern",
    type: PatternType.CANDLESTICK,
    description:
      "Two-candle pattern where second candle completely engulfs first. Bullish or Bearish depending on direction.",
    conditions: {
      firstCandle: "small to medium body",
      secondCandle: "completely engulfs previous",
      volume: "increases on second candle",
      location: "at trend extremes",
    },
    signals: {
      entry: {
        bullish: "Above second candle high",
        bearish: "Below second candle low",
      },
      stopLoss: "Beyond the pattern's high/low",
      targets: "1.5-2x risk distance",
    },
    reliability: 0.8,
  },
  {
    name: "Morning Star",
    type: PatternType.CANDLESTICK,
    description:
      "Three-candle reversal pattern. Small middle candle shows market indecision before reversal.",
    conditions: {
      firstCandle: "large bearish",
      secondCandle: "small body with gap",
      thirdCandle: "large bullish",
      volume: "high on first and third candles",
    },
    signals: {
      entry: "Above third candle high",
      stopLoss: "Below pattern low",
      targets: "Previous resistance levels",
    },
    reliability: 0.75,
  },
  // Chart Patterns
  {
    name: "Head and Shoulders",
    type: PatternType.CHART_PATTERN,
    description:
      "Three-peak pattern with higher middle peak. Strong reversal signal.",
    conditions: {
      formation: "Three peaks, middle highest",
      neckline: "Connecting troughs between peaks",
      volume: "Decreases on each peak",
      timeframe: "Higher timeframes preferred",
    },
    signals: {
      entry: {
        bearish: "Break below neckline",
        confirmation: "Volume increase on break",
      },
      stopLoss: "Above right shoulder",
      targets: "Distance from head to neckline projected down",
    },
    reliability: 0.82,
  },
  {
    name: "Double Bottom",
    type: PatternType.CHART_PATTERN,
    description: "Two troughs at similar levels indicating reversal",
    conditions: {
      bottoms: "Two lows at similar price",
      volume: "Higher on second bottom",
      duration: "Longer formation more reliable",
      resistance: "Clear resistance between bottoms",
    },
    signals: {
      entry: "Break above resistance",
      stopLoss: "Below second bottom",
      targets: "Height of pattern projected up",
    },
    reliability: 0.78,
  },
  {
    name: "Cup and Handle",
    type: PatternType.CHART_PATTERN,
    description: "U-shaped price action followed by slight downward drift",
    conditions: {
      cup: "U-shaped, rounded bottom",
      handle: "Slight downward drift",
      depth: "Not too deep (ideal 30-40%)",
      duration: "1-6 months for cup, shorter handle",
    },
    signals: {
      entry: "Break above handle resistance",
      stopLoss: "Below handle low",
      targets: "Cup depth projected up",
    },
    reliability: 0.73,
  },
  // Price Action Patterns
  {
    name: "Pin Bar",
    type: PatternType.PRICE_ACTION,
    description: "Single bar with long wick showing rejection of prices",
    conditions: {
      bodySize: "small",
      wickSize: "at least 2-3x body",
      location: "at support/resistance",
      direction: "wick in opposite direction of reversal",
    },
    signals: {
      entry: {
        bullish: "Above high of pin bar",
        bearish: "Below low of pin bar",
      },
      stopLoss: "Beyond the wick",
      targets: "Previous swing levels",
    },
    reliability: 0.75,
  },
  {
    name: "Inside Bar",
    type: PatternType.PRICE_ACTION,
    description: "Bar completely contained within previous bar's range",
    conditions: {
      size: "Smaller than mother bar",
      location: "After strong move",
      volume: "Usually decreases",
      context: "Trending market",
    },
    signals: {
      entry: "Break of mother bar high/low",
      stopLoss: "Opposite side of mother bar",
      targets: "1.5-2x risk distance",
    },
    reliability: 0.7,
  },
  // Harmonic Patterns
  {
    name: "Gartley Pattern",
    type: PatternType.HARMONIC,
    description:
      "Five-point reversal pattern following specific Fibonacci ratios",
    conditions: {
      xaRatio: "0.618 retracement",
      abRatio: "0.618 of XA",
      bcRatio: "0.382-0.886 of AB",
      cdRatio: "1.27-1.618 of BC",
      dRatio: "0.786 of XA",
    },
    signals: {
      entry: "At point D completion",
      stopLoss: "Beyond point X",
      targets: "Multiple targets using Fibonacci",
    },
    reliability: 0.75,
  },
  // Fibonacci Patterns
  {
    name: "Fibonacci Retracement",
    type: PatternType.FIBONACCI,
    description: "Key levels based on Fibonacci ratios in trends",
    conditions: {
      trend: "Clear trend established",
      levels: "0.382, 0.5, 0.618, 0.786",
      volume: "Decreases during retracement",
      confluence: "Other technical levels align",
    },
    signals: {
      entry: "At key Fibonacci levels with confirmation",
      stopLoss: "Beyond next Fibonacci level",
      targets: "Extension levels",
    },
    reliability: 0.75,
  },
  // Trend Patterns
  {
    name: "Moving Average Crossover",
    type: PatternType.TREND,
    description: "Faster MA crosses slower MA indicating trend change",
    conditions: {
      fastMA: "Usually 10-20 periods",
      slowMA: "Usually 50-200 periods",
      volume: "Increases on crossover",
      angle: "Steeper angle more significant",
    },
    signals: {
      entry: {
        bullish: "Fast MA crosses above slow MA",
        bearish: "Fast MA crosses below slow MA",
      },
      stopLoss: "Below/above recent swing low/high",
      targets: "Previous support/resistance",
    },
    reliability: 0.75,
  },
  // Volatility Patterns
  {
    name: "Bollinger Band Squeeze",
    type: PatternType.VOLATILITY,
    description: "Bands contract indicating low volatility before expansion",
    conditions: {
      bandwidth: "Decreases to recent lows",
      duration: "Longer squeeze more significant",
      volume: "Decreases during squeeze",
      momentum: "Building momentum indicators",
    },
    signals: {
      entry: "Break of upper/lower band with volume",
      stopLoss: "Opposite band",
      targets: "2-3x band width",
    },
    reliability: 0.75,
  },
  // Momentum Patterns
  {
    name: "RSI Divergence",
    type: PatternType.MOMENTUM,
    description: "Price and RSI show opposing directions",
    conditions: {
      price: "New high/low",
      rsi: "Lower high/higher low",
      duration: "Longer divergence more significant",
      location: "At market extremes",
    },
    signals: {
      entry: "Break of trendline with volume",
      stopLoss: "Beyond recent extreme",
      targets: "Previous support/resistance",
    },
    reliability: 0.8,
  },
  // Reversal Patterns
  {
    name: "V-Bottom",
    type: PatternType.REVERSAL,
    description: "Sharp reversal with little consolidation",
    conditions: {
      decline: "Sharp and sustained",
      volume: "Climax volume at bottom",
      reversal: "Sharp and immediate",
      context: "After extended downtrend",
    },
    signals: {
      entry: "Break of first resistance",
      stopLoss: "Below V-bottom low",
      targets: "Fibonacci retracement levels",
    },
    reliability: 0.65,
  },
  // Continuation Patterns
  {
    name: "Flag Pattern",
    type: PatternType.CONTINUATION,
    description: "Brief pause in trend forming parallel lines",
    conditions: {
      pole: "Sharp price move",
      channel: "Parallel lines against trend",
      duration: "1-4 weeks typically",
      volume: "Decreases in flag",
    },
    signals: {
      entry: "Break of flag in trend direction",
      stopLoss: "Below/above flag pattern",
      targets: "Height of pole projected",
    },
    reliability: 0.8,
  },
  {
    name: "Pennant Pattern",
    type: PatternType.CONTINUATION,
    description: "Triangle consolidation in strong trend",
    conditions: {
      pole: "Strong directional move",
      consolidation: "Symmetrical triangle formation",
      duration: "Shorter than flag pattern",
      volume: "Decreases during consolidation",
    },
    signals: {
      entry: "Break of pennant in trend direction",
      stopLoss: "Below/above pennant",
      targets: "Height of pole projected",
    },
    reliability: 0.75,
  },
  {
    name: "Butterfly Pattern",
    type: PatternType.HARMONIC,
    description: "Five-point pattern with extreme projection point",
    conditions: {
      xaRatio: "0.786 retracement",
      abRatio: "0.382-0.886 of XA",
      bcRatio: "0.382-0.886 of AB",
      cdRatio: "1.618-2.618 of BC",
      dRatio: "1.27 of XA",
    },
    signals: {
      entry: "At point D completion",
      stopLoss: "Beyond point X",
      targets: "Multiple Fibonacci levels",
    },
    reliability: 0.8,
  },
  {
    name: "Trend Channel",
    type: PatternType.TREND,
    description: "Price action contained between parallel lines",
    conditions: {
      trendlines: "Two parallel lines containing price",
      touches: "Multiple touches of both lines",
      slope: "Clear directional bias",
      volume: "Consistent with trend",
    },
    signals: {
      entry: {
        withTrend: "Bounce off support/resistance",
        counterTrend: "Channel break with volume",
      },
      stopLoss: "Beyond channel boundary",
      targets: "Channel width projected",
    },
    reliability: 0.8,
  },
  {
    name: "Key Level Reversal",
    type: PatternType.REVERSAL,
    description: "Strong rejection at major support/resistance",
    conditions: {
      level: "Historical significant price level",
      rejection: "Strong price reaction",
      volume: "Spike on reversal",
      context: "Trend reaching exhaustion",
    },
    signals: {
      entry: "Break of reversal candle",
      stopLoss: "Beyond the key level",
      targets: "Previous support/resistance levels",
    },
    reliability: 0.8,
  },
  {
    name: "MACD Crossover",
    type: PatternType.MOMENTUM,
    description: "MACD line crosses signal line",
    conditions: {
      macdLine: "Crosses above/below signal line",
      histogram: "Changes direction",
      momentum: "Increasing momentum after cross",
      trend: "Aligned with larger trend",
    },
    signals: {
      entry: {
        bullish: "MACD crosses above signal",
        bearish: "MACD crosses below signal",
      },
      stopLoss: "Recent swing low/high",
      targets: "Previous resistance/support",
    },
    reliability: 0.75,
  },
  {
    name: "Volatility Breakout",
    type: PatternType.VOLATILITY,
    description: "Price breaks beyond recent volatility range",
    conditions: {
      range: "Clear consolidation period",
      breakout: "Strong move beyond range",
      volume: "Increases on breakout",
      volatility: "Expansion after contraction",
    },
    signals: {
      entry: "Break of volatility range",
      stopLoss: "Inside the range",
      targets: "1.5-2x range size",
    },
    reliability: 0.7,
  },
  {
    name: "Fibonacci Extension",
    type: PatternType.FIBONACCI,
    description: "Projected levels beyond trend moves",
    conditions: {
      trend: "Strong established trend",
      swing: "Clear swing high/low points",
      levels: "1.272, 1.414, 1.618, 2.000",
      confluence: "Aligns with other technicals",
    },
    signals: {
      entry: "Pullback to extension level",
      stopLoss: "Below/above previous swing",
      targets: "Next extension level",
    },
    reliability: 0.7,
  },
  // New Advanced Patterns
  {
    name: "Order Block Rejection",
    type: PatternType.PRICE_ACTION,
    description: "Price rejects a previous order block zone with precision",
    conditions: {
      zone: "Clear previous order block",
      rejection: "Minimum 3 touches with reaction",
      volume: "Increasing on rejection",
      timeframe: "Multiple timeframe confluence",
    },
    signals: {
      entry: "Close beyond rejection candle",
      stopLoss: "Mid-point of order block",
      targets: "1:2 risk-reward minimum",
    },
    reliability: 0.85,
    successRate: 0.78,
    failureConditions: [
      "Market in low liquidity session",
      "Fundamental news override",
      "False breakout scenarios",
    ],
    timeframeBias: ["15M", "1H", "4H"],
    examples: [
      "NAS100 2024-02-12 1h reversal",
      "XAUUSD 2023-11-28 15m reaction",
    ],
  },
  {
    name: "Smart Money Concept",
    type: PatternType.TREND,
    description:
      "Institutional order flow pattern showing accumulation or distribution",
    conditions: {
      structure: "Clear market structure break",
      volume: "Institutional volume signature",
      liquidity: "Visible liquidity pools",
      momentum: "Divergence with volume",
    },
    signals: {
      entry: "After structure confirmation",
      stopLoss: "Beyond structure break point",
      targets: "Major liquidity levels",
    },
    reliability: 0.9,
    timeframes: ["4H", "DAILY", "WEEKLY"],
    timeframeBias: ["4H", "DAILY", "WEEKLY"],
    examples: [
      "EURUSD 2024-01-15 daily accumulation",
      "BTCUSD 2023-12-20 4h distribution",
    ],
    failureConditions: [
      "Retail-driven markets",
      "High volatility periods",
      "Major news events",
    ],
    successRate: 0.85,
  },
];

// Enhanced seeding function with progress tracking
async function seedPatterns() {
  console.log("🚀 Starting advanced pattern seeding...");

  const totalPatterns = patterns.length;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    try {
      console.log(`🔵 Processing (${i + 1}/${totalPatterns}): ${pattern.name}`);

      const patternData = {
        name: pattern.name,
        type: pattern.type,
        description: pattern.description,
        conditions: pattern.conditions,
        signals: pattern.signals,
        reliability: pattern.reliability,
        timeframes: pattern.timeframes,
        examples: pattern.examples,
        timeframeBias: pattern.timeframeBias,
        failureConditions: pattern.failureConditions,
        successRate: pattern.successRate,
      };

      await prisma.tradingPattern.upsert({
        where: { name: pattern.name },
        update: patternData,
        create: patternData,
      });

      await generateAndStorePatternEmbedding(pattern);

      successCount++;
      console.log(`✅ Success: ${pattern.name}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Error on ${pattern.name}:`, error);
    }
  }

  console.log(`\n🎉 Seeding complete!
   Success: ${successCount}
   Errors: ${errorCount}
   Total: ${totalPatterns}`);
}

// Execution with error handling
seedPatterns().catch(async (error) => {
  console.error("💥 Critical seeding error:", error);
  await prisma.$disconnect();
  process.exit(1);
});
*/
