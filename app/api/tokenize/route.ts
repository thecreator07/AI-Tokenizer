
import { NextResponse } from "next/server";
import { encoding_for_model } from "tiktoken";

export async function POST(req: Request) {
  try {
    const { text, model = "gpt-4" } = await req.json();
    
    
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid text input" },
        { status: 400 }
      );
    }

    
    const validModels = [
      "gpt-4", "gpt-4-32k", "gpt-3.5-turbo", "gpt-3.5-turbo-16k",
      "text-davinci-003", "code-davinci-002", "text-embedding-ada-002"
    ];
    
    if (!validModels.includes(model)) {
      return NextResponse.json(
        { error: "Invalid model specified" },
        { status: 400 }
      );
    }

    const encoder = encoding_for_model(model as any);
    const tokens = encoder.encode(text);
    encoder.free();

    return NextResponse.json({ 
      tokens: Array.from(tokens),
      count: tokens.length
    });
    
  } catch (error) {
    console.error("Tokenization error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}