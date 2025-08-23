import { trpc } from '../../../lib/trpc';

export const getPostsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const posts = await ctx.prisma.post.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { posts };
});
