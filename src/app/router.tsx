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
    {
      path: paths.auth.login.path,
      lazy: async () => {
        const { LoginPage } = await import('@/app/routes/auth/login');
        return {
          Component: LoginPage,
        };
      },
      ErrorBoundary: () => <p>Oops! somthing went wrong</p>,
    },
    {
      path: paths.auth.register.path,
      lazy: async () => {
        const { RegisterPage } = await import('@/app/routes/auth/register');
        return {
          Component: RegisterPage,
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
