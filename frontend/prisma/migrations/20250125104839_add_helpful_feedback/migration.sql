/*
  Warnings:

  - You are about to drop the column `accountSize` on the `UserPreferences` table. All the data in the column will be lost.

*/
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
ALTER TABLE "TradingAccount" ADD COLUMN     "accountSize" DOUBLE PRECISION NOT NULL DEFAULT 10000;

-- AlterTable
ALTER TABLE "TradingAnalysis" ADD COLUMN     "isHelpful" BOOLEAN;

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "accountSize";
