import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type RevalidatePayload =
  | {
      type: "project";
      slug: string;
    }
  | {
      type: "workflow";
      slug: string;
    }
  | {
      type: "client";
      slugs?: string[];
    };

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

  if (payload.type === "project") {
    if (!payload.slug || typeof payload.slug !== "string") {
      return NextResponse.json(
        { message: "Missing or invalid slug for project revalidation" },
        { status: 400 },
      );
    }

    revalidatePath("/");
    revalidatePath(`/projects/${payload.slug}`);

    return NextResponse.json({
      revalidated: true,
      type: payload.type,
      slug: payload.slug,
      paths: ["/", `/projects/${payload.slug}`],
    });
  }

  if (payload.type === "workflow") {
    if (!payload.slug || typeof payload.slug !== "string") {
      return NextResponse.json(
        { message: "Missing or invalid slug for workflow revalidation" },
        { status: 400 },
      );
    }

    revalidatePath("/");
    revalidatePath(`/workflows/${payload.slug}`);

    return NextResponse.json({
      revalidated: true,
      type: payload.type,
      slug: payload.slug,
      paths: ["/", `/workflows/${payload.slug}`],
    });
  }

  if (payload.type === "client") {
    revalidatePath("/");
    const paths = ["/"];

    if (Array.isArray(payload.slugs)) {
      for (const slug of payload.slugs) {
        if (typeof slug === "string" && slug.trim()) {
          const projectPath = `/projects/${slug}`;
          revalidatePath(projectPath);
          paths.push(projectPath);
        }
      }
    }

    return NextResponse.json({
      revalidated: true,
      type: payload.type,
      paths,
    });
  }

  return NextResponse.json(
    { message: "Unsupported revalidation type" },
    { status: 400 },
  );
}
