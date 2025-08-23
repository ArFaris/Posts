import _ from 'lodash';
import z from 'zod';
import { trpc } from '../../../lib/trpc';

export const getPostTrpcRoute = trpc.procedure
  .input(
    z.object({
      postNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawPost = await ctx.prisma.post.findUnique({
      where: {
        nick: input.postNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        postsLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            postsLikes: true,
          },
        },
      },
    });

    const isLikedByMe = !!rawPost?.postsLikes.length;
    const likesCount = rawPost?._count.postsLikes || 0;
    const post = rawPost && { ..._.omit(rawPost, ['PostsLikes', '_count']), isLikedByMe, likesCount };

    return { post };
  });
