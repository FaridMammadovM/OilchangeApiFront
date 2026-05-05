import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { AntifreezesActionDialog } from './components/antifreezes-action-dialog'
import { columns } from './components/antifreezes-columns'
import { AntifreezesDeleteDialog } from './components/antifreezes-delete-dialog'
import { AntifreezesTable } from './components/antifreezes-table'
import AntifreezesContextProvider, {
  type AntifreezesDialogType,
} from './context/antifreezes-context'
import { Antifreeze } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getAntifreezes } from '@/services/product.service'

export default function Antifreezes() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Antifreeze | null>(null)
  const [open, setOpen] = useDialogState<AntifreezesDialogType>(null)
  const { isPending, isError, data: antifreezes, error } = useQuery({
    queryKey: ['antifreezes'],
    queryFn: getAntifreezes,
  })

  // Parse user list
  // const userList = userListSchema.parse(antifreezes)

  if (isPending) {
    return <span>Yüklənir...</span>
  }

  if (isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <AntifreezesContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Antifrizlar</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni antifriz</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <AntifreezesTable data={antifreezes} columns={columns} />
        </div>
      </Main>

      <AntifreezesActionDialog
        key='antifreeze-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <AntifreezesActionDialog
            key={`antifreeze-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AntifreezesDeleteDialog
            key={`antifreeze-delete-${currentRow.id}`}
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
    </AntifreezesContextProvider>
  )
}
