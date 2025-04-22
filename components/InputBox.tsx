"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { TiktokenModel } from "tiktoken";

// Align with server-side valid models
const modelList: TiktokenModel[] = [
  "gpt-4",
  "gpt-4-32k",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "text-davinci-003",
  "code-davinci-002",
  "text-embedding-ada-002",
];

export default function InputBox({
  onSubmit,
}: {
  onSubmit: (model: TiktokenModel, input: string) => Promise<void>;
}) {
  const [input, setInput] = useState("Hello World");
  const [model, setModel] = useState<TiktokenModel>("gpt-4");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(model, input);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full md:w-1/2 mx-auto h-[450px] flex flex-col">
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>String Provided by User</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <Select
          value={model}
          onValueChange={(value) => {
            const newModel = value as TiktokenModel;
            setModel(newModel);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>MODELS</SelectLabel>
              {modelList.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Textarea
          className="flex-1 min-h-[200px]"
          placeholder="Enter your text here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4"
        >
          {isLoading ? "Processing..." : "Tokenize"}
        </Button>
      </CardContent>
    </Card>
  );
}