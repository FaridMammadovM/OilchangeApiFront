import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn, formatLicensePlate } from '@/lib/utils';
import { getBranches } from '@/services/branch.service';
import { getServices } from '@/services/parametric.service';
import { getAntifreezes, getLiquids, getOils } from '@/services/product.service';
import { IFilterParams } from '@/types/oilChange.type';
import { CalendarIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { XIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

type Props = {
  filters: Partial<IFilterParams>
  setFilters: Dispatch<SetStateAction<Partial<IFilterParams>>>
}

const FilterToolbar = ({ setFilters }: Props) => {
  const [debouncedFilters, setDebouncedFilters] = useState<Partial<IFilterParams>>({
    name: '',
    surname: '',
    branchId: '',
    carNumber: '',
    serviceId: '',
    productId: '',
    changeDate: '',
    pageIndex:1,
    pageCount:100
  });
  const { data: branches = [] } = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches
  })
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  })
  const { data: oils = [] } = useQuery({
    queryKey: ['oils'],
    queryFn: getOils
  })
  const { data: liquids = [] } = useQuery({
    queryKey: ['liquids'],
    queryFn: getLiquids
  })
  const { data: antifreeze = [] } = useQuery({
    queryKey: ['antifreeze'],
    queryFn: getAntifreezes
  })
  const products = useCallback(() => [
    ...oils,
    ...liquids,
    ...antifreeze
  ], [oils, liquids, antifreeze])

  const handleFilter = (filterName: string, value: string = '') => {
    if (filterName === 'carNumber') {
      value = formatLicensePlate(value);
    }
    setDebouncedFilters(prev => ({
      ...prev,
      [filterName]: value,
    }))
  }

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setFilters(debouncedFilters);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [debouncedFilters, setFilters]);

  return (
    <div className='flex items-center justify-between mb-2'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Ad ilə axtar'
          value={debouncedFilters?.name}
          onChange={(e) => handleFilter('name', e.target.value)}
          className='h-8'
        />
        <Input
          placeholder='Soyad ilə axtar'
          value={debouncedFilters?.surname}
          onChange={(e) => handleFilter('surname', e.target.value)}
          className='h-8'
        />
        <Select
          value={debouncedFilters?.serviceId?.toString()}
          onValueChange={(value) => handleFilter('serviceId', value)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Xidməti seçin' />
          </SelectTrigger>
          <SelectContent side='top'>
            <Button
              className="w-full px-2 mb-1"
              variant="secondary"
              size="sm"
              onClick={() => handleFilter('serviceId')}
            >
              Seçimi sıfırla
            </Button>
            {services?.map((service) => (
              <SelectItem key={service.id} value={service.id.toString()}>
                {service.name}
              </SelectItem>
            ))}
            <SelectSeparator />

          </SelectContent>
        </Select>
        <Input
          placeholder='Qeydiyyat nişanı ilə axtar'
          value={debouncedFilters?.carNumber}
          onChange={(e) => handleFilter('carNumber', e.target.value)}
          className='h-8'
        />

        <Select
          value={debouncedFilters?.branchId?.toString()}
          onValueChange={(value) => handleFilter('branchId', value)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Filialı seçin' />
          </SelectTrigger>
          <SelectContent side='top'>
            <Button
              className="w-full px-2 mb-1"
              variant="secondary"
              size="sm"
              onClick={() => handleFilter('branchId')}
            >
              Seçimi sıfırla
            </Button>
            {branches?.map((branch) => (
              <SelectItem key={branch.id} value={branch.id.toString()}>
                {branch.name}
              </SelectItem>
            ))}
            <SelectSeparator />

          </SelectContent>
        </Select>

        <Select
          value={debouncedFilters?.productId?.toString()}
          onValueChange={(value) => handleFilter('productId', value)}
        >
          <SelectTrigger className='h-8'>
            <SelectValue placeholder='Məhsulu seçin' />
          </SelectTrigger>
          <SelectContent side='top'>
            <Button
              className="w-full px-2 mb-1"
              variant="secondary"
              size="sm"
              onClick={() => handleFilter('productId')}
            >
              Seçimi sıfırla
            </Button>
            {products().map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name}
              </SelectItem>
            ))}
            <SelectSeparator />
          </SelectContent>
        </Select>


        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'h-8 pl-3 text-left font-normal',
                !debouncedFilters?.changeDate && 'text-muted-foreground'
              )}
            >
              {debouncedFilters?.changeDate ? (
                format(debouncedFilters?.changeDate, 'dd.MM.yyyy')
              ) : (
                <span>Tarix seçin</span>
              )}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              {debouncedFilters?.changeDate ? <button onClick={(e) => {
                e.preventDefault();
                handleFilter('changeDate', '')
              }}>
                <XIcon />
              </button> : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={debouncedFilters?.changeDate ? new Date(debouncedFilters.changeDate) : undefined}
              onSelect={(date) => handleFilter('changeDate', format(date || new Date(), 'yyyy-MM-dd'))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default FilterToolbar