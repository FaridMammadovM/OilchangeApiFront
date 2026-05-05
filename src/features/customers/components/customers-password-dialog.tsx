'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import { changeCustomerPassword } from '@/services/customer.service'

const formSchema = z
  .object({
    id: z.number(),
    password: z.string().min(1, { message: 'Şifrə boş ola bilməz.' }).transform((pwd) => pwd.trim()).optional(),
  })
  .superRefine(({ password }, ctx) => {
    if (password && password !== '') {
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

export function CustomersPasswordDialog({ currentRow, open, onOpenChange }: Props) {
  const queryClient = useQueryClient()

  const form = useForm<CustomerForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: currentRow?.id,
      password: '',
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: changeCustomerPassword,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      form.reset()
      onOpenChange(false)
    },
  })

  const onSubmit = ({ id, password }: CustomerForm) => mutate({ id, password })

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
          <DialogTitle>Müştəri şifrəsini dəyiş</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='customer-password-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Yeni şifrə
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
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='customer-password-form' disabled={isPending}>
            {isPending ? 'Gözləyin...' : 'Yadda saxla'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
