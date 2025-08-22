import { format } from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { Segment } from '../../components/Segment';
import type { ViewPostRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

export const ViewPostPage = () => {
  const { postNick } = useParams() as ViewPostRouteParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getPost.useQuery({
    postNick,
  });

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data?.post) {
    return <span>Post not found</span>;
  }

  return (
    <Segment title={data.post.name} description={data.post.description}>
      <div className={css.createdAt}>Created At: {format(data.post.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {data.post.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.post.text }} />
    </Segment>
  );
};
