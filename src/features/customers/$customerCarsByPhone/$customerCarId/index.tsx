import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CustomerCarServicesActionDialog } from './components/customer-car-services-action-dialog'
import { columns } from './components/customer-car-services-columns'
import { CustomerCarServicesDeleteDialog } from './components/customer-car-services-delete-dialog'
import { CustomerCarServicesTable } from './components/customer-car-services-table'
import CustomerCarServicesContextProvider, {
  type CustomerCarServicesDialogType,
} from './context/customer-car-services-context'
import { CustomerCarService } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getAllOilChanges } from '@/services/oilChange.service'
import { useAppState } from '@/stores/appStore'

type Props = {
  customerCarId: string
}

export default function CustomerCarAllServices({ customerCarId }: Props) {
  const carNumber = useAppState().carNumber;
  // Dialog states
  const [currentRow, setCurrentRow] = useState<CustomerCarService | null>(null)
  const [open, setOpen] = useDialogState<CustomerCarServicesDialogType>(null)
  const { isPending, isError, data: customerCarServices, error } = useQuery({
    queryKey: ['customer-car-services', customerCarId],
    queryFn: () => getAllOilChanges(customerCarId),
  })

  if (isPending) {
    return <span>Yüklənir...</span>
  }

  if (isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <CustomerCarServicesContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>{carNumber + '-də' || 'Maşında'} görülmüş xidmətlər</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Xidmət əlavə et</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CustomerCarServicesTable data={customerCarServices} columns={columns} />
        </div>
      </Main>

      {open === 'add' ? <CustomerCarServicesActionDialog
        key='car-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        customerCarId={customerCarId}
      /> : null}

      {currentRow && (
        <>
          {open === 'edit' ? <CustomerCarServicesActionDialog
            key={`car-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          /> : null}

          <CustomerCarServicesDeleteDialog
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
    </CustomerCarServicesContextProvider>
  )
}
