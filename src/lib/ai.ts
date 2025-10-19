import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";

const genAI = new GoogleGenerativeAI(env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export async function generateResponse(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  context: string,
): Promise<ReadableStream<Uint8Array>> {
  try {
    const model = genAI.getGenerativeModel({ model: env.GEMINI_MODEL });

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

    const result = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
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

    return stream;
  } catch {
    throw new Error("Failed to generate response");
  }
}
