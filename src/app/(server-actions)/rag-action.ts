"use server";

import { Buffer } from "buffer";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";
import PDFParser from "pdf2json";

import { env } from "@/env";
import { openai } from "@/lib/ai";
import { SYSTEM_PROMPT } from "@/lib/constants";

async function actionExtractPdfFromAsset() {
  let parsedText = "";
  const res = await fetch(env.RESUME_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch PDF: ${res.status} ${res.statusText}`);
  }

  const pdfParser = new (PDFParser as any)(null, 1);
  const fileBuffer = Buffer.from(await res.arrayBuffer());

  return new Promise<{ text: string }>((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(new Error(errData.parserError));
    });

    pdfParser.on("pdfParser_dataReady", () => {
      parsedText = pdfParser.getRawTextContent();
      resolve({ text: parsedText });
    });

    try {
      pdfParser.parseBuffer(fileBuffer);
    } catch (error) {
      reject(new Error("Error loading the PDF file."));
    }
  });
}

export async function ragAction(
  query: string,
  chatHistory: ChatCompletionMessageParam[]
) {
  const AI_CONTEXT = await actionExtractPdfFromAsset();
  const contextEnhancedPrompt = `${SYSTEM_PROMPT}\n\n### CONTEXT BLOCK ###\n${JSON.stringify(AI_CONTEXT)}\n### END CONTEXT ###\n\n`;

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: contextEnhancedPrompt,
    },
    ...chatHistory,
    {
      role: "user",
      content: query,
    },
  ];

  const streamResponse = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages,
    stream: true,
  });

  return streamResponse.toReadableStream();
}
