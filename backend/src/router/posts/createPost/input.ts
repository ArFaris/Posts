import { z } from 'zod';

export const zCreatePostTrpcInput = z.object({
  name: z.string().min(1),
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and daches'),
  description: z.string().min(1),
  text: z.string().min(100, 'Text should be at least 100 characters long'),
}) satisfies z.ZodType<{
  name: string;
  nick: string;
  description: string;
  text: string;
}>;
