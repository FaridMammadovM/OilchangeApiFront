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
import { Antifreeze } from '../data/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAntifreeze, updateAntifreeze } from '@/services/product.service'

const formSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
  });
type AntifreezeForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Antifreeze
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AntifreezesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const queryClient = useQueryClient()
  const isEdit = !!currentRow
  const form = useForm<AntifreezeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? currentRow
      : {
        name: '',
      },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateAntifreeze : addAntifreeze,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['antifreezes'] })
      form.reset()
      onOpenChange(false)
    },
  })

  const onSubmit = (values: AntifreezeForm) => mutate(values)

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
          <DialogTitle>{isEdit ? 'Düzəliş' : 'Yeni antifriz'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Antifriza düzəliş ' : 'Yeni antifriz əlavə '}
            etdikdən sonra yadda saxla düyməsini klikləyin.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='antifreeze-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Antifriz adı
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Liqui Moly'
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
          <Button type='submit' form='antifreeze-form' disabled={isPending}>
            {isPending ? 'Gözləyin...' : 'Yadda saxla'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
