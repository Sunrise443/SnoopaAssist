import { ModeToggle } from "@/components/mode-toggle";
import DayCard, { type Task } from "@/components/DayCard";
import SuggestionsCard, { type Message } from "@/components/SuggestionsCard";
import { useEffect, useState } from "react";
import { chatApi } from "@/services/api";

export default function PlannerPage() {
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);

  const suggestionStorageKey = `suggestion-${new Date()
    .toISOString()
    .slice(0, 10)}`;

  const [suggestionMessages, setSuggestionMessages] = useState<Message[]>(
    () => {
      if (typeof window === "undefined") return [];
      const saved = localStorage.getItem(suggestionStorageKey);
      if (saved) {
        try {
          return JSON.parse(saved) as Message[];
        } catch {
          return [];
        }
      }
      return [];
    }
  );

  const handleGenerateSuggestions = async (params: {
    mood: string | null;
    tasks: Task[];
    date: string;
    title: string;
  }) => {
    setSuggestionsLoading(true);
    setSuggestionsError(null);
    try {
      const response = await chatApi.sendMessage({
        mood: params.mood ?? "neutral",
        tasks: params.tasks,
        personality: [],
      });

      const newMessage: Message = {
        date: new Date().toISOString(),
        text: response,
        from: "system",
      };

      setSuggestionMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      setSuggestionsError("Error loading suggestions.");
      console.log(err);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      suggestionStorageKey,
      JSON.stringify(suggestionMessages)
    );
  }, [suggestionMessages, suggestionStorageKey]);

  const now = new Date();
  const today = now.getDate();
  const currentMonth = now.getMonth() + 1;

  return (
    <div className="min-h-screen">
      <header className="h-14 border-b bg-background flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold">Snoopa Assist</h1>
        <ModeToggle />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-4 p-4 h-[calc(100vh-3.5rem)]">
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <DayCard
            title="Yesterday"
            date={`${String(today - 1).padStart(2, "0")}.${String(
              currentMonth
            ).padStart(2, "0")}`}
            onGenerateSuggestions={handleGenerateSuggestions}
          />
          <DayCard
            title="Today"
            date={`${String(today).padStart(2, "0")}.${String(
              currentMonth
            ).padStart(2, "0")}`}
            onGenerateSuggestions={handleGenerateSuggestions}
          />
          <DayCard
            title="Tomorrow"
            date={`${String(today + 1).padStart(2, "0")}.${String(
              currentMonth
            ).padStart(2, "0")}`}
            onGenerateSuggestions={handleGenerateSuggestions}
          />
        </section>

        <SuggestionsCard
          messages={suggestionMessages}
          loading={suggestionsLoading}
          error={suggestionsError}
        />
      </main>
    </div>
  );
}
