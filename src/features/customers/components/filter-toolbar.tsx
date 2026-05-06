import { Input } from '@/components/ui/input';
import { formatLicensePlate } from '@/lib/utils';
import { getUsernameRole } from '@/services/customer.service';
import { ICustomerFilters } from '@/types/customer.type';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
  filters: Partial<ICustomerFilters>
  setFilters: Dispatch<SetStateAction<Partial<ICustomerFilters>>>
}

const FilterToolbar = ({ setFilters }: Props) => {
  const [debouncedFilters, setDebouncedFilters] = useState<Partial<ICustomerFilters>>({
    name: '',
    surname: '',
    carNumber: '',
    phone: '',
  });

  const handleFilter = (filterName: string, value: string = '') => {
    if (filterName === 'carNumber') {
      value = formatLicensePlate(value);
    }
    setDebouncedFilters(prev => ({
      ...prev,
      [filterName]: value,
    }))
  }
  const { data: userRole, } = useQuery({
    queryKey: ['UsernameRole'],
    queryFn: getUsernameRole,
  })

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        ...debouncedFilters,
        pageIndex: 1,
      }))
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [debouncedFilters, setFilters]);



  return (
    <div className='flex items-center justify-between mb-2'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {userRole === 2 && <Input
          placeholder='Ad ilə axtar'
          value={debouncedFilters?.name}
          onChange={(e) => handleFilter('name', e.target.value)}
          className='h-8'
        />}

        {userRole === 2 && <Input
          placeholder='Soyad ilə axtar'
          value={debouncedFilters?.surname}
          onChange={(e) => handleFilter('surname', e.target.value)}
          className='h-8'
        />}

        <Input
          placeholder='Telefon ilə axtar'
          value={debouncedFilters?.phone}
          onChange={(e) => handleFilter('phone', e.target.value)}
          className='h-8'
        />
        <Input
          placeholder='Qeydiyyat nişanı ilə axtar'
          value={debouncedFilters?.carNumber}
          onChange={(e) => handleFilter('carNumber', e.target.value)}
          className='h-8'
        />
      </div>
    </div>
  )
}

export default FilterToolbar