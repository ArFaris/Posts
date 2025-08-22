import type { TrpcRouterOutput } from '@react_project/backend/src/router';
import { zUpdatePostTrpcInput } from '@react_project/backend/src/router/updatePost/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { pick } from 'lodash';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ZodSchema } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { TextArea } from '../../components/TextArea';
import { getViewPostRoute, type EditPostRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

const EditPostComponent = ({ post }: { post: NonNullable<TrpcRouterOutput['getPost']['post']> }) => {
  const navigate = useNavigate();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const updatePost = trpc.updatePost.useMutation();
  const formik = useFormik({
    initialValues: pick(post, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(
      zUpdatePostTrpcInput.omit({ postId: true }) as unknown as ZodSchema<{
        name: string;
        nick: string;
        description: string;
        text: string;
      }>
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await updatePost.mutateAsync({ postId: post.id, ...values });
        navigate(getViewPostRoute({ postNick: values.nick }));
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
  });

  return (
    <Segment title={`Edit Post: ${post.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <TextArea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update post</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const EditPostPage = () => {
  const { postNick } = useParams() as EditPostRouteParams;

  const getPostResult = trpc.getPost.useQuery({
    postNick,
  });
  const getMeResult = trpc.getMe.useQuery();

  if (getPostResult.isLoading || getPostResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>;
  }

  if (getPostResult.isError) {
    return <span>Error: {getPostResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getPostResult.data?.post) {
    return <span>Post not found</span>;
  }

  const post = getPostResult.data.post;
  const me = getMeResult.data?.me;

  if (!me) {
    return <span>A post can only be edited by the author</span>;
  }

  return <EditPostComponent post={post} />;
};
