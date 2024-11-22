import { PoetDataTable } from '@/features/poet/components/data-table';
import { poetColumn } from '@/features/poet/components/columns';

import { usePoets } from '@/features/poet/api/get-poets';

import { usePoetTableSearchParams } from '@/features/poet/hooks/use-poet-table-search-params';

export const PoetsPage = () => {
  const params = usePoetTableSearchParams();

  const { data, isLoading } = usePoets({
    variables: params,
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
