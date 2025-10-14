"use server";

import { env } from "@/env";

export async function ragAction(query: string, sessionId: number) {
  try {
    const response = await fetch(env.WORKFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Workflow request failed: ${response.status} ${response.statusText}`);
    }

    return response.body;
  } catch {
    throw new Error("Failed to get response from chatbot workflow");
  }
}
