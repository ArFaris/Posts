import { z } from 'zod';

export const zBlockPostTrpcInput = z.object({
  postId: z.string().min(1),
});
