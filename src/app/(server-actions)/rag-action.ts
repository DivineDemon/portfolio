"use server";

import { generateEmbedding, generateResponse } from "@/lib/ai";
import { api } from "@/trpc/server";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function ragAction(messages: ChatMessage[]): Promise<ReadableStream<Uint8Array> | null> {
  try {
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.role !== "user") {
      throw new Error("No user message found");
    }

    const queryEmbedding = await generateEmbedding(latestMessage.content);

    const similarDocuments = await api.document.searchSimilarDocuments({
      queryEmbedding,
      limit: 5,
      threshold: 0.3,
    });

    const context = similarDocuments.map((doc) => doc.text).join("\n\n");

    if (!context.trim()) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const response = JSON.stringify([
            {
              output:
                "Hey there! 👋 I'm Mushood's AI sidekick, and I'd love to chat about his awesome work! While I don't have specific info about that topic, I'm totally excited to tell you about his portfolio, projects, skills, or work experience. What would you like to know? 🚀",
            },
          ]);
          controller.enqueue(encoder.encode(response));
          controller.close();
        },
      });
      return stream;
    }

    const responseStream = await generateResponse(messages, context);
    return responseStream;
  } catch {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const response = JSON.stringify([
          {
            output:
              "Oops! 😅 Looks like I hit a little snag there. Don't worry though - I'm still here and ready to chat about Mushood's amazing work! Try asking me again! 🚀",
          },
        ]);
        controller.enqueue(encoder.encode(response));
        controller.close();
      },
    });
    return stream;
  }
}
