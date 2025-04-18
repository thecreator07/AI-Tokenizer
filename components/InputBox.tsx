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
const modelList = [
  "gpt-4o",
  "gpt-4",
  "gpt-4-32k",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "text-davinci-003",
  "code-davinci-002",
  "text-embedding-ada-002",
  "davinci",
];
export default function InputBox({
  onSubmit,
}: {
  onSubmit: (model: TiktokenModel, input: string) => Promise<void>;
}) {
  const [input, setInput] = useState("Hello World");
  const [model, setModel] = useState<TiktokenModel>("gpt-4");
  const handleClick = () => {
    onSubmit(model, input);
  };

  return (
    <Card style={{ width: "50%", margin: "0 auto", height: "400px" }}>
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>String Provided by User</CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          onValueChange={(value) => {
            const newModel = value as TiktokenModel;
            setModel(newModel);
            onSubmit(newModel, input); // auto-submit when model changes
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Models" />
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
          style={{ height: "200px" }}
          placeholder="Write your Prompt here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button style={{ margin: " 10px 0px" }} onClick={handleClick}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
