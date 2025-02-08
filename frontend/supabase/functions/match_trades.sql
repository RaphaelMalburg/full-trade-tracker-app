CREATE OR REPLACE FUNCTION match_trades (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  similarity float,
  instrument text,
  entry_price float,
  exit_price float,
  profit_loss float,
  entry_time timestamp,
  exit_time timestamp,
  position_type text,
  notes text
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id::text,
    1 - (t.embedding <=> query_embedding) as similarity,
    t.instrument,
    t.entry_price,
    t.exit_price,
    t.profit_loss,
    t.entry_time,
    t.exit_time,
    t.position_type::text,
    t.notes
  FROM trade t
  WHERE t.embedding IS NOT NULL
  AND 1 - (t.embedding <=> query_embedding) > match_threshold
  ORDER BY t.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
