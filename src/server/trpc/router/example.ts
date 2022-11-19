import { z } from "zod";
import { slugify } from "../../../utils/slugify";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getBySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.prisma.stash.findUnique({
      where: {
        slug: input,
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.stash.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.stash.create({
        data: {
          url: input.url,
          title: input.title,
          description: input.description,
          slug: slugify(input.title),
        },
      });
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        url: z.string().url(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.stash.update({
        where: {
          id: input.id,
        },
        data: {
          url: input.url,
          title: input.title,
          description: input.description,
          slug: slugify(input.title),
        },
      });
    }),
  delete: publicProcedure
    .input(z.string().cuid())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.stash.delete({
        where: {
          id: input,
        },
      });
    }),
});
