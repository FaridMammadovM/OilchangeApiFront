'use client'

import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Antifreeze } from '../data/schema'
import { deleteAntifreeze } from '@/services/product.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Antifreeze
}

export function AntifreezesDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteAntifreeze,
    onSuccess: (data) => {
      toast({ title: data.message })
      queryClient.invalidateQueries({ queryKey: ['antifreezes'] })
      onOpenChange(false)
    },
  })

  const handleDelete = () => {
    if (!currentRow.id) return
    mutate(currentRow.id)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={!currentRow.id}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Antifrizu sil
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            <span className='font-bold'>{currentRow.name} </span>
            antifrizunu silmək istədiyinizə əminsiniz?
            <br />
            Bu əməliyyat geri qaytarıla bilməz.
          </p>

          {/* <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be antifreezeefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert> */}
        </div>
      }
      confirmText='Sil'
      destructive
    />
  )
}
