// 'use client'

// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { toast } from '@/hooks/use-toast'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { Service } from '../data/schema'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// // import { addService, updateService } from '@/services/oilChange.service'

// const formSchema = z
//   .object({
//     model: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
//     brand: z.string().min(1, { message: 'Bu xana boş ola bilməz.' }),
//   });
// type ServiceForm = z.infer<typeof formSchema>

// interface Props {
//   currentRow?: Service
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function ServicesActionDialog({ currentRow, open, onOpenChange }: Props) {
//   const queryClient = useQueryClient()
//   const isEdit = !!currentRow
//   const form = useForm<ServiceForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: isEdit
//       ? {
//         ...currentRow,
//       }
//       : {
//         brand: '',
//         model: '',
//       },
//   })

//   const { mutate, isPending } = useMutation({
//     mutationFn: isEdit ? updateService : addService,
//     onSuccess: (data) => {
//       toast({ title: data.message })
//       queryClient.invalidateQueries({ queryKey: ['services'] })
//       form.reset()
//       onOpenChange(false)
//     },
//   })

//   const onSubmit = (values: ServiceForm) => mutate(isEdit ? { id: currentRow.id, ...values } : values)

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(state) => {
//         form.reset()
//         onOpenChange(state)
//       }}
//     >
//       <DialogContent className='sm:max-w-lg'>
//         <DialogHeader className='text-left'>
//           <DialogTitle>{isEdit ? 'Düzəliş' : 'Yeni maşın'}</DialogTitle>
//           <DialogDescription>
//             {isEdit ? 'Maşına düzəliş ' : 'Yeni maşın əlavə '}
//             etdikdən sonra yadda saxla düyməsini klikləyin.
//           </DialogDescription>
//         </DialogHeader>
//         <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
//           <Form {...form}>
//             <form
//               id='car-form'
//               onSubmit={form.handleSubmit(onSubmit)}
//               className='space-y-4 p-0.5'
//             >
//               <FormField
//                 control={form.control}
//                 name='brand'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Marka
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='BMW'
//                         className='col-span-4'
//                         autoComplete='off'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name='model'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Model
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='X5M'
//                         className='col-span-4'
//                         autoComplete='off'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//             </form>
//           </Form>
//         </ScrollArea>
//         <DialogFooter>
//           <Button type='submit' form='car-form' disabled={isPending}>
//             {isPending ? 'Gözləyin...' : 'Yadda saxla'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
