"use client";
import { TiktokenModel } from "tiktoken";
import { useState } from "react";
import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";

export default function Home() {
  const [tokens, setTokens] = useState<Uint32Array>(new Uint32Array());

  const handleInputSubmit = async (model: TiktokenModel, newInput: string) => {
    const res = await fetch("/api/tokenize", {
      method: "POST",
      body: JSON.stringify({ text: newInput, model }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data.tokens)
    setTokens(new Uint32Array(data.tokens));
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Tokenizer</h1>
      </div>

      <div className="flex sm:flex-row flex-col items-center justify-center gap-5 p-5 ">
        <InputBox onSubmit={handleInputSubmit} />
        <OutputBox length={tokens.length} tokens={tokens} />
      </div>
    </div>
  );
}
