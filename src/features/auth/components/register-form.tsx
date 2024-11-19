import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  RegisterInput,
  registerSchema,
  useRegister,
} from '@/features/auth/api/regisrer';

import { paths } from '@/config/paths';
import { setHookFormApiErrors } from '@/lib/utils';
import { Roles } from '@/types/enum';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const register = useRegister({
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

  const handleRegister = (input: RegisterInput) => {
    register.mutate(input);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleRegister)}
      >
        <section className="flex gap-2 flex-wrap sm:flex-nowrap">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>نام خانوادگی</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
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
            </FormItem>
          )}
        />
        <Button disabled={register.isPending} className="w-full mt-2">
          ثبت نام
        </Button>
        <p className="text-foreground text-sm text-center">
          از قبل حساب کاربری دارید؟
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="font-medium px-1 underline underline-offset-4"
          >
            وارد شوید
          </Link>
        </p>
      </form>
    </Form>
  );
};
