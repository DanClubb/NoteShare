import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { notes } from "~/server/db/schema";

export const notesRouter = createTRPCRouter({
  get: protectedProcedure.input(z.object({ id: z.string() }))
  .query(({ ctx, input }) => {
      return ctx.db.query.notes.findMany({
          where: eq(notes.authorId, input.id),
      });
  }),

  create: protectedProcedure
    .input(z.object({ text: z.string().min(1), category: z.string().nullish() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(notes).values({
        text: input.text,
        authorId: ctx.session.user.id,
        category: input.category || 'general'
      });
    }),

    update: protectedProcedure
        .input(z.object({ text: z.string().min(1), id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(notes)
                .set({ text: input.text })
                .where(eq(notes.noteId, input.id));
    }),

    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(notes).where(eq(notes.noteId, input.id));
    }),
});
