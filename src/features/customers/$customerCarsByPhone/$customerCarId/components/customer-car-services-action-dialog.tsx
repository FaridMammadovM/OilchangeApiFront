'use client'

import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CustomerCarService } from '../data/schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn, formatDateForSubmission, parseDisplayDate } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { getDOTs, getFilters, getG, getSAEViscosities, getServices } from '@/services/parametric.service'
import { getEmployees } from '@/services/employee.service'
import { getBranches } from '@/services/branch.service'
import { addOilChange, getOilChangeById, updateOilChange } from '@/services/oilChange.service'
import { useEffect, useRef } from 'react'
import { XCircleIcon } from 'lucide-react'
import { getAntifreezes, getLiquids, getOils } from '@/services/product.service'
import { Combo } from '@/types/common.type'
import { EServices } from '@/types/oilChange.type'
import { useReactToPrint } from "react-to-print";


const formSchema = z
  .object({
    id: z.number().optional(),
    customersCarsMatrixId: z.number(),
    serviceId: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }),
    productId: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }),
    indicator: z.string().nullable().optional(),
    saeViscosityId: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).nullable().optional(),
    winterViscosityId: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).nullable().optional(),
    changeDate: z.string({
      required_error: 'Bu xana boş ola bilməz.',
    }),
    kilometersTravelled: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }),
    volume: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }).nullable().optional(),
    duration: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }).nullable().optional(),
    employeeId: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }),
    branchId: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }),
    price: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
      message: 'Bu xana boş ola bilməz.',
    }),
    oilOwn: z.boolean(),
    oilCode: z.string().nullable().optional(),
    description: z.string().optional(),
    filters: z.array(z.object({
      id: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).optional(),
      filterId: z.coerce.number({ invalid_type_error: 'Bu xana boş ola bilməz.' }).min(1, {
        message: 'Bu xana boş ola bilməz.',
      }).nullable(),
      filterOwn: z.boolean(),
      filterCode: z.string().min(1, {
        message: 'Bu xana boş ola bilməz.'
      }),
    })).nullable().optional()
  })
  .refine((data) => data.serviceId === 2 ? !!data.saeViscosityId : true, {
    message: 'Bu xana boş ola bilməz',
    path: ['saeViscosityId']
  })
  .refine((data) => ![2, 3, 4].includes(data.serviceId) ? !!data.indicator : true, {
    message: 'Bu xana boş ola bilməz',
    path: ['indicator'],
  })
  .refine((data) => [3, 4].includes(data.serviceId) ? !!data.winterViscosityId : true, {
    message: 'Bu xana boş ola bilməz',
    path: ['winterViscosityId'],
  })
  .refine((data) => ![3, 4].includes(data.serviceId) ? !!data.duration : true, {
    message: 'Bu xana boş ola bilməz',
    path: ['duration'],
  })
  .refine((data) => [2].includes(data.serviceId) ? !!data.oilCode : true, {
    message: 'Bu xana boş ola bilməz',
    path: ['oilCode'],
  });
export type CustomerCarServiceForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: CustomerCarService
  open: boolean
  onOpenChange: (open: boolean) => void
  customerCarId?: string
}

