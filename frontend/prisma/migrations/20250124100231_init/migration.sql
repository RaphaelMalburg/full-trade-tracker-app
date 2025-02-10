-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('Buy', 'Sell');

-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('Positive', 'Neutral', 'Negative');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('IBKR', 'NINJA_TRADER', 'WEBULL', 'CTRADER', 'MT5', 'MT4', 'OTHER');

-- CreateEnum
CREATE TYPE "CreditActionType" AS ENUM ('PURCHASE', 'USAGE', 'REFUND', 'MONTHLY_GRANT', 'BONUS');

-- CreateEnum
CREATE TYPE "AIFeature" AS ENUM ('CHART_ANALYSIS', 'TRADING_INSIGHTS', 'RISK_ANALYSIS');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('free', 'pro', 'enterprise');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'inactive', 'canceling', 'past_due');

-- CreateEnum
CREATE TYPE "PrincipleCategory" AS ENUM ('RISK_MANAGEMENT', 'POSITION_SIZING', 'MONEY_MANAGEMENT', 'PSYCHOLOGY', 'TRADE_MANAGEMENT', 'PORTFOLIO_MANAGEMENT', 'RISK_REWARD', 'TRADING_PLAN', 'PERFORMANCE_TRACKING');

-- CreateEnum
CREATE TYPE "PatternType" AS ENUM ('CANDLESTICK', 'CHART_PATTERN', 'PRICE_ACTION', 'HARMONIC', 'FIBONACCI', 'TREND', 'VOLATILITY', 'MOMENTUM', 'REVERSAL', 'CONTINUATION');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MODERATE', 'HIGH', 'EXTREME');

