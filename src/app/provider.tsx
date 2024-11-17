import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return (
    <React.Suspense fallback={<p>loading...</p>}>{children}</React.Suspense>
  );
};
