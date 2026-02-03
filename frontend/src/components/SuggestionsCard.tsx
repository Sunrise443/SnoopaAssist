import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SuggestionsCardProps {}

export default function SuggestionsCard() {
  const [messages, setMessages] = useState([
    { from: "system", text: "Привет! Чем могу помочь?" },
  ]);
  return (
    <Card className="rounded-2xl h-full flex flex-col">
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <ScrollArea className="flex-1 pr-2">
          <div className="space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.from === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto bg-muted"
                }
                style={{
                  maxWidth: "80%",
                  padding: "8px 12px",
                  borderRadius: "12px",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
