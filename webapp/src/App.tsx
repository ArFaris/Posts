import { TrpcProvider } from './lib/trpc';
import { AllPostsPage } from './pages/AllPostsPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AllPostsPage />
    </TrpcProvider>
  );
};
