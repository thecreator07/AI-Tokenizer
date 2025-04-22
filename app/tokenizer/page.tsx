"use client";
import { useState } from "react";
import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";

export default function Home() {
  const [tokens, setTokens] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputSubmit = async (model: string, newInput: string) => {
    try {
      setError("");
      const res = await fetch("/api/tokenize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newInput, model }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Unknown error occurred");
        return;
      }

      setTokens(data.tokens);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to connect to the server");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Tokenizer</h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <InputBox onSubmit={handleInputSubmit} />
        <OutputBox tokens={tokens} />
      </div>
    </div>
  );
}