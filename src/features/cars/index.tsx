import { useState } from 'react'
import { IconCar } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CarsActionDialog } from './components/cars-action-dialog'
import { columns } from './components/cars-columns'
import { CarsDeleteDialog } from './components/cars-delete-dialog'
import { CarsTable } from './components/cars-table'
import CarsContextProvider, {
  type CarsDialogType,
} from './context/cars-context'
import { Car } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getCars } from '@/services/car.service'

export default function Cars() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Car | null>(null)
  const [open, setOpen] = useDialogState<CarsDialogType>(null)
  const { isPending, isError, data: cars, error } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  })

  // Parse user list
  // const userList = userListSchema.parse(cars)

  if (isPending) {
    return <span>Yüklənir...</span>
  }

  if (isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <CarsContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Maşınlar</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni maşın</span> <IconCar size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CarsTable data={cars} columns={columns} />
        </div>
      </Main>

      <CarsActionDialog
        key='car-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <CarsActionDialog
            key={`car-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <CarsDeleteDialog
            key={`car-delete-${currentRow.id}`}
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
    </CarsContextProvider>
  )
}
