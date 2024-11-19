import { AuthLayout } from '@/components/layout/auth-layout';

import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterPage = () => {
  return (
    <AuthLayout
      title="ساخت حساب کاربری"
      classNames={{ formContainer: 'sm:max-w-md' }}
    >
      <RegisterForm />
    </AuthLayout>
  );
};
