import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { Feedback } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { format } from 'date-fns'

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: 'order',
    header:'№',
    cell: ({ row }) => row.index + 1 + '.',
  },
  {
    id: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ad soyad' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.original.name + ' ' + row.original.surname}</LongText>
    ),
    filterFn: (row, _, filterValue) => {
      const fullName = `${row.original.name} ${row.original.surname}`.toLowerCase();
      return fullName.includes(filterValue.toLowerCase());
    },
    enableSorting: false,
  },
  {
    accessorKey: 'commitMessage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Məzmun' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('commitMessage')}</LongText>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Telefon' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('phone')}</LongText>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'insertedDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tarix' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{format(row.getValue('insertedDate'), 'dd.MM.yyyy')}</LongText>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const timeA = new Date(rowA.getValue(columnId)).getTime();
      const timeB = new Date(rowB.getValue(columnId)).getTime();
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
