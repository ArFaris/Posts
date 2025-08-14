import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAllPostsRoute, getViewPostRoute, viewPostRouteParams } from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { AllPostsPage } from './pages/AllPostsPage';
import { ViewPostPage } from './pages/ViewPostPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllPostsRoute()} element={<AllPostsPage />} />
          <Route path={getViewPostRoute(viewPostRouteParams)} element={<ViewPostPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
