import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
import { updatePostTrpcRoute } from './UpdatePost';
import { createPostTrpcRoute } from './createPost';
import { getMeTrpcRoute } from './getMe';
import { getPostTrpcRoute } from './getPost';
import { getPostsTrpcRoute } from './getPosts';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';

export const trpcRouter = trpc.router({
  createPost: createPostTrpcRoute,
  getPost: getPostTrpcRoute,
  getPosts: getPostsTrpcRoute,
  getMe: getMeTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  updatePost: updatePostTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
