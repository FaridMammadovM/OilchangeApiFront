import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

interface DataTablePaginationProps {
  pageIndex: number      // 1-dən başlayır
  haveNext: boolean
  onPageChange: (page: number) => void
}

export function DataTablePagination({
  pageIndex,
  haveNext,
  onPageChange,
}: DataTablePaginationProps) {
  const isFirst = pageIndex <= 1
console.log(pageIndex)
  return (
    <div className='flex items-center justify-between overflow-auto px-2'>
      <div className='hidden flex-1 text-sm text-muted-foreground sm:block' />
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Səhifə {pageIndex}
        </div>
        <div className='flex items-center space-x-2'>
          {/* İlk səhifəyə get */}
          {/* <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => onPageChange(1)}
            disabled={isFirst}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button> */}

          {/* Əvvəlki səhifə */}
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={isFirst}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>

          {/* Növbəti səhifə */}
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={!haveNext}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>

          {/* Son səhifə düyməsi — backend-də total səhifə sayı olmadığı üçün disable saxlanır */}
          {/* <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            disabled={true}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button> */}
        </div>
      </div>
    </div>
  )
}