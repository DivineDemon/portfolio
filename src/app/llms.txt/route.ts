import { NextResponse } from "next/server";
import { buildLlmsDocument } from "@/lib/seo/build-llms-document";

export async function GET() {
  const document = await buildLlmsDocument();

  return new NextResponse(document, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
