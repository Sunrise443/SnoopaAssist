import type { Task } from "@/components/DayCard";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ChatRequest {
  mood: string;
  tasks: Task[];
  personality: string[];
}

export interface ChatResponse {
  tasks: string[];
  restTip: string;
  notes: string;
}

export const chatApi = {
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post("/api/chat/", data);
    return response.data;
  },
};

// divide into more components
