import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });

    return Response.json({ embedding: response.data[0].embedding });
  } catch (error) {
    console.error("Error generating embedding:", error);
    return Response.json({ error: "Failed to generate embedding" }, { status: 500 });
  }
}
