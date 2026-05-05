import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { AdminsActionDialog } from './components/admins-action-dialog'
import { columns } from './components/admins-columns'
import { AdminsDeleteDialog } from './components/admins-delete-dialog'
import { AdminsTable } from './components/admins-table'
import AdminsContextProvider, {
  type AdminsDialogType,
} from './context/admins-context'
import { Admin } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getAdmins } from '@/services/admin.service'

export default function Admins() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Admin | null>(null)
  const [open, setOpen] = useDialogState<AdminsDialogType>(null)
  const { isPending, isError, data: admins, error } = useQuery({
    queryKey: ['admins'],
    queryFn: getAdmins,
  })

  // Parse user list
  // const userList = userListSchema.parse(admins)

  return (
    <AdminsContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Adminlər</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni Admin</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {isPending ? <span>Yüklənir...</span> : isError ? <span>Xəta: {error.message}</span> : <AdminsTable data={admins} columns={columns} />}
        </div>
      </Main>

      <AdminsActionDialog
        key='admin-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <AdminsActionDialog
            key={`admin-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AdminsDeleteDialog
            key={`admin-delete-${currentRow.id}`}
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
    </AdminsContextProvider>
  )
}
