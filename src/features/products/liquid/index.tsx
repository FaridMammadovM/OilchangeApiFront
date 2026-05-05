import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { LiquidsActionDialog } from './components/liquids-action-dialog'
import { columns } from './components/liquids-columns'
import { LiquidsDeleteDialog } from './components/liquids-delete-dialog'
import { LiquidsTable } from './components/liquids-table'
import LiquidsContextProvider, {
  type LiquidsDialogType,
} from './context/liquids-context'
import { Liquid } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getLiquids } from '@/services/product.service'

export default function Liquids() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Liquid | null>(null)
  const [open, setOpen] = useDialogState<LiquidsDialogType>(null)
  const { isPending, isError, data: liquids = [], error } = useQuery({
    queryKey: ['liquids'],
    queryFn: getLiquids,
  })

  // Parse user list
  // const userList = userListSchema.parse(liquid)

  if (isPending) {
    return <span>Yüklənir...</span>
  }

  if (isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <LiquidsContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Mayelar</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni maye</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <LiquidsTable data={liquids} columns={columns} />
        </div>
      </Main>

      <LiquidsActionDialog
        key='liquid-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <LiquidsActionDialog
            key={`liquid-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <LiquidsDeleteDialog
            key={`liquid-delete-${currentRow.id}`}
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
    </LiquidsContextProvider>
  )
}
