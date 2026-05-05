import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CustomerCarsActionDialog } from './components/customer-cars-action-dialog'
import { columns } from './components/customer-cars-columns'
import { CustomerCarsDeleteDialog } from './components/customer-cars-delete-dialog'
import { CustomerCarsTable } from './components/customer-cars-table'
import CustomerCarsContextProvider, {
  type CustomerCarsDialogType,
} from './context/customer-cars-context'
import { CustomerCar } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getCustomerCarsMatrix } from '@/services/customerCarsMatrix.service'
import { getCustomerById } from '@/services/customer.service'

type Props = {
  customerPhone: string
}

export default function CustomerCarsMatrix({ customerPhone }: Props) {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<CustomerCar | null>(null)
  const [open, setOpen] = useDialogState<CustomerCarsDialogType>(null)
  const { isPending, isError, data: customerCars, error } = useQuery({
    queryKey: ['customer-cars', customerPhone],
    queryFn: () => getCustomerCarsMatrix(customerPhone),
  })
  const { data: customer } = useQuery({
    queryKey: ['customer', customerPhone],
    queryFn: () => getCustomerById(customerPhone),
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
    <CustomerCarsContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>{customer ? customer.data.name + ' ' + customer.data.surname : 'Müştərinin'} maşınları</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni maşın</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomerCarsTable data={customerCars} columns={columns} />
        </div>
      </Main>

      <CustomerCarsActionDialog
        key='car-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        customerId={customer?.data.id}
      />

      {currentRow && (
        <>
          <CustomerCarsActionDialog
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

          <CustomerCarsDeleteDialog
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
    </CustomerCarsContextProvider>
  )
}
