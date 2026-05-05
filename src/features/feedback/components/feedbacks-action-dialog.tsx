'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Feedback } from '../data/schema'

interface Props {
  currentRow?: Feedback
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbacksActionDialog({ currentRow, open, onOpenChange }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>Baxış</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          {currentRow?.commitMessage}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
