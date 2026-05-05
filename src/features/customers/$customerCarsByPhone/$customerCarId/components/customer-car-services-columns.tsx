import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { CustomerCarService } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { parseDisplayDate } from '@/lib/utils'

export const columns: ColumnDef<CustomerCarService>[] = [
  {
    accessorKey: 'order',
    header:'№',
    cell: ({ row }) => row.index + 1 + '.',
  },
  {
    accessorKey: 'serviceName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Xidmət' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('serviceName')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'changeDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tarix' />
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
