import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import type { Message } from "@/types/Chat";
import { useCallback, useEffect, useRef } from "react";

interface SuggestionsCardProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
  onConfirmTask: (day: string, taskTitle: string) => void;
}

export default function SuggestionsCard({
  messages,
  loading,
  error,
  onConfirmTask,
}: SuggestionsCardProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;

      if (viewport) {
        // Используем requestAnimationFrame для гарантии, что DOM обновился
        requestAnimationFrame(() => {
          viewport.scrollTop = viewport.scrollHeight;
        });
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <Card className="rounded-2xl h-full flex flex-col h-[calc(100vh-90px)]">
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <ScrollArea ref={scrollAreaRef} className="h-[calc(100vh-210px)]">
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
                  maxWidth: "100%",
                  padding: "8px 12px",
                  borderRadius: "12px",
                }}
              >
                <p className="my-1 mx-2 text-sm font-semibold">{msg.day}</p>
                <div className="space-y-2">
                  <div className="space-y-1 py-2">
                    {msg.text.tasks.map((task, idx) => (
                      <div
                        key={`${task}-${idx}`}
                        className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm"
                      >
                        <span className="mr-2">{task}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2 shrink-0"
                          type="button"
                          onClick={() => onConfirmTask(msg.day, task)}
                        >
                          Confirm
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 mx-2 text-sm ">{msg.text.restTip}</p>
                  <p className="mt-2 mx-2 text-sm text-muted-foreground">
                    {msg.text.notes}
                  </p>
                </div>
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
