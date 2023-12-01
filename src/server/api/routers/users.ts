import { eq, ne } from "drizzle-orm";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const usersRouter = createTRPCRouter({
  getAllUsers: protectedProcedure
  .query(async ({ ctx, }) => {
      return await ctx.db.query.users.findMany({
          where: ne(users.id, ctx.session.user.id),
      });
  }),


});