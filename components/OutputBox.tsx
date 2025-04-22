
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OutputBox({ tokens }: { tokens: number[] }) {
  return (
    <Card className="flex-1 h-[450px] flex flex-col">
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
        <CardDescription>Length: {tokens.length}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="flex flex-wrap gap-1">
          {tokens.map((token, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 rounded text-sm font-mono"
            >
              {token}
            </span>
          ))}
        </div>
        {tokens.length === 0 && (
          <p className="text-gray-500">No tokens generated yet.</p>
        )}
      </CardContent>
    </Card>
  );
}