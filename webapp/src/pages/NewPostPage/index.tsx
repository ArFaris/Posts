import { zCreatePostTrpcInput } from '@react_project/backend/src/router/createPost/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import type { z } from 'zod';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { TextArea } from '../../components/TextArea';
import { trpc } from '../../lib/trpc';

export const NewPostPage = () => {
  const createPost = trpc.createPost.useMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      zCreatePostTrpcInput as unknown as z.ZodType<{
        name: string;
        nick: string;
        description: string;
        text: string;
      }>
    ),
    onSubmit: async (values) => {
      await createPost.mutateAsync(values);
    },
  });

  return (
    <Segment title="New Post">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit">Create Post</button>
      </form>
    </Segment>
  );
};
