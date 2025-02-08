import { Message } from "ai";

export interface AIFunction {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<
      string,
      {
        type: string;
        description: string;
        enum?: string[];
      }
    >;
    required?: string[];
  };
}

export interface UseAIChatOptions {
  initialMessages?: Message[];
  functions?: AIFunction[];
  onResponse?: (response: Response) => void;
  onError?: (error: Error) => void;
}

export interface EmbeddingResponse {
  embedding: number[];
  error?: string;
}

export interface SimilarPatternResult {
  id: string;
  similarity: number;
  name: string;
  description: string;
  type: string;
  reliability: number;
  successRate: number;
  timeframes: string[];
  failureConditions: string[];
}

export interface SimilarPrincipleResult {
  id: string;
  similarity: number;
  name: string;
  category: string;
  description: string;
  importance: number;
  context: string[];
  warnings: string[];
}

export interface ChartAnalysisResult {
  patterns: SimilarPatternResult[];
  principles: SimilarPrincipleResult[];
  suggestions: string[];
  confidence: number;
}
