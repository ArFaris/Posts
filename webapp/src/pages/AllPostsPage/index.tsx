import { Link } from 'react-router-dom';
import { getViewPostRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss'

export const AllPostsPage = () => {
  // компонент - яваскрипт функция, начинающаяся с большой буквы, и возвращает jsx структуру (html теги ИЛИ синтаксический сахар для вызова функций)
  const { data, error, isLoading, isFetching, isError } = trpc.getPosts.useQuery();
  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
        <h1 className={css.title}>All Posts</h1>
        <div className={css.posts}>
            {data?.posts.map((post) => (
                <div className={css.post} key={post.nick}>
                    <h2 className={css.postName}>
                        <Link className={css.postLink} to={getViewPostRoute({ postNick: post.nick })}>
                            {post.name}
                        </Link>
                    </h2>
                    <p className={css.postDescription}>{post.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
};