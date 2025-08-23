import { zCreatePostTrpcInput } from '@react_project/backend/src/router/posts/createPost/input';
import type { z } from 'zod';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { FormItems } from '../../../components/FormItems';
import { Input } from '../../../components/Input';
import { Segment } from '../../../components/Segment';
import { TextArea } from '../../../components/TextArea';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { trpc } from '../../../lib/trpc';

export const NewPostPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createPost = trpc.createPost.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreatePostTrpcInput as unknown as z.ZodType<{
      name: string;
      nick: string;
      description: string;
      text: string;
    }>,
    onSubmit: async (values) => {
      await createPost.mutateAsync(values);
      formik.resetForm();
    },
    successMessage: 'Post created',
    showValidationAlert: true,
  });

  return (
    <Segment title="New Post">
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
  );
});
