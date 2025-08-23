import z from 'zod';
import { trpc } from '../../../lib/trpc';

export const getPostTrpcRoute = trpc.procedure
  .input(
    z.object({
      postNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({
      where: {
        nick: input.postNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    });

    return { post };
  });
