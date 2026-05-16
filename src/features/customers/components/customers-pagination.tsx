import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

interface CustomersPaginationProps {
  pageIndex: number
  pageCount: number
  totalCount: number
  onPageChange: (page: number) => void
}

type PageItem = number | 'left-ellipsis' | 'right-ellipsis'

const getPageItems = (pageIndex: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items: PageItem[] = [1]
  const left = Math.max(2, pageIndex - 2)
  const right = Math.min(totalPages - 1, pageIndex + 2)

  if (left > 2) {
    items.push('left-ellipsis')
  }

  for (let page = left; page <= right; page += 1) {
    items.push(page)
  }

  if (right < totalPages - 1) {
    items.push('right-ellipsis')
  }

  items.push(totalPages)
  return items
}

export function CustomersPagination({
  pageIndex,
  pageCount,
  totalCount,
  onPageChange,
}: CustomersPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageCount))
  const pageItems = getPageItems(pageIndex, totalPages)
  const isFirst = pageIndex <= 1
  const isLast = pageIndex >= totalPages

  return (
    <div className='mt-4 flex items-center justify-between overflow-auto px-2 py-2'>
      <span className='text-sm text-muted-foreground'>
        Cəmi: <span className='font-medium text-foreground'>{totalCount}</span> müştəri
      </span>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => onPageChange(1)}
          disabled={isFirst}
        >
          <span className='sr-only'>First page</span>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>

        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={isFirst}
        >
          <span className='sr-only'>Previous page</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>

        {pageItems.map((item, index) =>
          item === 'left-ellipsis' || item === 'right-ellipsis' ? (
            <span key={`${item}-${index}`} className='inline-flex h-8 min-w-[2rem] items-center justify-center px-2 text-sm text-muted-foreground'>
              …
            </span>
          ) : (
            <Button
              key={item}
              variant={item === pageIndex ? 'default' : 'outline'}
              className='h-8 min-w-[2rem] px-2'
              onClick={() => onPageChange(item)}
              disabled={item === pageIndex}
            >
              {item}
            </Button>
          )
        )}

        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={isLast}
        >
          <span className='sr-only'>Next page</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>

        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => onPageChange(totalPages)}
          disabled={isLast}
        >
          <span className='sr-only'>Last page</span>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
