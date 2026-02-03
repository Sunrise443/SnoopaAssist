import { ModeToggle } from "@/components/mode-toggle";
import DayCard from "@/components/DayCard";
import SuggestionsCard from "@/components/SuggestionsCard";

export default function PlannerPage() {
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
          />
          <DayCard
            title="Today"
            date={`${String(today).padStart(2, "0")}.${String(
              currentMonth
            ).padStart(2, "0")}`}
          />
          <DayCard
            title="Tomorrow"
            date={`${String(today + 1).padStart(2, "0")}.${String(
              currentMonth
            ).padStart(2, "0")}`}
          />
        </section>

        <SuggestionsCard />
      </main>
    </div>
  );
}
