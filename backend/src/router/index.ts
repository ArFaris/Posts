import { trpc } from '../lib/trpc';
import { createPostTrpcRoute } from './createPost';
import { getPostTrpcRoute } from './getPost';
import { getPostsTrpcRoute } from './getPosts';
import { signUpTrpcRoute } from './signUp';

export const trpcRouter = trpc.router({
  createPost: createPostTrpcRoute,
  getPost: getPostTrpcRoute,
  getPosts: getPostsTrpcRoute,
  signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
