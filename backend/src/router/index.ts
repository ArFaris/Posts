import { trpc } from '../lib/trpc';
import { createPostTrpcRoute } from './createPost';
import { getPostTrpcRoute } from './getPost';
import { getPostsTrpcRoute } from './getPosts';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';

export const trpcRouter = trpc.router({
  createPost: createPostTrpcRoute,
  getPost: getPostTrpcRoute,
  getPosts: getPostsTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
