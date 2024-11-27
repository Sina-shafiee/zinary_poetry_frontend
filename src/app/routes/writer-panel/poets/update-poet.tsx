import { UpdatePoetForm } from '@/features/poet/components/update-form';

import { PageTitle } from '@/components/ui/page-title';
import { usePoet } from '@/features/poet/api/get-poet';
import { useParams } from 'react-router-dom';
import { UpdatePoetFormSkeleton } from '@/features/poet/components/update-form-skeleton';

export const UpdatePoetPage = () => {
  const { poetId } = useParams();

  const { data, isLoading } = usePoet({
    variables: { id: poetId! },
    queryConfig: {
      throwOnError: true,
    },
  });

  if (isLoading) {
    return <UpdatePoetFormSkeleton />;
  }

  if (!data?.poet) {
    return (
      <h2 className="text-center py-24 text-xl font-medium">
        محتوای موردنظر پیدا نشد لطفا مشکل را به پشتیبانی سایت گزازش کنید.
      </h2>
    );
  }
  return (
    <section className="flex flex-col gap-4 mt-4">
      <PageTitle _title={`ویرایش ${data.poet.fullName}`} />
      <UpdatePoetForm
        poet={{
          biography: data.poet.biography,
          birthYear: data.poet.birthYear,
          deathYear: data.poet.deathYear,
          fullName: data.poet.fullName,
          id: data.poet.id,
        }}
      />
    </section>
  );
};
