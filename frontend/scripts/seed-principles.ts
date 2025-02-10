/*  import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { PrincipleCategory } from "@prisma/client";
import { generateAndStorePatternEmbedding } from "@/lib/utils/pattern-embeddings";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const principles = [
  // Risk Management Principles
  {
    name: "Fixed Risk Per Trade",
    category: PrincipleCategory.RISK_MANAGEMENT,
    description:
      "Never risk more than a fixed percentage of your trading account on any single trade.",
    rules: {
      maxRisk: "1-2% of total account per trade",
      calculation: "Risk = (Entry - Stop Loss) * Position Size",
      adjustments: "Scale down risk in volatile markets",
      exceptions: "No exceptions, this is a cardinal rule",
    },
    examples: {
      example1: {
        scenario: "$10,000 account, 1% risk",
        calculation: "Maximum risk per trade = $100",
        application:
          "If stop loss is 10 pips away, position size = risk / (stop loss in pips * pip value)",
      },
      example2: {
        scenario: "Volatile market condition",
        adjustment: "Reduce risk to 0.5% = $50 per trade",
        reasoning: "Higher volatility requires wider stops and reduced risk",
      },
    },
    importance: 10,
    context: [
      "Every trade setup",
      "Position sizing calculations",
      "Risk assessment",
      "Portfolio management",
    ],
    warnings: [
      "Never exceed maximum risk percentage",
      "Don't adjust position size after entry",
      "Don't remove stops to avoid losses",
      "Don't average down on losing positions",
    ],
    metrics: {
      trackingPoints: [
        "Risk percentage per trade",
        "Maximum drawdown",
        "Risk-adjusted returns",
        "Win rate vs. risk percentage",
      ],
    },
  },
  // Position Sizing Principles
  {
    name: "Dynamic Position Sizing",
    category: PrincipleCategory.POSITION_SIZING,
    description:
      "Adjust position size based on volatility, account size, and risk parameters.",
    rules: {
      baseCalculation: "Position Size = Risk Amount / (Entry - Stop Loss)",
      adjustments: {
        volatility: "Reduce size in high volatility",
        momentum: "Scale in during strong trends",
        correlation: "Reduce size when trading correlated pairs",
      },
      limits: {
        maxSize: "Never exceed 5% of daily market volume",
        minSize: "Must be large enough to overcome transaction costs",
      },
    },
    examples: {
      example1: {
        scenario: "High volatility market",
        adjustment: "Reduce standard position size by 50%",
        reason:
          "Wider stops require smaller position size to maintain fixed risk",
      },
      example2: {
        scenario: "Strong trend with multiple confirmations",
        adjustment: "Scale in up to 1.5x standard position",
        execution: "Enter 60% at initial entry, add 40% at pullback",
      },
    },
    importance: 9,
    context: [
      "Pre-trade planning",
      "Market volatility assessment",
      "Trend strength evaluation",
      "Risk management integration",
    ],
    warnings: [
      "Don't override position size rules based on emotions",
      "Never exceed maximum position size limits",
      "Don't add to losing positions",
      "Beware of correlation risk with multiple positions",
    ],
    metrics: {
      tracking: [
        "Average position size",
        "Position size vs. volatility",
        "Position size vs. win rate",
        "Risk-adjusted returns by position size",
      ],
    },
  },
  // Money Management Principles
  {
    name: "Capital Preservation",
    category: PrincipleCategory.MONEY_MANAGEMENT,
    description:
      "Focus on protecting trading capital as the primary objective before seeking profits.",
    rules: {
      drawdownLimits: {
        daily: "Maximum 3% account drawdown",
        weekly: "Maximum 7% account drawdown",
        monthly: "Maximum 15% account drawdown",
      },
      recovery: {
        stopTrading: "Stop when daily limit is hit",
        reduceSize: "Reduce position size after 5% drawdown",
        resetRisk: "Return to normal size after positive week",
      },
      profitProtection: {
        lockIn: "Secure 50% of profits monthly",
        reinvestment: "Reinvest 50% for account growth",
      },
    },
    examples: {
      example1: {
        scenario: "2% daily drawdown reached",
        action: "Stop trading for the day",
        recovery: "Review trades, adjust strategy if needed",
      },
      example2: {
        scenario: "10% monthly profit achieved",
        action: "Secure 5% as realized profit",
        reinvestment: "Use remaining 5% for account growth",
      },
    },
    importance: 10,
    context: [
      "Daily trading decisions",
      "Drawdown management",
      "Profit taking",
      "Account growth planning",
    ],
    warnings: [
      "Never chase losses",
      "Don't override drawdown limits",
      "Don't risk profits to make up losses",
      "Avoid emotional trading after losses",
    ],
    metrics: {
      tracking: [
        "Maximum drawdown",
        "Recovery time",
        "Profit retention rate",
        "Risk-adjusted returns",
      ],
    },
  },
  // Trading Psychology
  {
    name: "Emotional Discipline",
    category: PrincipleCategory.PSYCHOLOGY,
    description:
      "Maintain emotional control and stick to trading plan regardless of market conditions or recent results.",
    rules: {
      tradingRoutine: {
        preparation: "Daily market analysis and plan",
        execution: "Stick to predefined setups only",
        review: "End-of-day trade journal and analysis",
      },
      mentalState: {
        assessment: "No trading if emotionally compromised",
        breaks: "Take breaks after losing streaks",
        focus: "Trade in distraction-free environment",
      },
    },
    examples: {
      example1: {
        scenario: "Three consecutive losses",
        action: "Take 1-hour break, review trades",
        return: "Only return if emotionally neutral",
      },
      example2: {
        scenario: "Large winning day",
        action: "Stick to regular position sizing",
        reason: "Avoid overconfidence and overtrading",
      },
    },
    importance: 9,
    context: [
      "Before trading session",
      "During drawdowns",
      "After big wins",
      "During high stress periods",
    ],
    warnings: [
      "Don't trade when emotional",
      "Avoid revenge trading",
      "Don't overtrade after wins",
      "Beware of overconfidence",
    ],
    metrics: {
      tracking: [
        "Adherence to trading plan",
        "Emotional state vs. performance",
        "Break frequency",
        "Recovery performance",
      ],
    },
  },
  // Trade Management
  {
    name: "Active Trade Management",
    category: PrincipleCategory.TRADE_MANAGEMENT,
    description:
      "Systematic approach to managing open positions to maximize profits and minimize losses.",
    rules: {
      entryManagement: {
        confirmation: "Multiple timeframe confirmation",
        scaling: "Scale in on strong setups only",
        timing: "Enter at predetermined levels only",
      },
      exitManagement: {
        stopLoss: "Move to breakeven at 1R profit",
        takeProfit: "Partial exit at 2R, trail remainder",
        scaling: "Scale out in thirds based on structure",
      },
    },
    examples: {
      example1: {
        scenario: "Trade reaches 1:1 risk/reward",
        action: "Move stop to breakeven",
        next: "Trail stop behind structure",
      },
      example2: {
        scenario: "Strong trend continuation",
        action: "Scale in additional position",
        management: "Separate stop management for each scale-in",
      },
    },
    importance: 8,
    context: [
      "During open trades",
      "Trend following setups",
      "Breakout trades",
      "Range trading",
    ],
    warnings: [
      "Don't widen stops",
      "Don't exit too early out of fear",
      "Don't overmanage positions",
      "Don't break trailing stop rules",
    ],
    metrics: {
      tracking: [
        "Average R-multiple",
        "Profit factor",
        "Maximum favorable excursion",
        "Maximum adverse excursion",
      ],
    },
  },
];

async function seedPrinciples() {
  console.log("🌱 Starting trading principles seeding...");

  for (const principle of principles) {
    try {
      console.log(`Processing principle: ${principle.name}`);

      const principleText = `
        Name: ${principle.name}
        Category: ${principle.category}
        Description: ${principle.description}
        Rules: ${JSON.stringify(principle.rules)}
        Examples: ${JSON.stringify(principle.examples)}
        Context: ${principle.context.join(", ")}
        Warnings: ${principle.warnings.join(", ")}
      `.trim();

      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: principleText,
      });

      const embedding = embeddingResponse.data[0].embedding;

      // First create/update the principle without embedding
      const result = await prisma.tradingPrinciple.upsert({
        where: { name: principle.name },
        update: {
          ...principle,
          updatedAt: new Date(),
        },
        create: principle,
      });

      // Then update the embedding using raw SQL
      await prisma.$executeRaw`
        UPDATE "TradingPrinciple"
        SET embedding = ${embedding}::vector
        WHERE id = ${result.id}
      `;

      console.log(`✅ Successfully added principle: ${principle.name}`);
    } catch (error) {
      console.error(`❌ Error adding principle ${principle.name}:`, error);
    }
  }

  console.log("✨ Trading principles seeding completed");
}

// Run the seeding
seedPrinciples()
  .catch((error) => {
    console.error("Error in seed script:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/
