import type { Task } from "./Tasks";

export type ChatRequest = {
  mood: string;
  tasks: Task[];
  personality: string | null;
};

export type ChatResponse = {
  tasks: string[];
  restTip: string;
  notes: string;
};

export type Message = {
  date: string;
  day: string;
  text: ChatResponse;
  from: string;
};
