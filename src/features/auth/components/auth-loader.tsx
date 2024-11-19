import * as React from 'react';
import { useUser } from '@/features/auth/api/get-user';

interface Props {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export const AuthLoader = ({
  children,
  loadingFallback,
  errorFallback,
}: Props) => {
  const user = useUser({});

  if (user.isLoading) {
    return loadingFallback || 'loading...';
  }
  if (user.isError && errorFallback) {
    return errorFallback;
  }
  return children;
};
