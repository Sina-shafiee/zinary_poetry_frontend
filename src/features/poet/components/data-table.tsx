import { DataTable } from '@/components/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilterField } from '@/types';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  isLoading: boolean;
}
export function PoetDataTable<TData, TColumn>({
  data,
  columns,
  isLoading,
  totalPages,
}: Props<TData, TColumn>) {
  const filterFields: DataTableFilterField<TData>[] = [
    {
      id: 'query' as Extract<keyof TData, string>,
      label: 'جستجو',
      placeholder: 'جستجوی شاعر...',
    },
  ];
  const { table } = useDataTable({
    data,
    columns,
    pageCount: totalPages,
    shallow: false,
    clearOnDefault: true,
    filterFields,
    initialState: {
      columnVisibility: {
        query: false,
      },
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded shadow bg-card flex items-center p-4 gap-2">
        <h2>لیست شاعران</h2>
      </div>
      {isLoading ? (
        <DataTableSkeleton
          columnCount={columns.length - 1}
          searchableColumnCount={1}
          rowCount={table.getState().pagination.pageSize}
        />
      ) : (
        <DataTable table={table}>
          <DataTableToolbar table={table} filterFields={filterFields} />
        </DataTable>
      )}
    </section>
  );
}
