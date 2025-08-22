import { z } from 'zod';
import { zCreatePostTrpcInput } from '../createPost/input';

export const zUpdatePostTrpcInput = zCreatePostTrpcInput.extend({
  postId: z.string().min(1),
}) satisfies z.ZodType<{
  postId: string;
}>;
