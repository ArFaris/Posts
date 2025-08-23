import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSignInRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();

  useEffect(() => {
    Cookies.remove('token');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    trpcUtils.invalidate().then(() => {
      navigate(getSignInRoute());
    });
  }, []);

  return <p>Loading...</p>;
};