export function CustomerCarServicesActionDialog({ currentRow, open, customerCarId, onOpenChange }: Props) {
  const queryClient = useQueryClient()
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const isEdit = !!currentRow
  const customersCarsMatrixId = customerCarId ? +customerCarId : undefined

  const { data: oilChange, isPending: isOilPending, isError, error } = useQuery({
    queryKey: ['oilChangeById', currentRow?.id],
    enabled: !!currentRow?.id,
    queryFn: () => currentRow?.id ? getOilChangeById(currentRow.id) : null
  })

  const form = useForm<CustomerCarServiceForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        id: currentRow.id,
      }
      : {
        customersCarsMatrixId,
        changeDate: format(new Date(), 'dd.MM.yyyy'),
        serviceId: 2,
        oilOwn: false,
      },
  })

  const isOilChange = [1, 2].includes(form.watch('serviceId'))

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'filters',
    keyName: 'uuid',
  })

  useEffect(() => {
    if (isEdit && oilChange) {
      form.reset({
        ...oilChange,
        indicator: [2, 3, 4].includes(oilChange.serviceId) ? null : oilChange.indicator,
        saeViscosityId: oilChange.serviceId === 2 ? oilChange.saeViscosityId : null,
        winterViscosityId: [3, 4].includes(oilChange.serviceId) ? oilChange.winterViscosityId : null,
        duration: ![3, 4].includes(oilChange.serviceId) ? oilChange.duration : undefined,
        filters: [1, 2].includes(oilChange.serviceId) ? oilChange.filters : null,
        oilOwn: !!oilChange?.oilOwn,
        description: oilChange.description || '',
      })
    }
  }, [oilChange, isEdit])

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  })
  const { data: oils } = useQuery({
    queryKey: ['oils'],
    enabled: isOilChange,
    queryFn: getOils
  })
  const { data: SAEViscosities } = useQuery({
    queryKey: ['SAEViscosities'],
    enabled: form.watch('serviceId') === 2,
    queryFn: getSAEViscosities
  })
  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees
  })
  const { data: branches } = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches
  })
  const { data: filters = [] } = useQuery({
    queryKey: ['filters'],
    enabled: isOilChange,
    queryFn: getFilters
  })
  const { data: antifreezeGs = [] } = useQuery({
    queryKey: ['antifreezeGs'],
    enabled: form.watch('serviceId') === EServices.Antifriz,
    queryFn: getG
  })

  const filterOptions = (filters: { id: number, name: string }[]) => {
    if (form.watch('serviceId') === 1) {
      return filters.filter(filter => filter.name === 'Filter')
    }
    return filters
  }

  const { data: dots } = useQuery({
    queryKey: ['dots'],
    enabled: form.watch('serviceId') === 4,
    queryFn: getDOTs
  })
  const { data: liquids } = useQuery({
    queryKey: ['liquids'],
    enabled: form.watch('serviceId') === 4,
    queryFn: getLiquids
  })
  const { data: antifreeze } = useQuery({
    queryKey: ['antifreeze'],
    enabled: form.watch('serviceId') === 3,
    queryFn: getAntifreezes
  })

  const products = (serviceId: number) => {
    switch (serviceId) {
      case 3:
        return antifreeze;
      case 4:
        return liquids;
      default:
        return oils;
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateOilChange : addOilChange,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['customer-car-services'] })
      queryClient.invalidateQueries({ queryKey: ['oilChangeById'] })
      form.reset()
      onOpenChange(false)
    },
  })

  const onSubmit = (values: CustomerCarServiceForm) => {
    values.changeDate = formatDateForSubmission(values.changeDate)
    if ([2, 3, 4].includes(values.serviceId)) {
      values.indicator = null
    }
    if (values.serviceId === 2) {
      values.winterViscosityId = null
    } else {
      values.saeViscosityId = null;
    }
    if (![1, 2].includes(values.serviceId)) {
      values.filters = null
    };

    if ([3, 4].includes(values.serviceId)) {
      values.duration = null
    }

    const currentFilters = values.filters;
    if ([1, 2].includes(values.serviceId) && currentFilters) {
      const filterIds = currentFilters.map(filter => filter.filterId);
      const filterSet = new Set(filterIds);
      if (filterIds?.length !== filterSet.size) {
        toast({ title: 'Eyni tip Filter yalnız bir dəfə əlavə edilə bilər!' })
        return;
      }
    }
    mutate(values)
  }

  if (isEdit && isOilPending) {
    return <span>Yüklənir...</span>
  }

  if (isEdit && isError) {
    return <span>Xəta: {error.message}</span>
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Xidmətə düzəliş' : 'Yeni xidmət'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Xidmətə düzəliş ' : 'Yeni xidmət əlavə'} etdikdən
            sonra yadda saxla düyməsini klikləyin.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1 print:h-full print:p-6' ref={contentRef}>
          <Form {...form}>
            <form
              id='car-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='serviceId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xidmət</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value ? Number(value) : '')}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Xidməti seçin' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services?.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>{service.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='productId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Məhsul</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Məhsulu seçin' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products(form.watch('serviceId'))?.map((product: Combo) => (
                          <SelectItem key={product.id} value={product?.id?.toString()}>{product.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('serviceId') === EServices.Mühərrik ? <FormField
                control={form.control}
                name='oilCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-right'>
                      Məhsulun kodu
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='5000'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              /> : null}

              {[2, 3, 4].includes(form.watch('serviceId')) ? null : <FormField
                control={form.control}
                name='indicator'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-right'>
                      İndikator
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='İndikatoru qeyd edin'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />}
              {form.watch('serviceId') === 2 ? (
                <FormField
                  control={form.control}
                  name='saeViscosityId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SAE</FormLabel>
                      <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='SAE tipini seçin' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SAEViscosities?.map((saeViscosity) => (
                            <SelectItem key={saeViscosity.id} value={saeViscosity.id.toString()}>{`${saeViscosity.grade}`}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
              {[3, 4].includes(form.watch('serviceId')) ? <FormField
                control={form.control}
                name='winterViscosityId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{form.watch('serviceId') === EServices.Antifriz ? 'İndikator' : 'DOT'}</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            form.watch('serviceId') === EServices.Antifriz ? 'İndikatoru seçin' : 'DOT seçin'
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(form.watch('serviceId') === EServices.Antifriz ? antifreezeGs : dots)?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>{item.grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> : null}

              <FormField
                control={form.control}
                name='kilometersTravelled'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-right'>
                      Yürüş
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='5000'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {[3, 4].includes(form.watch('serviceId')) ? null : <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-right'>
                      Növbəti yürüş
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='5000'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />}

              <FormField
                control={form.control}
                name='volume'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-right'>
                      Həcm
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='5000'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='employeeId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xidmət göstərən</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Xidmət göstərən işçini seçin' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees?.map((employee) => (
                          <SelectItem key={employee.id} value={employee?.id?.toString() || ''}>{employee.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='branchId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filial</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Xidmət göstərən filialı seçin' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches?.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id.toString()}>{branch.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-right'>
                      Xidmət haqqı (AZN)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='500'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='oilOwn'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 relative'>
                    <FormLabel className='col-span-2 text-right'>
                      Məhsul müştəri tərəfindən alınıb?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {fields?.map((field, index) => (
                <div key={field.uuid} className='relative flex flex-col gap-y-3 border p-4 rounded-md'>
                  <button onClick={() => remove(index)} className='absolute right-2 top-2'><XCircleIcon size={20} /></button>
                  <FormField
                    control={form.control}
                    name={`filters.${index}.filterId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Filter</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Filter seçin' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filterOptions(filters)?.map((filter) => (
                              <SelectItem key={filter.id} value={filter.id.toString()}>{filter.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isEdit ? <input className='hidden' type="text" {...form.register(`filters.${index}.id`, { value: field.id })} /> : null}
                  <FormField
                    control={form.control}
                    name={`filters.${index}.filterOwn`}
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-start space-x-3 space-y-0 relative'>
                        <FormLabel className='col-span-2 text-right'>
                          Filter müştəri tərəfindən alınıb?
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            disabled={!form.watch(`filters.${index}.filterId`)}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`filters.${index}.filterCode`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='col-span-2 text-right'>
                          Filter kodu
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='5000'
                            className='col-span-4'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {isOilChange ? <Button variant={'secondary'} className='ml-auto border' type='button' onClick={() => append({
                filterCode: '',
                filterOwn: false,
                filterId: null,
              })}>Filter əlave et</Button> : null}

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Əlavə qeyd</FormLabel>
                    <FormControl>
                      <Textarea
                        className='resize-none'
                        placeholder='Əlavə qeydlərinizi yaza bilərsiniz.'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name='changeDate'
                render={({ field }) => {
                  const parsedDate = parseDisplayDate(field.value);
                  return <FormItem className='flex flex-col space-y-3'>
                    <FormLabel>Xidmət göstərildiyi tarix</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {parsedDate ? (
                              format(parsedDate, 'dd.MM.yyyy')
                            ) : (
                              <span>Tarix seçin</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={parsedDate}
                          onSelect={(date) => field.onChange(format(date || new Date(), 'dd.MM.yyyy'))}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                }}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='button' onClick={reactToPrintFn}>
            Çap et
          </Button>
          <Button type='submit' form='car-form' disabled={isPending}>
            {isPending ? 'Gözləyin...' : 'Yadda saxla'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
