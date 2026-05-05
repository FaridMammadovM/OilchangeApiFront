import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { OilsActionDialog } from './components/oils-action-dialog'
import { columns } from './components/oils-columns'
import { OilsDeleteDialog } from './components/oils-delete-dialog'
import { OilsTable } from './components/oils-table'
import OilsContextProvider, {
  type OilsDialogType,
} from './context/oils-context'
import { Oil } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getOils } from '@/services/product.service'

export default function Oils() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Oil | null>(null)
  const [open, setOpen] = useDialogState<OilsDialogType>(null)
  const { isPending, isError, data: oils, error } = useQuery({
    queryKey: ['oils'],
    queryFn: getOils,
  })

  // Parse user list
  // const userList = userListSchema.parse(oils)

  if (isPending) {
    return <span>Yüklənir...</span>
  }

  if (isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <OilsContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Yağlar</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni yağ</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <OilsTable data={oils} columns={columns} />
        </div>
      </Main>

      <OilsActionDialog
        key='oil-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <OilsActionDialog
            key={`oil-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <OilsDeleteDialog
            key={`oil-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </OilsContextProvider>
  )
}
