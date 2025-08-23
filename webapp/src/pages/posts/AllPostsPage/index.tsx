import { zGetPostsTrpcInput } from '@react_project/backend/src/router/posts/getPosts/input';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import type z from 'zod';
import { Alert } from '../../../components/Alert';
import { Input } from '../../../components/Input';
import { Loader } from '../../../components/Loader';
import { Segment } from '../../../components/Segment';
import { useForm } from '../../../lib/form';
import { getViewPostRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';

export const AllPostsPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetPostsTrpcInput.pick({ search: true }) as unknown as z.ZodType<{
      search: string;
    }>,
  });
  const [search] = useDebounce(formik.values.search, 500);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getPosts.useInfiniteQuery(
      {
        limit: 2,
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <Segment title="All Posts">
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data?.pages[0].posts.length ? (
        <Alert color="brown">Nothing found by search</Alert>
      ) : (
        <div className={css.posts}>
          {data?.pages
            .flatMap((page) => page.posts)
            .map((post) => (
              <div className={css.post} key={post.nick}>
                <Segment
                  size={2}
                  title={
                    <Link className={css.postLink} to={getViewPostRoute({ postNick: post.nick! })}>
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
                  void fetchNextPage();
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage && <Loader type="section" />}
          </div>
        </div>
      )}
    </Segment>
  );
};
