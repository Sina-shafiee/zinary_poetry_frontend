import { useSearchParams } from 'react-router-dom';

import { PoetDataTable } from '@/features/poet/components/data-table';
import { poetColumn } from '@/features/poet/components/columns';

import { usePoets } from '@/features/poet/api/get-poets';

export const PoetsPage = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = usePoets({
    variables: {
      page: Number(searchParams.get('page')),
      perPage: Number(searchParams.get('perPage')),
      sort: searchParams.get('sort'),
      searchQuery: searchParams.get('query'),
    },
    queryConfig: {
      throwOnError: true,
    },
  });

  return (
    <div className="mt-4">
      <PoetDataTable
        columns={poetColumn}
        isLoading={isLoading}
        data={data?.poets?.poets ?? []}
        totalPages={data?.poets?.totalPages ?? 0}
      />
    </div>
  );
};
