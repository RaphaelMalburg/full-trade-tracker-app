-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "embedding" SET DEFAULT NULL,
ALTER COLUMN "accountBalance" SET DEFAULT NULL,
ALTER COLUMN "accountEquity" SET DEFAULT NULL,
ALTER COLUMN "marginUsed" SET DEFAULT NULL,
ALTER COLUMN "accountLeverage" SET DEFAULT NULL,
ALTER COLUMN "marginLevel" SET DEFAULT NULL,
ALTER COLUMN "freeMargin" SET DEFAULT NULL,
ALTER COLUMN "dailyReturn" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "TradingAccount" ADD COLUMN     "maxDailyLoss" DOUBLE PRECISION,
ADD COLUMN     "maxPositionSize" DOUBLE PRECISION,
ADD COLUMN     "riskRewardRatio" DOUBLE PRECISION,
ADD COLUMN     "stopLossPercentage" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "RiskSettings" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "maxDailyLoss" DOUBLE PRECISION NOT NULL,
    "maxWeeklyLoss" DOUBLE PRECISION NOT NULL,
    "maxLossPerTrade" DOUBLE PRECISION NOT NULL,
    "maxOpenPositions" INTEGER NOT NULL,
    "dailyTradeLimit" INTEGER NOT NULL,
    "currentDailyLoss" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentWeeklyLoss" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentOpenPositions" INTEGER NOT NULL DEFAULT 0,
    "dailyTradeCount" INTEGER NOT NULL DEFAULT 0,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "lastResetDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyJournalQueue" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "DailyJournalQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiskSettings_accountId_key" ON "RiskSettings"("accountId");

-- CreateIndex
CREATE INDEX "RiskSettings_accountId_idx" ON "RiskSettings"("accountId");

-- CreateIndex
CREATE INDEX "DailyJournalQueue_status_idx" ON "DailyJournalQueue"("status");

-- CreateIndex
CREATE INDEX "DailyJournalQueue_userId_idx" ON "DailyJournalQueue"("userId");

-- AddForeignKey
ALTER TABLE "RiskSettings" ADD CONSTRAINT "RiskSettings_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "TradingAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyJournalQueue" ADD CONSTRAINT "DailyJournalQueue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
