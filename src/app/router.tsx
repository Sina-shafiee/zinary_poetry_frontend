import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { paths } from '@/config/paths';

const createRouter = () => {
  return createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const { Landing } = await import('@/app/routes/landing');
        return {
          Component: Landing,
        };
      },
      ErrorBoundary: () => <p>Oops! somthing went wrong</p>,
    },
  ]);
};

export const AppRouter = () => {
  // TODO: pass query client for preloading data using react-router loader
  return <RouterProvider router={createRouter()} />;
};
