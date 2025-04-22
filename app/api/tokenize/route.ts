// /app/api/tokenize/route.ts
// import { NextResponse } from "next/server";
import { encoding_for_model } from "tiktoken";

export async function POST(req: Request) {
  const { text, model } = await req.json();
  console.log(text,model)
  const encoding = encoding_for_model(model || "gpt-4");
  const tokens = encoding.encode(text);

  return Response.json({ tokens: Array.from(tokens) });
}
