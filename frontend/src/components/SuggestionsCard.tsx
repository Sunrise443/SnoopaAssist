import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatResponse } from "@/services/api";

export type Message = {
  date: string;
  text: ChatResponse;
  from: string;
};
interface SuggestionsCardProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export default function SuggestionsCard({
  messages,
  loading,
  error,
}: SuggestionsCardProps) {
  return (
    <Card className="rounded-2xl h-full flex flex-col h-[calc(100vh-90px)]">
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <ScrollArea className="h-[calc(100vh-190px)]">
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
                {msg.text.notes}
              </div>
            ))}
          </div>
        </ScrollArea>
        {loading && (
          <p className="text-sm text-muted-foreground">
            Loading suggestions...
          </p>
        )}
        {error && !loading && <p className="text-sm text-red-500">{error}</p>}
      </CardContent>
    </Card>
  );
}
