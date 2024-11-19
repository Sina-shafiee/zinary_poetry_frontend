import * as React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { useUser } from '@/features/auth/api/get-user';
import { paths } from '@/config/paths';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AuthLayout = ({ title, children }: Props) => {
  const user = useUser({});
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  if (user.data) {
    return (
      <Navigate to={redirectTo ? redirectTo : paths.home.getHref()} replace />
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background">
      <section className="max-w-md sm:max-w-sm rounded p-6 w-full bg-background sm:bg-card relative z-20 space-y-6 sm:shadow-sm">
        <h2 className="text-xl mt-4 font-semibold sm:text-2xl">{title}</h2>
        {children}
      </section>
    </main>
  );
};
