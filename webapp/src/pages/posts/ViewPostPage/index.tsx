import type { TrpcRouterOutput } from '@react_project/backend/src/router'
import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../../components/Button';
import { Segment } from '../../../components/Segment';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { getEditPostRoute, type ViewPostRouteParams } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';


const LikeButton = ({ post }: { post: NonNullable<TrpcRouterOutput['getPost']['post']> }) => {
  const trpcUtils = trpc.useContext()
  const setPostLike = trpc.setPostLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetPostData = trpcUtils.getPost.getData({ postNick: post.nick! })
      if (oldGetPostData?.post) {
        const newGetPostData = {
          ...oldGetPostData,
          post: {
            ...oldGetPostData.post,
            isLikedByMe,
            likesCount: oldGetPostData.post.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getPost.setData({ postNick: post.nick! }, newGetPostData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getPost.invalidate({ postNick: post.nick })
    },
  })
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setPostLike.mutateAsync({ postId: post.id!, isLikedByMe: !post.isLikedByMe })
      }}
    >
      {post.isLikedByMe ? 'Unlike' : 'Like'}
    </button>
  )
}

export const ViewPostPage = withPageWrapper({
  useQuery: () => {
    const { postNick } = useParams() as ViewPostRouteParams;
    return trpc.getPost.useQuery({
      postNick,
    });
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    post: checkExists(queryResult.data.post, 'Post not found'),

    me: ctx.me,
  }),
  showLoaderOnFetching: false,
})(({ post, me }) => (
  <Segment title={post.name} description={post.description}>
    <div className={css.createdAt}>Created At: {format(post.createdAt!, 'yyyy-MM-dd')}</div>
    <div className={css.author}>
      Author: {post.author!.nick}
      {post.author!.name ? ` (${post.author!.name})` : ''}
    </div>{' '}
    <div className={css.text} dangerouslySetInnerHTML={{ __html: post.text! }} />
    <div className={css.likes}>
      Likes: {post.likesCount}
      {me && (
        <>
          <br />
          <LikeButton post={post} />
        </>
      )}
    </div>
    {me?.id === post.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditPostRoute({ postNick: post.nick! })}>Edit Post</LinkButton>
      </div>
    )}
  </Segment>
));
