import { useFormik } from 'formik'
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { TextArea } from '../../components/TextArea';

export const NewPostPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    onSubmit: (values) => {
      console.info('Submited', values)
    }
  })

  return (
    <Segment title="New Post">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()}}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} />

        <button type="submit">Create Post</button>
      </form>
    </Segment>
  );
};
