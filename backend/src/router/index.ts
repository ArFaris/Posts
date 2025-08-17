import { trpc } from '../lib/trpc';
import { createPostTrpcRoute } from './createPost';
import { getPostTrpcRoute } from './getPost';
import { getPostsTrpcRoute } from './getPosts';

export const trpcRouter = trpc.router({
  createPost: createPostTrpcRoute,
  getPost: getPostTrpcRoute,
  getPosts: getPostsTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
