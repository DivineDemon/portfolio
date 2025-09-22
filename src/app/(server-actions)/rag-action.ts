"use server";

import { env } from "@/env";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function ragAction(query: string, chatHistory: ChatMessage[]) {
  try {
    const response = await fetch(env.WORKFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        chatHistory,
      }),
    });

    if (!response.ok) {
      throw new Error(`Workflow request failed: ${response.status} ${response.statusText}`);
    }

    return response.body;
  } catch (_error) {
    throw new Error("Failed to get response from chatbot workflow");
  }
}
