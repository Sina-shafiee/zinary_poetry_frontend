import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { paths } from '@/config/paths';

import { Roles } from '@/types/enum';

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
    {
      path: paths.writer_panel.root.path,
      lazy: async () => {
        const [{ WriterDashboardLayout }, { ProtectedRoute }] =
          await Promise.all([
            await import('@/components/layout/writer-dashboard-layout'),
            await import('@/lib/auth'),
          ]);

        return {
          Component: () => (
            <ProtectedRoute allowedRoles={[Roles.WRITER]}>
              <WriterDashboardLayout />
            </ProtectedRoute>
          ),
        };
      },
      children: [
        {
          path: paths.writer_panel.dashboard.path,
          lazy: async () => {
            const { WriterDashboard } = await import(
              '@/app/routes/writer-panel/dashboard'
            );
            return {
              Component: WriterDashboard,
            };
          },
          ErrorBoundary: () => <p>Oops! somthing went wrong</p>,
        },
        {
          path: paths.writer_panel.poets.path,
          lazy: async () => {
            const { PoetsPage } = await import(
              '@/app/routes/writer-panel/poets/poets'
            );
            return {
              Component: PoetsPage,
            };
          },
          ErrorBoundary: () => <p>Oops! somthing went wrong</p>,
        },
        {
          path: paths.writer_panel.update_poet.path,
          lazy: async () => {
            const { UpdatePoetPage } = await import(
              '@/app/routes/writer-panel/poets/update-poet'
            );
            return {
              Component: UpdatePoetPage,
            };
          },
          ErrorBoundary: () => <p>Oops! somthing went wrong</p>,
        },
      ],
    },
  ]);
};

export const AppRouter = () => {
  return <RouterProvider router={createRouter()} />;
};
