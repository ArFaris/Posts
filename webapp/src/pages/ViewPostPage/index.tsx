import { useParams } from 'react-router-dom';
import type { ViewPostRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss'

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
    <div>
      <h1 className={css.title}>{data.post.name}</h1>
      <p className={css.description}>{data.post.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.post.text }} />
    </div>
  );
};
