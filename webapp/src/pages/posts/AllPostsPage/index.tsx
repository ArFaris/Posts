import { Link } from 'react-router-dom';
import { Alert } from '../../../components/Alert'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment';
import { getViewPostRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';

export const AllPostsPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getPosts.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All Posts">
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.posts}>
          {data?.pages
            .flatMap((page) => page.posts)
            .map((post) => (
              <div className={css.post} key={post.nick}>
                <Segment
                  size={2}
                  title={
                    <Link className={css.postLink} to={getViewPostRoute({ postNick: post.nick })}>
                      {post.name}
                    </Link>
                  }
                  description={post.description}
                                    >
                    Likes: {post.likesCount}
                  </Segment>
              </div>
            ))}
          <div className={css.more}>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={() => {
                  void fetchNextPage()
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage &&  <Loader type="section" />
              }
          </div>
        </div>
      )}
    </Segment>
  );
};
