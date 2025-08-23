import { type MaybePost, canEditPost } from '@react_project/backend/src/Utils/can';
import { zUpdatePostTrpcInput } from '@react_project/backend/src/router/posts/updatePost/input';
import { useNavigate, useParams } from 'react-router-dom';
import type { ZodSchema } from 'zod';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { FormItems } from '../../../components/FormItems';
import { Input } from '../../../components/Input';
import { Segment } from '../../../components/Segment';
import { TextArea } from '../../../components/TextArea';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { getViewPostRoute, type EditPostRouteParams } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';

export const EditPostPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { postNick } = useParams() as EditPostRouteParams;
    return trpc.getPost.useQuery({
      postNick,
    });
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const post = checkExists(queryResult.data.post, 'Post not found');
    checkAccess(canEditPost(ctx.me, post as MaybePost), 'An post can only be edited by the author');
    return {
      post,
    };
  },
})(({ post }) => {
  const navigate = useNavigate();
  const updatePost = trpc.updatePost.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: post?.name ?? '',
      nick: post?.nick ?? '',
      description: post?.description ?? '',
      text: post?.text ?? '',
    },
    validationSchema: zUpdatePostTrpcInput.omit({ postId: true }) as unknown as ZodSchema<{
      name: string;
      nick: string;
      description: string;
      text: string;
    }>,
    onSubmit: async (values) => {
      await updatePost.mutateAsync({ postId: post.id!, ...values });
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
