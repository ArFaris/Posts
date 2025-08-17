import { posts } from '../../lib/posts';
import { trpc } from '../../lib/trpc';
import { zCreatePostTrpcInput } from './input';

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(({ input }) => {
  posts.unshift(input);
  return true;
});
