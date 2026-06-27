import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createLeadSchema = z.object({
  email: z.email(),
  name: z.string().trim().min(1).max(100).optional(),
  magnetSlug: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid lead payload", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const magnet = await prisma.lead_magnets.findFirst({
    where: {
      slug: parsed.data.magnetSlug,
      published: true,
    },
    select: { slug: true },
  });

  if (!magnet) {
    return NextResponse.json(
      { message: "Lead magnet not found" },
      { status: 404 },
    );
  }

  try {
    const lead = await prisma.leads.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name ?? null,
        magnetSlug: parsed.data.magnetSlug,
        metadata: (parsed.data.metadata ?? undefined) as Parameters<
          typeof prisma.leads.create
        >[0]["data"]["metadata"],
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully!",
        data: lead,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to capture lead" },
      { status: 500 },
    );
  }
}
