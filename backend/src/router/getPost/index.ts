import z from 'zod';
import { posts } from '../../lib/posts';
import { trpc } from '../../lib/trpc';

export const getPostTrpcRoute = trpc.procedure
  .input(
    z.object({
      postNick: z.string(),
    })
  )
  .query(({ input }) => {
    const post = posts.find((post) => post.nick === input.postNick);
    if (!post) {
      throw new Error(`Post ${input.postNick} not found`);
    }
    return { post };
  });
