import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  handleRevalidation,
  type RevalidatePayload,
} from "@/lib/cms/revalidate";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

function getProvidedSecret(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim() || null;
  }

  const headerSecret = request.headers.get("x-revalidate-secret");
  if (headerSecret && headerSecret.trim().length > 0) {
    return headerSecret.trim();
  }

  return null;
}

function validatePayload(payload: RevalidatePayload): string | null {
  if (payload.type === "project" || payload.type === "workflow") {
    if (!payload.slug || typeof payload.slug !== "string") {
      return `Missing or invalid slug for ${payload.type} revalidation`;
    }
  }

  if (
    payload.type === "page" ||
    payload.type === "blog" ||
    payload.type === "lead_magnet"
  ) {
    if (!payload.slug || typeof payload.slug !== "string") {
      return `Missing or invalid slug for ${payload.type} revalidation`;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  if (!REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Revalidation secret is not configured" },
      { status: 500 },
    );
  }

  const providedSecret = getProvidedSecret(request);

  if (!providedSecret || providedSecret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let payload: RevalidatePayload;
  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const paths = handleRevalidation(payload);

  return NextResponse.json({
    revalidated: true,
    type: payload.type,
    ...("slug" in payload && payload.slug ? { slug: payload.slug } : {}),
    paths,
  });
}
