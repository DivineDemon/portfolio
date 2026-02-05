import { GoogleGenAI } from "@google/genai";
import { env } from "@/env";

export const EMBEDDING_DIMENSIONS = 3072;
const ai = new GoogleGenAI({ apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY });
export type EmbeddingTaskType = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

export async function generateEmbedding(text: string, options?: { taskType?: EmbeddingTaskType }): Promise<number[]> {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
      config: {
        taskType: options?.taskType ?? "RETRIEVAL_DOCUMENT",
      },
    });
    const values = response.embeddings?.[0]?.values;
    if (!values) {
      throw new Error("No embedding in response");
    }
    return values;
  } catch (error) {
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export async function generateResponse(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  context: string,
): Promise<ReadableStream<Uint8Array>> {
  try {
    const history = messages
      .slice(0, -1)
      .filter((msg) => msg.role !== "system")
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    const currentMessage = messages[messages.length - 1];

    if (!currentMessage) {
      throw new Error("No current message found");
    }

    const prompt = `You are Mushood Hanif's AI assistant - think of yourself as his friendly, witty, and enthusiastic digital sidekick! 🚀

Your personality:
- Be conversational, funny, and engaging
- Use emojis occasionally (but not excessively)
- Be enthusiastic about Mushood's work and achievements
- Keep responses concise but informative
- Use casual, friendly language
- Show personality while staying professional

Context about Mushood:
${context}

Current conversation:
${history.map((msg) => `${msg.role}: ${msg.parts[0]?.text || ""}`).join("\n")}

User: ${currentMessage.content}

Respond in a friendly, conversational way. If the context doesn't contain relevant information, be playful about it and gently guide them to ask about Mushood's portfolio, projects, skills, or work experience.`;

    const response = await ai.models.generateContentStream({
      model: env.GEMINI_MODEL,
      contents: prompt,
    });

    const encoder = new TextEncoder();
    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const chunkText = chunk.text;
            if (chunkText) {
              const formattedResponse = JSON.stringify([
                {
                  type: "chunk",
                  content: chunkText,
                },
              ]);
              controller.enqueue(encoder.encode(formattedResponse));
            }
          }
          const completionResponse = JSON.stringify([
            {
              type: "complete",
            },
          ]);
          controller.enqueue(encoder.encode(completionResponse));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });
  } catch {
    throw new Error("Failed to generate response");
  }
}
