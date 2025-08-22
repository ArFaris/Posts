import { trpc } from '../../lib/trpc';
import { zUpdatePostTrpcInput } from './input';

export const updatePostTrpcRoute = trpc.procedure.input(zUpdatePostTrpcInput).mutation(async ({ ctx, input }) => {
  const { postId, ...postInput } = input;
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED');
  }
  const post = await ctx.prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    throw new Error('NOT_FOUND');
  }
  if (ctx.me.id !== post.authorId) {
    throw new Error('NOT_YOUR_IDEA');
  }
  if (post.nick !== input.nick) {
    const exPost = await ctx.prisma.post.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (exPost) {
      throw new Error('Post with this nick already exists');
    }
  }
  await ctx.prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      ...postInput,
    },
  });
  return true;
});
