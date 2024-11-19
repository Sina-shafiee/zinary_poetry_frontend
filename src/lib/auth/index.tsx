import { Navigate, useLocation } from 'react-router-dom';

import { useUser } from '@/features/auth/api/get-user';

import { paths } from '@/config/paths';
import { Roles } from '@/types/enum';

interface Props {
  children: React.ReactNode;
  allowedRoles: Array<Roles>;
}
export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { data: user } = useUser({});
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to={paths.auth.login.getHref(pathname)} replace />;
  }

  const hasAccess = allowedRoles.some(role => user.data.roles.includes(role));

  return hasAccess ? (
    <>{children}</>
  ) : (
    <Navigate to={paths.home.getHref()} replace />
  );
};
