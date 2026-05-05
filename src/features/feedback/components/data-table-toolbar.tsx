import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Ad Soyad ilə axtarış...'
          value={
            (table.getColumn('fullName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('fullName')?.setFilterValue(event.target.value)
          }
          className='h-8'
        />
        <Input
          placeholder='Məzmun üzrə axtarış...'
          value={
            (table.getColumn('commitMessage')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('commitMessage')?.setFilterValue(event.target.value)
          }
          className='h-8'
        />
        <Input
          placeholder='Telefon ilə axtarış...'
          value={
            (table.getColumn('phone')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('phone')?.setFilterValue(event.target.value)
          }
          className='h-8'
        />
        <Input
          placeholder='Tarix üzrə axtarış...'
          value={
            (table.getColumn('insertedDate')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('insertedDate')?.setFilterValue(event.target.value)
          }
          className='h-8'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Sıfırla
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
