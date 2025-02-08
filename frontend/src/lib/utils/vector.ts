import { createClient } from "@/lib/supabase/server";
import { type EmbeddingResponse, type SimilarTradeResult, type SimilarPatternResult, type SimilarPrincipleResult } from "@/lib/types/ai";

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch("/api/ai/embedding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate embedding");
    }

    const { embedding } = (await response.json()) as EmbeddingResponse;
    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

export async function findSimilarTrades(embedding: number[], limit = 5): Promise<SimilarTradeResult[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("match_trades", {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: limit,
  });

  if (error) throw error;
  return data;
}

export async function findSimilarPatterns(embedding: number[], limit = 5): Promise<SimilarPatternResult[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("match_patterns", {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: limit,
  });

  if (error) throw error;
  return data;
}

export async function findSimilarPrinciples(embedding: number[], limit = 5): Promise<SimilarPrincipleResult[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("match_principles", {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: limit,
  });

  if (error) throw error;
  return data;
}
