import { trpc } from '../../lib/trpc';
import { zCreatePostTrpcInput } from './input';

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw Error('UNAUTHORIZED');
  }
  const exPost = await ctx.prisma.post.findUnique({
    where: {
      nick: input.nick,
    },
  });

  if (exPost) {
    throw new Error('Post with this nick already exists');
  }

  await ctx.prisma.post.create({
    data: { ...input, authorId: ctx.me.id },
  });

  return true;
});
