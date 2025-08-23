import { z } from 'zod';

export const zSetPostLikePostTrpcInput = z.object({
  postId: z.string().min(1),
  isLikedByMe: z.boolean(),
});
