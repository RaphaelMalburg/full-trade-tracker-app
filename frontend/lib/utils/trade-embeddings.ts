import OpenAI from "openai";
import { Trade } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function generateTradeText(trade: Trade): string {
  const details = [
    `Instrument: ${trade.instrument}`,
    `Entry Price: ${trade.entryPrice}`,
    `Exit Price: ${trade.exitPrice}`,
    `Position Size: ${trade.positionSize}`,
    `Profit/Loss: ${trade.profitLoss}`,
    `Position Type: ${trade.positionType}`,
    `Entry Time: ${trade.entryTime.toISOString()}`,
    `Exit Time: ${trade.exitTime.toISOString()}`,
    `Duration: ${trade.duration} seconds`,
    trade.stopLoss && `Stop Loss: ${trade.stopLoss}`,
    trade.takeProfit && `Take Profit: ${trade.takeProfit}`,
    trade.notes && `Notes: ${trade.notes}`,
    `Sentiment: ${trade.sentiment}`,
    trade.tradingSession && `Trading Session: ${trade.tradingSession}`,
    trade.pipsMax && `Maximum Pips: ${trade.pipsMax}`,
    trade.pipsMin && `Minimum Pips: ${trade.pipsMin}`,
  ].filter(Boolean);

  return details.join("\n");
}

export async function generateAndStoreTradeEmbedding(trade: Trade) {
  try {
    const tradeText = generateTradeText(trade);

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: tradeText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    await prisma.$executeRaw`
      UPDATE "Trade"
      SET embedding = ${embedding}::vector
      WHERE id = ${trade.id}
    `;

    return embedding;
  } catch (error) {
    console.error("Error generating trade embedding:", error);
    throw error;
  }
}

export async function findSimilarTrades(trade: Trade, limit: number = 5) {
  try {
    const tradeText = generateTradeText(trade);

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: tradeText,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const similarTrades = await prisma.$queryRaw`
      SELECT
        id,
        instrument,
        entry_price as "entryPrice",
        exit_price as "exitPrice",
        profit_loss as "profitLoss",
        position_type as "positionType",
        notes,
        trading_session as "tradingSession",
        sentiment,
        1 - (embedding <=> ${embedding}::vector) as similarity
      FROM "Trade"
      WHERE id != ${trade.id}
      AND user_id = ${trade.userId}
      AND embedding IS NOT NULL
      ORDER BY embedding <=> ${embedding}::vector
      LIMIT ${limit};
    `;

    return similarTrades;
  } catch (error) {
    console.error("Error finding similar trades:", error);
    throw error;
  }
}
