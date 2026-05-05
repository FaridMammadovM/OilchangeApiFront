import { ColumnDef } from '@tanstack/react-table'
import { Antifreeze } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Antifreeze>[] = [
  {
    accessorKey: 'order',
    header:'№',
    cell: ({ row }) => row.index + 1 + '.',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Antifriz adı' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('name')}</div>,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Əməliyyatlar' />
    ),
    cell: DataTableRowActions,
  },
]
