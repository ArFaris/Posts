import _ from 'lodash';
import { trpc } from '../../../lib/trpc';
import { zGetPostsTrpcInput } from './input';

export const getPostsTrpcRoute = trpc.procedure.input(zGetPostsTrpcInput).query(async ({ ctx, input }) => {
  // const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, ' & ') : undefined;
  const rawPosts = await ctx.prisma.post.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
      _count: {
        select: {
          postsLikes: true,
        },
      },
    },
    where: !input.search
      ? undefined
      : {
          OR: [
            {
              name: {
                search: normalizedSearch,
              },
            },
            {
              description: {
                search: normalizedSearch,
              },
            },
            {
              text: {
                search: normalizedSearch,
              },
            },
          ],
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
  const nextPost = rawPosts[input.limit];
  const nextCursor = nextPost?.serialNumber;
  const rawPostsExceptNext = rawPosts.slice(0, input.limit);
  const postsExceptNext = rawPostsExceptNext.map((post) => ({
    ..._.omit(post, ['_count']),
    likesCount: post._count.postsLikes,
  }));

  return { posts: postsExceptNext, nextCursor };
});
