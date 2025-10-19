import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const documentRouter = createTRPCRouter({
  searchSimilarDocuments: publicProcedure
    .input(
      z.object({
        queryEmbedding: z.array(z.number()),
        limit: z.number().min(1).max(20).default(5),
        threshold: z.number().min(0).max(1).default(0.7),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { queryEmbedding, limit, threshold } = input;

      const results = await ctx.db.$queryRaw<
        Array<{
          id: bigint;
          text: string;
          metadata: Record<string, unknown>;
          similarity: number;
        }>
      >`
        SELECT 
          id,
          text,
          metadata,
          1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector) as similarity
        FROM documents 
        WHERE 1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector) > ${threshold}
        ORDER BY similarity DESC
        LIMIT ${limit}
      `;

      return results.map((result) => ({
        id: Number(result.id),
        text: result.text,
        metadata: result.metadata,
        similarity: result.similarity,
      }));
    }),

  getAllDocuments: publicProcedure.query(async ({ ctx }) => {
    const documents = await ctx.db.documents.findMany({
      select: {
        id: true,
        text: true,
        metadata: true,
        created_at: true,
        updated_at: true,
      },
    });
    return documents;
  }),

  getDocumentById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    return await ctx.db.documents.findUnique({
      where: { id: input.id },
      select: {
        id: true,
        text: true,
        metadata: true,
        created_at: true,
        updated_at: true,
      },
    });
  }),
});
