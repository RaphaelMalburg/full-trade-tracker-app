import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, functions } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    stream: true,
    messages,
    ...(functions && { functions, function_call: "auto" }),
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
