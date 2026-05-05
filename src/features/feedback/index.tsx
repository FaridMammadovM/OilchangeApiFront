import { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { FeedbacksActionDialog } from './components/feedbacks-action-dialog'
import { columns } from './components/feedbacks-columns'
import { FeedbacksTable } from './components/feedbacks-table'
import FeedbacksContextProvider, {
  type FeedbacksDialogType,
} from './context/feedbacks-context'
import { Feedback } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getAllFeedbacks } from '@/services/commit.service'

export default function Feedbacks() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Feedback | null>(null)
  const [open, setOpen] = useDialogState<FeedbacksDialogType>(null)
  const { isPending, isError, data: feedbacks, error } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: getAllFeedbacks,
  })

  // Parse user list
  // const userList = userListSchema.parse(feedbacks)

  if (isPending) {
    return <span>Yüklənir...</span>
  }

  if (isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <FeedbacksContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {/* ===== Top Heading ===== */}
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Şikayət və təkliflər</h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <FeedbacksTable data={feedbacks} columns={columns} />
        </div>
      </Main>

      {currentRow && (
        <>
          <FeedbacksActionDialog
            key={`feedback-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </FeedbacksContextProvider>
  )
}
