import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
import { getMeTrpcRoute } from './auth/getMe';
import { signInTrpcRoute } from './auth/signIn';
import { signUpTrpcRoute } from './auth/signUp';
import { updatePasswordTrpcRoute } from './auth/updatePassword';
import { updateProfileTrpcRoute } from './auth/updateProfile';
import { updatePostTrpcRoute } from './posts/UpdatePost';
import { createPostTrpcRoute } from './posts/createPost';
import { getPostTrpcRoute } from './posts/getPost';
import { getPostsTrpcRoute } from './posts/getPosts';
import { setPostLikeTrpcRoute } from './posts/setPostLike';

export const trpcRouter = trpc.router({
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  createPost: createPostTrpcRoute,
  getPost: getPostTrpcRoute,
  getPosts: getPostsTrpcRoute,
  setPostLike: setPostLikeTrpcRoute,
  updatePost: updatePostTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
