import { trpc } from '../../../lib/trpc';
import { zGetPostsTrpcInput } from './input';

export const getPostsTrpcRoute = trpc.procedure.input(zGetPostsTrpcInput).query(async ({ ctx, input }) => {
  const posts = await ctx.prisma.post.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  });
  const nextPost = posts[input.limit];
  const nextCursor = nextPost?.serialNumber;
  const postsExceptNext = posts.slice(0, input.limit);

  return { posts: postsExceptNext, nextCursor };
});
