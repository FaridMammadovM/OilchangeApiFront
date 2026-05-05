import { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/services-columns'
import { ServicesDeleteDialog } from './components/services-delete-dialog'
import { ServicesTable } from './components/services-table'
import ServicesContextProvider, {
  type ServicesDialogType,
} from './context/services-context'
import { Service } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getAllOilChangesAdmin } from '@/services/oilChange.service'
import FilterToolbar from './components/filter-toolbar'
import { IFilterParams } from '@/types/oilChange.type'

export default function Services() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Service | null>(null)
  const [open, setOpen] = useDialogState<ServicesDialogType>(null)
  const [filters, setFilters] = useState<Partial<IFilterParams>>({
    name: '',
    surname: '',
    branchId: '',
    carNumber: '',
    serviceId: '',
    productId: '',
    changeDate: '',
    pageIndex: 1,
    pageCount:100
  });
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['services', filters],
    queryFn: () => getAllOilChangesAdmin(filters),
  })
  console.log(filters)
  // Parse user list
  // const userList = userListSchema.parse(services)
  const services = data?.items ?? []
  const haveNext = data?.haveNext ?? false
  const renderTable = (tableData: Service[]) => {

    if (isPending) {
      return <span>Yüklənir...</span>
    }

    if (isError) {
      return <span>Xəta: {error.message}</span>
    }
    return <ServicesTable
      data={tableData}
      columns={columns}
      pageIndex={filters.pageIndex}
      haveNext={haveNext}
      onPageChange={(newPage) =>
        setFilters((prev) => ({ ...prev, pageIndex: newPage }))
      }
    />
  }

  return (
    <ServicesContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Xidmətlər</h2>
          </div>
          {/* <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni maşın</span> <IconCar size={18} />
            </Button>
          </div> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
          <FilterToolbar filters={filters} setFilters={setFilters} />
          {renderTable(services)}
        </div>
      </Main>

      {/* <ServicesActionDialog
        key='car-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      /> */}

      {currentRow && (
        <>
          {/* <ServicesActionDialog
            key={`car-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          /> */}

          <ServicesDeleteDialog
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
    </ServicesContextProvider>
  )
}
