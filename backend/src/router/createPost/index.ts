import { posts } from '../../lib/posts';
import { trpc } from '../../lib/trpc';
import { zCreatePostTrpcInput } from './input';

export const createPostTrpcRoute = trpc.procedure.input(zCreatePostTrpcInput).mutation(({ input }) => {
  if (posts.find((post) => post.nick === input.nick)) {
    throw new Error('Post with this nick already exists');
  }
  posts.unshift(input);
  return true;
});
