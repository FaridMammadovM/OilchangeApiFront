import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import LongText from '@/components/long-text'
import { CustomerCar } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<CustomerCar>[] = [
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
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableSorting: false,
  },
  {
    accessorKey: 'carNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Qeydiyyat nişanı' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('carNumber')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Qeyd' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('description')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
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
