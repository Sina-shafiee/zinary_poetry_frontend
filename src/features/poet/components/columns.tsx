import { Ellipsis } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { DateObject } from 'react-multi-date-picker';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';

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
import { usePoetsTableAction } from '../store/table-action';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';

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
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="آیدی شاعر" />
    ),
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: false,
    maxSize: 48,
    meta: {
      title: 'آیدی شاعر',
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
    cell: ({ row }) => (
      <div>
        {new DateObject({
          locale: persian_fa,
          calendar: persian,
          date: new Date(row.getValue('birthYear')),
        }).format('YYYY/MM/DD')}
      </div>
    ),
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
    cell: ({ row }) => (
      <div>
        {' '}
        {new DateObject({
          locale: persian_fa,
          calendar: persian,
          date: new Date(row.getValue('deathYear')),
        }).format('YYYY/MM/DD')}
      </div>
    ),
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
    id: 'actions',
    cell: function Cell({ row }) {
      const updateAction = usePoetsTableAction(state => state.updateAction);
      const navigate = useNavigate();
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
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  paths.writer_panel.update_poet.getHref(row.getValue('id')),
                )
              }
            >
              ویرایش
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => updateAction({ row, type: 'delete' })}
            >
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 40,
  },
];
