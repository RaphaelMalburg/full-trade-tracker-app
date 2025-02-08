export interface Trade {
  id: string;
  userId: string;
  instrument: string;
  entryPrice: number;
  exitPrice: number;
  positionSize: number;
  profitLoss: number;
  entryTime: Date;
  exitTime: Date;
  duration: number;
  stopLoss?: number | null;
  takeProfit?: number | null;
  screenshotUrl: string[];
  strategyId?: string | null;
  notes?: string | null;
  positionType?: "Buy" | "Sell" | null;
  sentiment?: "Positive" | "Neutral" | "Negative";
  commission?: number | null;
  hourOfDay?: number | null;
  tradingAccountId?: string | null;
  tradingSession?: string | null;
  pipsMax?: number | null;
  pipsMin?: number | null;
  embedding?: number[] | null;
  accountBalance?: number | null;
  accountEquity?: number | null;
  marginUsed?: number | null;
  accountLeverage?: number | null;
  marginLevel?: number | null;
  freeMargin?: number | null;
  dailyReturn?: number | null;
}

export interface TradeAnalysis {
  patterns: Array<{
    name: string;
    description: string;
    reliability: number;
    similarity: number;
  }>;
  principles: Array<{
    name: string;
    description: string;
    importance: number;
    similarity: number;
    warnings: string[];
  }>;
  riskMetrics: {
    riskRewardRatio: number | null;
    positionSizePercent: number | null;
    profitLossPercent: number | null;
  };
  suggestions: string[];
}
