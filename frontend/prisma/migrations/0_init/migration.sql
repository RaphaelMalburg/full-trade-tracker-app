-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable the pg_embedding extension for Supabase
CREATE EXTENSION IF NOT EXISTS pg_embedding;

-- Enable the pg_similarity extension
CREATE EXTENSION IF NOT EXISTS pg_similarity;

-- Create the embedding_similarity function
CREATE OR REPLACE FUNCTION embedding_similarity(
  embedding_a vector,
  embedding_b vector
) RETURNS float
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 1 - (embedding_a <=> embedding_b);
END;
$$;
