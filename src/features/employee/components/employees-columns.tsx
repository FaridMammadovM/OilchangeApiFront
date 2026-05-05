import { ColumnDef } from '@tanstack/react-table'
import { Employee } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Employee>[] = [
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
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Filial' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('description')}</div>,
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
