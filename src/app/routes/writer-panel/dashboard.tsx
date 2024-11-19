import { useUser } from '@/features/auth/api/get-user';

export const WriterDashboard = () => {
  const user = useUser({});

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <p className="-mt-20 text-2xl">
        در حال ساخت و ساز میباشد {user.data!.data.first_name} عزیز
      </p>
    </div>
  );
};
