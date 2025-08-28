import { zSignInTrpcInput } from '@react_project/backend/src/router/auth/signIn/input';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import whiteDog from '../../../assets/images/dogs/whiteDog.png';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { FormItems } from '../../../components/FormItems';
import { Input } from '../../../components/Input';
import { Segment } from '../../../components/Segment';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { getAllPostsRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';

export const SignInPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();
  const signIn = trpc.signIn.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput as unknown as z.ZodType<any>,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      trpcUtils.invalidate().catch(() => {});
      navigate(getAllPostsRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <div className={css.form}>
      <img src={whiteDog} alt="White Dog" className={css.formImage} />
      <Segment title="Sign In" className={css.formSegment} width={235}>
        <form onSubmit={formik.handleSubmit}>
          <FormItems>
            <Input label="Nick" name="nick" formik={formik} />
            <Input label="Password" name="password" type="password" formik={formik} />
            <Alert {...alertProps} />
            <Button {...buttonProps}>Sign in</Button>
          </FormItems>
        </form>
      </Segment>
 </div>
  );
});