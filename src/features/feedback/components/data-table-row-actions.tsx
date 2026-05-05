import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { useFeedbacksContext } from '../context/feedbacks-context'
import { Feedback } from '../data/schema'
import { IconEye } from '@tabler/icons-react'

interface DataTableRowActionsProps {
  row: Row<Feedback>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useFeedbacksContext()
  return (
    <Button
      variant='link'
      className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
      onClick={() => {
        setCurrentRow(row.original)
        setOpen('view')
      }}
    >
      <IconEye className='h-4 w-4' />
    </Button>
  )
}
