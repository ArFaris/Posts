import { Link } from 'react-router-dom';
import { Segment } from '../../../components/Segment';
import { getViewPostRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';

export const AllPostsPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getPosts.useQuery();
  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Segment title="All Posts">
      <div className={css.posts}>
        {data?.posts.map((post) => (
          <div className={css.post} key={post.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.postLink} to={getViewPostRoute({ postNick: post.nick })}>
                  {post.name}
                </Link>
              }
              description={post.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};
