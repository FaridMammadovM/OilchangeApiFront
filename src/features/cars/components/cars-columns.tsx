import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { Car } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: 'order',
    header:'№',
    cell: ({ row }) => row.index + 1 + '.',
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Marka' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('brand')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Model' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('model')}</LongText>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Əməliyyatlar' />
    ),
    cell: DataTableRowActions,
  },
]
