import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCustomerCarsContext } from '../context/customer-cars-context'
import { CustomerCar } from '../data/schema'
import { useNavigate } from '@tanstack/react-router'
import { useAppState } from '@/stores/appStore'

interface DataTableRowActionsProps {
  row: Row<CustomerCar>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const setCarNumber = useAppState().setCarNumber;
  const navigate = useNavigate();
  const { setOpen, setCurrentRow } = useCustomerCarsContext()
  return (
    <div className='flex'>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('edit')
            }}
          >
            Düzəliş
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='!text-red-500'
          >
            Sil
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant='link'
        className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        onClick={() => {
          navigate({
            to: row.original.id?.toString(),
          })
          setCarNumber(row.original.carNumber)
        }}
      >
        <IconEye className='h-4 w-4' />
      </Button>
    </div>
  )
}
