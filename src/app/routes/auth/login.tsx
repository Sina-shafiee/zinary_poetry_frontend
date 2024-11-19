import { AuthLayout } from '@/components/layout/auth-layout';

import { LoginForm } from '@/features/auth/components/login-form';

export const LoginPage = () => {
  return (
    <AuthLayout title="ورود به حساب کاربری">
      <LoginForm />
    </AuthLayout>
  );
};
