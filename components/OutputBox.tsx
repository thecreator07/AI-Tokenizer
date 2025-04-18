"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OutputBox(tokens: {
  length: number;
  tokens: Uint32Array;
}) {
  return (
    <Card style={{ width: "50%", margin: "0 auto", height: "400px" }}>
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
        <CardDescription>Length:{tokens.length}</CardDescription>
      </CardHeader>
      <CardContent style={{  }}>
        <div>
          {tokens.length > 0 && tokens.tokens.length > 0 ? (
            <div className="overflow-y-auto h-full">
              {Array.from(tokens.tokens).map((token, index) => (
                <span key={index} className="text-sm font-mono">
                  {token}
                  {index !== tokens.tokens.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          ) : (
            <p>No tokens generated yet.</p>
          )}
        </div>
      </CardContent>
     
    </Card>
  );
}
