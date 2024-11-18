import { useUser } from '@/features/auth/api/get-user';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser({});

  if (!user.data) {
    // TODO: read login path from config.paths
    return <Navigate to={'/login'} replace />;
  }

  return children;
};
