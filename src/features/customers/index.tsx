import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CustomersActionDialog } from './components/customers-action-dialog'
import { columns } from './components/customers-columns'
import { CustomersDeleteDialog } from './components/customers-delete-dialog'
import { CustomersTable } from './components/customers-table'
import CustomersContextProvider, {
  type CustomersDialogType,
} from './context/customers-context'
import { Customer } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '@/services/customer.service'
import { CustomersPasswordDialog } from './components/customers-password-dialog'
import FilterToolbar from './components/filter-toolbar'
import { CustomersPagination } from './components/customers-pagination'
import { ICustomerFilters } from '@/types/customer.type'

export default function Customers() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Customer | null>(null)
  const [open, setOpen] = useDialogState<CustomersDialogType>(null)
  const [filters, setFilters] = useState<Partial<ICustomerFilters>>({
    name: '',
    surname: '',
    carNumber: '',
    phone: '',
    pageIndex: 1,
    pageCount: 100,
    sortByDateAscending: false,
  })
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['customers', filters],
    queryFn: () => getCustomers(filters),
  })
  const customers = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const pageIndex = filters.pageIndex ?? 1
  const pageSize = filters.pageCount ?? 100

  // Parse user list
  // const userList = userListSchema.parse(Customers)

  const renderTable = (customers: Customer[]) => {
    if (isError) {
      return <span>Xəta: {error.message}</span>
    }

    if (isPending && customers.length === 0) {
      return <span>Yüklənir...</span>
    }

    return <CustomersTable data={customers} columns={columns} />
  }

  return (
    <CustomersContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Müştəri siyahısı</h2>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Yeni müştəri</span> <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
          <FilterToolbar filters={filters} setFilters={setFilters} />
          {renderTable(customers)}
          {!isPending && !isError && (
            <CustomersPagination
              pageIndex={pageIndex}
              pageCount={pageSize}
              totalCount={totalCount}
              onPageChange={(page) =>
                setFilters((prev) => ({
                  ...prev,
                  pageIndex: page,
                }))
              }
            />
          )}
        </div>
      </Main>

      <CustomersActionDialog
        key='customer-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <CustomersActionDialog
            key={`customer-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <CustomersDeleteDialog
            key={`customer-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <CustomersPasswordDialog
            key={`customer-password-${currentRow.id}`}
            open={open === 'edit-password'}
            onOpenChange={() => {
              setOpen('edit-password')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </CustomersContextProvider>
  )
}
