import { type MaybePost, canEditPost } from '@react_project/backend/src/Utils/can';
import { zUpdatePostTrpcInput } from '@react_project/backend/src/router/posts/updatePost/input';
import { useNavigate, useParams } from 'react-router-dom';
import type { ZodSchema } from 'zod';
import ballownDog from '../../../assets/images/dogs/ballownDog.png';
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
import css from './index.module.scss';

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
        <div className={css.form}>
      <img src={ballownDog} alt="Ballown Dog" className={css.formImage}/>
      <Segment title={`Edit Post: ${post.nick}`} className={css.formSegment} width={408}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <FormItems>
            <Input name="name" label="Name" formik={formik} />
            <Input name="nick" label="Nick" formik={formik} />
            <Input name="description" label="Description" formik={formik} maxWidth={500} />
            <TextArea name="text" label="Text" formik={formik} />
            <Alert {...alertProps} />
            <Button {...buttonProps}>Create post</Button>
          </FormItems>
        </form>
      </Segment>
    </div>
  );
});
