'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addCustomerCarsMatrix, updateCustomerCarsMatrix } from '@/services/customerCarsMatrix.service'
import { getCars } from '@/services/car.service'
import { useEffect, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn, formatLicensePlate } from '@/lib/utils'
import { CustomerCar } from '../data/schema'

const formSchema = z
  .object({
    id: z.number().optional(),
    customerId: z.number().optional(),
    carId: z.number({ required_error: 'Bu xana boş ola bilməz.' }).min(1, { message: 'Bu xana boş ola bilməz.' }),
    carNumber: z.string({ required_error: 'Bu xana boş ola bilməz.' }).min(1, { message: 'Bu xana boş ola bilməz.' }),
  });
export type CustomerCarForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: CustomerCar
  customerId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerCarsActionDialog({ currentRow, customerId, open, onOpenChange }: Props) {
  const carNameRef = useRef<string>('');
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const isEdit = !!currentRow
  const form = useForm<CustomerCarForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? currentRow
      : {
        carId: undefined,
        carNumber: undefined,
      },
  })

  const { data: cars } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars
  })

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateCustomerCarsMatrix : addCustomerCarsMatrix,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['customer-cars'] })
      form.reset()
      onOpenChange(false)
    },
  })

  const onSubmit = (values: CustomerCarForm) => mutate({ ...values, customerId: isEdit ? currentRow.customerId : +customerId! })

  useEffect(() => {
    carNameRef.current = isEdit ? `${currentRow?.brand} ${currentRow?.model}` : "Maşın modelini seçin"
  }, [open])

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
          <DialogTitle>{isEdit ? 'Düzəliş' : 'Yeni maşın'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Maşına düzəliş ' : 'Yeni maşın əlavə '}
            etdikdən sonra yadda saxla düyməsini klikləyin.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='car-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name="carId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Maşın</FormLabel>
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" role="combobox" aria-expanded={isOpen} className="w-full justify-between">
                            {carNameRef.current}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Maşın axtar..." />
                          <CommandList>
                            <CommandEmpty>Maşın tapılmadı.</CommandEmpty>
                            <CommandGroup>
                              {cars?.map((car) => (
                                <CommandItem
                                  key={car.id}
                                  value={`${car.brand} ${car.model}`}
                                  onSelect={() => {
                                    field.onChange(car.id)
                                    setIsOpen(false)
                                    carNameRef.current = `${car.brand} ${car.model}`
                                  }}
                                >
                                  <Check className={cn("mr-2 h-4 w-4", field.value === car.id ? "opacity-100" : "opacity-0")} />
                                  {car.brand} {car.model}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='carNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Maşın nömrəsi
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='99-RH-384'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const plate = formatLicensePlate(value);
                          field.onChange(plate)
                        }}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='car-form' disabled={isPending}>
            {isPending ? 'Gözləyin...' : 'Yadda saxla'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
