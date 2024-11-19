import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { LoginInput, loginSchema, useLogin } from '@/features/auth/api/login';
import { paths } from '@/config/paths';
import { setHookFormApiErrors } from '@/lib/utils';
import { Roles } from '@/types/enum';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = useLogin({
    mutationConfig: {
      onSuccess(data) {
        const redirectPath =
          redirectTo ||
          (data.data.roles.includes(Roles.WRITER)
            ? paths.writer_panel.dashboard.getHref()
            : paths.home.getHref());

        navigate(redirectPath, {
          replace: true,
        });
      },
      onError(error) {
        setHookFormApiErrors(error, form.setError);
      },
    },
  });

  const handleLogin = (input: LoginInput) => {
    login.mutate(input);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>‌ایمیل</FormLabel>
              <FormControl>
                <Input dir="ltr" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>‌رمز عبور</FormLabel>
              <FormControl>
                <PasswordInput dir="ltr" type="password" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {/* TODO: fix urls */}
                <Link to={paths.home.getHref()}>
                  ‌رمز عبور خود را فراموش کردید؟
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button disabled={login.isPending} className="w-full mt-2">
          وارد شوید
        </Button>
        <p className="text-foreground text-sm text-center">
          حساب کاربری ندارید؟
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="font-medium px-1 underline underline-offset-4"
          >
            ثبت نام کنید
          </Link>
        </p>
      </form>
    </Form>
  );
};
