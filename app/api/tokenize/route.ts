// /app/api/tokenize/route.ts
// import { NextResponse } from "next/server";
import { NextRequest, NextResponse } from "next/server";
import { encoding_for_model } from "tiktoken";

export async function POST(req: NextRequest) {
  const { text, model } = await req.json();
  const encoding = encoding_for_model(model || "gpt-4");
  const tokens = encoding.encode(text);

  return NextResponse.json({ tokens: Array.from(tokens) });
}
