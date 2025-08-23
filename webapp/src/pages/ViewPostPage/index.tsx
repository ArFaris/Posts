import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { useMe } from '../../lib/ctx';
import { getEditPostRoute, type ViewPostRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const ViewPostPage = () => {
  const { postNick } = useParams() as ViewPostRouteParams;

  const getPostResult = trpc.getPost.useQuery({
    postNick,
  });
  const me = useMe();

  if (getPostResult.isLoading || getPostResult.isFetching) {
    return <span>Loading...</span>;
  }

  if (getPostResult.isError) {
    return <span>Error: {getPostResult.error.message}</span>;
  }

  if (!getPostResult.data?.post) {
    return <span>Post not found</span>;
  }

  const post = getPostResult.data.post;

  return (
    <Segment title={post.name} description={post.description}>
      <div className={css.createdAt}>Created At: {format(post.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {post.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: post.text }} />
      {me?.id === post.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditPostRoute({ postNick: post.nick })}>Edit Post</LinkButton>
        </div>
      )}
    </Segment>
  );
};
