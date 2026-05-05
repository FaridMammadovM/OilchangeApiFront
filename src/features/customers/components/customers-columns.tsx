import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import LongText from '@/components/long-text'
import { Customer } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'order',
    header:'№',
    cell: ({ row }) => row.index + 1 + '.',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ad' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('name')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'surname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Soyad' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('surname')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Əlaqə telefonu' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('phone')}</LongText>
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
    accessorKey: 'customersCars',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Qeydiyyat nişanları' />
    ),
    cell: ({ row }) => <div className='w-fit'>{row.original.customersCars?.map(({ carNumber }) => (
      <span key={carNumber} className='p-1 border rounded-md mr-2'>{carNumber}</span>
    ))}</div>,
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
