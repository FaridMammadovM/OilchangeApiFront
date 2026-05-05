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
import { Admin } from '../data/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAdmin, updateAdmin } from '@/services/admin.service'

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
    surname: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
    password: z.string().min(1, { message: 'Şifrə boş ola bilməz.' }).transform((pwd) => pwd.trim()).optional(),
    username: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
    isEdit: z.boolean().optional(),
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

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Şifrə ən az 8 simvol olmalıdır.',
          path: ['password'],
        })
      }

      if (!password.match(/[A-Z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Şifrədə ən az bir böyük hərf olmalıdır.',
          path: ['password'],
        })
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Şifrədə ən az bir kiçik hərf olmalıdır.',
          path: ['password'],
        })
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Şifrədə ən az bir rəqəm olmalıdır.',
          path: ['password'],
        })
      }

      if (!password.match(/[^a-zA-Z0-9]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Şifrədə ən az bir xüsusi simvol olmalıdır.',
          path: ['password'],
        })
      }
    }
  });
type AdminForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Admin
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminsActionDialog({ currentRow, open, onOpenChange }: Props) {
  const queryClient = useQueryClient()
  const isEdit = !!currentRow
  const form = useForm<AdminForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow,
      }
      : {
        name: '',
        surname: '',
        username: '',
        password: '',
      }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateAdmin : addAdmin,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      form.reset()
      onOpenChange(false)
    },
  })

  const onSubmit = (values: AdminForm) => mutate(isEdit ? { id: currentRow.id, ...values } : values)

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
          <DialogTitle>{isEdit ? 'Düzəliş' : 'Yeni Admin'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Adminə düzəliş ' : 'Yeni Admin əlavə '}
            etdikdən sonra yadda saxla düyməsini klikləyin.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='admin-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      İstifadəçi adı
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='İstifadəçi adı'
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
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Adı
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Adı'
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
                      Soyadı
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Soyad'
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
                />}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='admin-form' disabled={isPending}>
            {isPending ? 'Gözləyin...' : 'Yadda saxla'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
