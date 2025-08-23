import { canBlockPosts } from '../../../Utils/can';
import { trpc } from '../../../lib/trpc';
import { zBlockPostTrpcInput } from './input';

export const blockPostTrpcRoute = trpc.procedure.input(zBlockPostTrpcInput).mutation(async ({ ctx, input }) => {
  const { postId } = input;
  if (!canBlockPosts(ctx.me)) {
    throw new Error('PERMISSION_DENIED');
  }
  const post = await ctx.prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    throw new Error('NOT_FOUND');
  }
  await ctx.prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      blockedAt: new Date(),
    },
  });
  return true;
});
