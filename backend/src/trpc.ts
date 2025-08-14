import { initTRPC } from '@trpc/server';
import _ from 'lodash'
import { z } from 'zod'

const posts = _.times(100, (i) => ({
    nick: `post-nick-${i}`,
    name: `Post ${i}`,
    description: `Description of post ${i}...`,
    text: _.times(100, (j) => `<p>Text paragraph ${j} of idea ${i}</p>`).join('')
}))

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getPosts: trpc.procedure.query(() => {
    return { posts: posts.map((post) => _.pick(post, ['nick', 'name', 'description'])) };
  }),
  getPost: trpc.procedure.input(
    z.object({
      postNick: z.string(),
    }),
  ).query(({ input }) => {
    const post = posts.find((post) => post.nick === input.postNick)
    if (!post) {throw new Error(`Post ${input.postNick} not found`)}
      return { post }
  })
});

export type TrpcRouter = typeof trpcRouter;