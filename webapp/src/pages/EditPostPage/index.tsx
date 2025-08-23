import { zUpdatePostTrpcInput } from '@react_project/backend/src/router/updatePost/input';
import { pick } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import type { ZodSchema } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { TextArea } from '../../components/TextArea';
import { useForm } from '../../lib/form';
import { withPageWrapper } from '../../lib/pageWrapper';
import { getViewPostRoute, type EditPostRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const EditPostPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { postNick } = useParams() as EditPostRouteParams;
    return trpc.getPost.useQuery({
      postNick,
    });
  },
  checkExists: ({ queryResult }) => !!queryResult.data.post,
  checkExistsMessage: 'Post not found',
  checkAccess: ({ queryResult, ctx }) => !!ctx.me && ctx.me.id === queryResult.data?.post?.authorId,
  checkAccessMessage: 'A post can only be edited by the author',
  setProps: ({ queryResult }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    post: queryResult.data.post!,
  }),
})(({ post }) => {
  const navigate = useNavigate();
  const updatePost = trpc.updatePost.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(post, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdatePostTrpcInput.omit({ postId: true }) as unknown as ZodSchema<{
      name: string;
      nick: string;
      description: string;
      text: string;
    }>,
    onSubmit: async (values) => {
      await updatePost.mutateAsync({ postId: post.id, ...values });
      navigate(getViewPostRoute({ postNick: values.nick }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit Post: ${post.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <TextArea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Edit Post</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
