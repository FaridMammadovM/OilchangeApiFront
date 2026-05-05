import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { Service } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { parseDisplayDate } from '@/lib/utils'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'order',
    header: '№',
    cell: ({ row }) => row.index + 1 + '.',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ad' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('name')}</div>,
    enableSorting: false
  },
  {
    accessorKey: 'surname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Soyad' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('surname')}</div>,
    enableSorting: false
  },
  {
    accessorKey: 'serviceName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Görülmüş xidmətlər' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('serviceName')}</div>,
    enableSorting: false
  },
  {
    accessorKey: 'carNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Qeydiyyat nişanı' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('carNumber')}</LongText>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'branchName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Filial' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('branchName')}</LongText>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'changeDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Xidmət tarixi' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('changeDate')}</LongText>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const timeA = parseDisplayDate(rowA.getValue(columnId)).getTime();
      const timeB = parseDisplayDate(rowB.getValue(columnId)).getTime();
      return timeA - timeB;
    },
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Əməliyyatlar' />
    ),
    cell: DataTableRowActions,
  },
]
