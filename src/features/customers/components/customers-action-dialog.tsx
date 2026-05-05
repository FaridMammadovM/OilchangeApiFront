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
import { Customer } from '../data/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCustomer, updateCustomer } from '@/services/customer.service'

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Ad boş ola bilməz.' }),
    surname: z.string().min(1, { message: 'Soyad boş ola bilməz.' }),
    phone: z.string().min(1, { message: 'Telefon boş ola bilməz.' }),
    password: z.string().min(1, { message: 'Şifrə boş ola bilməz.' }).transform((pwd) => pwd.trim()).optional(),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password }, ctx) => {
    if (!isEdit && password && password !== '') {
      if (password === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Şifrə tələb olunur.',
          path: ['password'],
        })
      }

      if (password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Şifrə ən az 6 simvol olmalıdır.',
          path: ['password'],
        })
      }
    }
  })
type CustomerForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Customer
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const queryClient = useQueryClient()
  const isEdit = !!currentRow

  const form = useForm<CustomerForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        name: currentRow.name,
        surname: currentRow.surname,
        phone: currentRow.phone,
        isEdit: true
      }
      : {
        name: '',
        surname: '',
        phone: '994',
        password: '',
        isEdit: false
      },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateCustomer : addCustomer,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      form.reset()
      onOpenChange(false)
    },
  })

  const onSubmit = (values: CustomerForm) => mutate(isEdit ? { id: currentRow.id, ...values } : values)

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
          <DialogTitle>{isEdit ? 'Düzəliş' : 'Yeni müştəri'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Müştəriyə düzəliş ' : 'Yeni müştəri əlavə '}
            etdikdən sonra yadda saxla düyməsini klikləyin.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='customer-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Ad
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Əli'
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
                name='surname'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Soyad
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Hüseynov'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {!isEdit &&
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                        Şifrə
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='*********'
                          className='col-span-4'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
              }

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Əlaqə telefonu
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='994503456789'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
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
          <Button type='submit' form='customer-form' disabled={isPending}>
            {isPending ? 'Gözləyin...' : 'Yadda saxla'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
