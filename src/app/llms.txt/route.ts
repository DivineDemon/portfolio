import { buildLlmsDocument } from "@/lib/seo/build-llms-document";

export async function GET() {
  const document = await buildLlmsDocument("summary");

  return new Response(document, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
