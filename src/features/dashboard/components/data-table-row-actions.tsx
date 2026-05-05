import { Row } from '@tanstack/react-table'
import { IconEye } from '@tabler/icons-react'
import { Service } from '../data/schema'
import { Link } from '@tanstack/react-router'
import { useAppState } from '@/stores/appStore'

interface DataTableRowActionsProps {
  row: Row<Service>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const setCarNumber = useAppState().setCarNumber;

  return (
    <Link
      className='flex items-center h-8 w-8 p-0 data-[state=open]:bg-muted' to={'/customers/$customerCarsByPhone/$customerCarId'}
      params={{ customerCarsByPhone: row.original.phone, customerCarId: `${row.original.customersCarsMatrixId}` }}
      onClick={() => setCarNumber(row.original.carNumber)}
    >
      <IconEye className='h-4 w-4' />
    </Link>
  )
}
