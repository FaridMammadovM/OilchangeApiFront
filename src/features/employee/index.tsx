import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { EmployeesActionDialog } from './components/employees-action-dialog'
import { columns } from './components/employees-columns'
import { EmployeesDeleteDialog } from './components/employees-delete-dialog'
import { EmployeesTable } from './components/employees-table'
import EmployeesContextProvider, {
  type EmployeesDialogType,
} from './context/employees-context'
import { Employee } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getEmployees } from '@/services/employee.service'

export default function Employees() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Employee | null>(null)
  const [open, setOpen] = useDialogState<EmployeesDialogType>(null)
  const { isPending, isError, data: employees, error } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  })

  // Parse user list
  // const userList = userListSchema.parse(Employees)

  if (isPending) {
    return <span>Yüklənir...</span>
  }

  if (isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <EmployeesContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>İşçilər</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni işçi</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <EmployeesTable data={employees} columns={columns} />
        </div>
      </Main>

      <EmployeesActionDialog
        key='employee-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <EmployeesActionDialog
            key={`employee-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <EmployeesDeleteDialog
            key={`employee-delete-${currentRow.id}`}
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
    </EmployeesContextProvider>
  )
}
