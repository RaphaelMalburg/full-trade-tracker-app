CREATE OR REPLACE FUNCTION match_patterns (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  similarity float,
  name text,
  description text,
  type text,
  reliability float,
  success_rate float,
  timeframes text[],
  failure_conditions text[]
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id::text,
    1 - (p.embedding <=> query_embedding) as similarity,
    p.name,
    p.description,
    p.type::text,
    p.reliability,
    p.success_rate,
    p.timeframes,
    p.failure_conditions
  FROM trading_pattern p
  WHERE p.embedding IS NOT NULL
  AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
