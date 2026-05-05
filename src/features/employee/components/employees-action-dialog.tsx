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
import { Employee } from '../data/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEmployee, updateEmployee } from '@/services/employee.service'

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
    surname: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
    description: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
  })
type CustomerForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmployeesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const queryClient = useQueryClient()
  const isEdit = !!currentRow

  const form = useForm<CustomerForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow,
      }
      : {
        name: '',
        surname: '',
        description: '',
      },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateEmployee : addEmployee,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
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
          <DialogTitle>{isEdit ? 'Düzəliş' : 'Yeni işçi'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'İşçiyə düzəliş ' : 'Yeni işçi əlavə '}
            etdikdən sonra yadda saxla düyməsini klikləyin.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='employee-form'
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

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Filial
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>Filial</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className='col-span-4'>
                        <SelectTrigger>
                          <SelectValue placeholder='Xidmət göstərən filialı seçin' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches?.map((branch) => (
                          <SelectItem key={branch.id} value={branch.name}>{branch.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='employee-form' disabled={isPending}>
            {isPending ? 'Gözləyin...' : 'Yadda saxla'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
