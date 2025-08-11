import { initTRPC } from '@trpc/server';

const posts = [
  {
    nick: 'post-nick-1',
    name: 'Post 1',
    description: 'Description of post 1...',
  },
  {
    nick: 'post-nick-2',
    name: 'Post 2',
    description: 'Description of post 2...',
  },
  {
    nick: 'post-nick-3',
    name: 'Post 3',
    description: 'Description of post 3...',
  },
  {
    nick: 'post-nick-4',
    name: 'Post 4',
    description: 'Description of post 4...',
  },
  {
    nick: 'post-nick-5',
    name: 'Post 5',
    description: 'Description of post 5...',
  },
];

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getPosts: trpc.procedure.query(() => {
    return { posts };
  }),
});

export type TrpcRouter = typeof trpcRouter;
