import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  Angry,
  ArrowUp,
  Frown,
  Laugh,
  Loader2,
  Meh,
  Shell,
  Smile,
  Trash2Icon,
} from "lucide-react";
import { Input } from "./ui/input";
import { Field } from "./ui/field";
import { ButtonGroup } from "./ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Task } from "@/types/Tasks";

interface DayCardProps {
  title: string;
  date: string;
  onGenerateSuggestions?: (params: {
    mood: string | null;
    tasks: Task[];
    date: string;
    title: string;
  }) => void;
  isSuggestionsLoading?: boolean;
}

export default function DayCard({
  title,
  date,
  onGenerateSuggestions,
  isSuggestionsLoading,
}: DayCardProps) {
  const storageKey = `tasks-${date}`;
  const moodStorageKey = `mood-${date}`;

  const moods = [
    { id: "awful", icon: Angry },
    { id: "bad", icon: Frown },
    { id: "neutral", icon: Meh },
    { id: "good", icon: Smile },
    { id: "amazing", icon: Laugh },
  ];

  const [mood, setMood] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(moodStorageKey);
  });
  const selectedMood = moods.find((m) => m.id === mood);
  const [taskInput, setTaskInput] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved) as Task[];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  useEffect(() => {
    if (mood) {
      localStorage.setItem(moodStorageKey, mood);
    } else {
      localStorage.removeItem(moodStorageKey);
    }
  }, [mood, moodStorageKey]);

  const handleTrashClick = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTaskClick = () => {
    const formattedTaskInput = taskInput.trim();

    if (!formattedTaskInput) return;

    setTasks((prev) => [
      ...prev,
      { title: formattedTaskInput, date, completed: false },
    ]);
    setTaskInput("");
  };

  const visibleTasks = tasks
    .map((task, index) => ({ ...task, index }))
    .filter((task) => task.date === date);

  return (
    <Card className="h-[calc(100vh-90px)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-bold">
          {title} - {date}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              {selectedMood ? (
                <selectedMood.icon className="w-5 h-5" />
              ) : (
                "Mood"
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex gap-2 p-2">
            {moods.map(({ id, icon: Icon }) => (
              <DropdownMenuItem
                key={id}
                onClick={() => setMood(id)}
                className="
                    flex items-center justify-center
                    w-12 h-12
                    rounded-xl
                    cursor-pointer
                    focus:bg-accent
                    data-[highlighted]:bg-accent
                    "
              >
                <Icon className="w-7 h-7" />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-240px)]">
          {visibleTasks.length !== 0 ? (
            visibleTasks.map((taskWithIndex) => (
              <div
                className="flex gap-2 items-center"
                key={taskWithIndex.index}
              >
                <Checkbox
                  id={`task-${taskWithIndex.index}`}
                  checked={taskWithIndex.completed ?? false}
                  onCheckedChange={(checked) => {
                    setTasks((prev) =>
                      prev.map((task, i) =>
                        i === taskWithIndex.index
                          ? { ...task, completed: !!checked }
                          : task
                      )
                    );
                  }}
                />
                <div className="flex items-center justify-between w-full p-1">
                  <Label htmlFor={`task-${taskWithIndex.index}`}>
                    {taskWithIndex.title}
                  </Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTrashClick(taskWithIndex.index)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No tasks yet</span>
          )}
        </ScrollArea>

        <Field orientation="horizontal" className="mt-2">
          <ButtonGroup className="w-full">
            <Input
              id="input-button-group"
              placeholder="Add tasks..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTaskClick();
                }
              }}
            />
            <Button
              title="Enter"
              variant="outline"
              onClick={handleAddTaskClick}
            >
              <ArrowUp />
            </Button>
            <Button
              title="Generate tasks"
              variant="outline"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                onGenerateSuggestions?.({
                  mood,
                  tasks: visibleTasks,
                  date,
                  title,
                });
              }}
            >
              {isSuggestionsLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shell />
              )}
            </Button>
          </ButtonGroup>
        </Field>
      </CardContent>
    </Card>
  );
}
