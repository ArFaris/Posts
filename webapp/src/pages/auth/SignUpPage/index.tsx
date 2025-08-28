import { zSignUpTrpcInput } from '@react_project/backend/src/router/auth/signUp/input';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import brownDog from '../../../assets/images/dogs/brownDog.png';
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

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();
  const signUp = trpc.signUp.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          });
        }
      }) as unknown as z.ZodType<any>,
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      trpcUtils.invalidate();
      navigate(getAllPostsRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <div className={css.form}>
      <Segment title="Sign Up" className={css.formSegment} width={235}>
        <form onSubmit={formik.handleSubmit}>
          <FormItems>
            <Input label="Nick" name="nick" formik={formik} />
            <Input label="E-mail" name="email" formik={formik} />
            <Input label="Password" name="password" type="password" formik={formik} />
            <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
            <Alert {...alertProps} />
            <Button {...buttonProps}>Sign Up</Button>
          </FormItems>
        </form>
      </Segment>
      <img src={brownDog} alt="Brown Dog" className={css.formImage}/>
    </div>
  );
});
