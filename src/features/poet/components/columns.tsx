import { Ellipsis } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { NonNullablePoetType } from '@/features/poet/api/get-poets';

export const poetColumn: Array<ColumnDef<NonNullablePoetType>> = [
  {
    id: 'select',
    size: 24,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="انتخاب همه"
      />
    ),
    cell: ({ row }) => (
      <div className="size-5">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="انتخاب سطر"
          className="translate-y-0.5"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      title: 'انتخاب',
    },
  },
  {
    id: 'fullName',
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="نام و نام خانوادگی" />
    ),
    cell: ({ row }) => <div>{row.getValue('fullName')}</div>,
    enableSorting: true,
    enableHiding: false,
    meta: {
      title: 'نام و نام خانوادگی',
    },
  },
  {
    id: 'birthYear',
    accessorKey: 'birthYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاریخ تولد" />
    ),
    cell: ({ row }) => <div>{row.getValue('birthYear')}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: 'تاریخ تولد',
    },
  },

  {
    id: 'deathYear',
    accessorKey: 'deathYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاریخ وفات" />
    ),
    cell: ({ row }) => <div>{row.getValue('deathYear')}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: 'تاریخ وفات',
    },
  },
  {
    id: 'query',
    enableHiding: false,
  },
  {
    id: 'year',
    accessorKey: 'birthYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاریخ فلان" />
    ),
    cell: ({ row }) => <div>{row.getValue('year')}</div>,
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: 'تاریخ فلان',
    },
  },

  {
    id: 'actions',
    cell: function Cell() {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <Ellipsis className="size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>ویرایش</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>حذف</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 40,
  },
];
