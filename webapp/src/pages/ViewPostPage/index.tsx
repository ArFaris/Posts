import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../components/Button';
import { Segment } from '../../components/Segment';
import { withPageWrapper } from '../../lib/pageWrapper';
import { getEditPostRoute, type ViewPostRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

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
})(({ post, me }) => (
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
));