-- CreateEnum
CREATE TYPE "MarketSessionType" AS ENUM ('LONDON', 'NEW_YORK', 'ASIA', 'OVERLAP', 'AFTER_HOURS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "emailVerified" TIMESTAMP(3),
    "apiKey" TEXT,
    "bio" TEXT,
    "tier" "SubscriptionTier" NOT NULL DEFAULT 'free',
    "credits" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "hasCompletedOnboarding" BOOLEAN NOT NULL DEFAULT false,
    "hasAcceptedToS" BOOLEAN NOT NULL DEFAULT false,
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "stripePriceId" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "yearsTrading" TEXT NOT NULL,
    "tradingStyle" TEXT NOT NULL,
    "preferredPlatform" "Platform" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "instrument" TEXT NOT NULL,
    "entryPrice" DOUBLE PRECISION NOT NULL,
    "exitPrice" DOUBLE PRECISION NOT NULL,
    "positionSize" DOUBLE PRECISION NOT NULL,
    "profitLoss" DOUBLE PRECISION NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL,
    "exitTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "stopLoss" DOUBLE PRECISION,
    "takeProfit" DOUBLE PRECISION,
    "screenshotUrl" TEXT[],
    "strategyId" TEXT,
    "notes" TEXT,
    "positionType" "PositionType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentiment" "Sentiment" NOT NULL DEFAULT 'Neutral',
    "commission" DOUBLE PRECISION,
    "hourOfDay" INTEGER,
    "tradingAccountId" TEXT,
    "tradingSession" TEXT,
    "pipsMax" DOUBLE PRECISION,
    "pipsMin" DOUBLE PRECISION,
    "embedding" vector(1536) DEFAULT NULL,
    "accountBalance" DOUBLE PRECISION DEFAULT NULL,
    "accountEquity" DOUBLE PRECISION DEFAULT NULL,
    "marginUsed" DOUBLE PRECISION DEFAULT NULL,
    "accountLeverage" DOUBLE PRECISION DEFAULT NULL,
    "marginLevel" DOUBLE PRECISION DEFAULT NULL,
    "freeMargin" DOUBLE PRECISION DEFAULT NULL,
    "dailyReturn" DOUBLE PRECISION DEFAULT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "positionId" TEXT NOT NULL,
    "instrument" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "positionSize" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stopLoss" DOUBLE PRECISION,
    "takeProfit" DOUBLE PRECISION,
    "positionType" "PositionType" NOT NULL,
    "tradingAccountId" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "marginUsed" DOUBLE PRECISION NOT NULL,
    "profitLoss" DOUBLE PRECISION NOT NULL,
    "rawData" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradingAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "accountId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TradingAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradingStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalTrades" INTEGER NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "profitFactor" DOUBLE PRECISION NOT NULL,
    "expectancy" DOUBLE PRECISION NOT NULL,
    "averageWin" DOUBLE PRECISION NOT NULL,
    "averageLoss" DOUBLE PRECISION NOT NULL,
    "largestWin" DOUBLE PRECISION NOT NULL,
    "largestLoss" DOUBLE PRECISION NOT NULL,
    "sharpeRatio" DOUBLE PRECISION,
    "tradingAccountId" TEXT,

    CONSTRAINT "TradingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "CreditActionType" NOT NULL,
    "feature" "AIFeature",
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "stripeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "SubscriptionTier" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "stripeSubscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradingAnalysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "aiResponse" JSONB NOT NULL,
    "chartData" JSONB NOT NULL,
    "userIntent" TEXT,
    "metadata" JSONB,
    "evaluation" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionType" "MarketSessionType",

    CONSTRAINT "TradingAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradingPattern" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PatternType" NOT NULL,
    "timeframes" TEXT[],
    "reliability" DOUBLE PRECISION NOT NULL,
    "conditions" JSONB NOT NULL,
    "examples" TEXT[],
    "signals" JSONB NOT NULL,
    "embedding" vector(1536),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "successRate" DOUBLE PRECISION,
    "failureConditions" TEXT[],
    "timeframeBias" TEXT[],

    CONSTRAINT "TradingPattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradingPrinciple" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PrincipleCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "rules" JSONB NOT NULL,
    "examples" JSONB NOT NULL,
    "importance" INTEGER NOT NULL,
    "context" TEXT[],
    "warnings" TEXT[],
    "metrics" JSONB,
    "embedding" vector(1536),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradingPrinciple_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_key" ON "User"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE INDEX "Trade_userId_idx" ON "Trade"("userId");

-- CreateIndex
CREATE INDEX "Trade_tradingAccountId_idx" ON "Trade"("tradingAccountId");

-- CreateIndex
CREATE INDEX "Trade_entryTime_idx" ON "Trade"("entryTime");

-- CreateIndex
CREATE INDEX "Trade_exitTime_idx" ON "Trade"("exitTime");

-- CreateIndex
CREATE INDEX "Trade_positionType_idx" ON "Trade"("positionType");

-- CreateIndex
CREATE INDEX "Trade_strategyId_idx" ON "Trade"("strategyId");

-- CreateIndex
CREATE INDEX "Position_userId_idx" ON "Position"("userId");

-- CreateIndex
CREATE INDEX "Position_tradingAccountId_idx" ON "Position"("tradingAccountId");

-- CreateIndex
CREATE INDEX "TradingAccount_userId_idx" ON "TradingAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TradingAccount_userId_accountId_key" ON "TradingAccount"("userId", "accountId");

-- CreateIndex
CREATE INDEX "TradingStats_userId_idx" ON "TradingStats"("userId");

-- CreateIndex
CREATE INDEX "TradingStats_tradingAccountId_idx" ON "TradingStats"("tradingAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "TradingStats_userId_tradingAccountId_period_key" ON "TradingStats"("userId", "tradingAccountId", "period");

-- CreateIndex
CREATE INDEX "Strategy_userId_idx" ON "Strategy"("userId");

-- CreateIndex
CREATE INDEX "CreditTransaction_userId_idx" ON "CreditTransaction"("userId");

-- CreateIndex
CREATE INDEX "CreditPurchase_userId_idx" ON "CreditPurchase"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "TradingAnalysis_userId_idx" ON "TradingAnalysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TradingPattern_name_key" ON "TradingPattern"("name");

-- CreateIndex
CREATE INDEX "TradingPattern_type_idx" ON "TradingPattern"("type");

-- CreateIndex
CREATE UNIQUE INDEX "TradingPrinciple_name_key" ON "TradingPrinciple"("name");

-- CreateIndex
CREATE INDEX "TradingPrinciple_category_idx" ON "TradingPrinciple"("category");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_tradingAccountId_fkey" FOREIGN KEY ("tradingAccountId") REFERENCES "TradingAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_tradingAccountId_fkey" FOREIGN KEY ("tradingAccountId") REFERENCES "TradingAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradingAccount" ADD CONSTRAINT "TradingAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradingStats" ADD CONSTRAINT "TradingStats_tradingAccountId_fkey" FOREIGN KEY ("tradingAccountId") REFERENCES "TradingAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradingStats" ADD CONSTRAINT "TradingStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditPurchase" ADD CONSTRAINT "CreditPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradingAnalysis" ADD CONSTRAINT "TradingAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
