import { trpc } from '../../lib/trpc';

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
    // теги - структурные элементы таблицы
    <div>
      <h1>All Posts</h1>
      {data?.posts.map((post) => (
        <div key={post.nick}>
          <h2>{post.name}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};
