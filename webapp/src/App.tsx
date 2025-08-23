import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppContextProvider } from './lib/ctx';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { NotFoundPage } from './pages/other/NotFoundPage'
import { AllPostsPage } from './pages/posts/AllPostsPage'
import { EditPostPage } from './pages/posts/EditPostPage'
import { NewPostPage } from './pages/posts/NewPostPage'
import { ViewPostPage } from './pages/posts/ViewPostPage'
import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllPostsRoute()} element={<AllPostsPage />} />
              <Route path={routes.getNewPostRoute()} element={<NewPostPage />} />
              <Route path={routes.getViewPostRoute(routes.viewPostRouteParams)} element={<ViewPostPage />} />
              <Route path={routes.getEditPostRoute(routes.editPostRouteParams)} element={<EditPostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};
