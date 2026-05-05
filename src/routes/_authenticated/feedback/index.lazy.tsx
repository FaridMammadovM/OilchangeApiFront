import { createLazyFileRoute } from '@tanstack/react-router'
import Feedback from '@/features/feedback'

export const Route = createLazyFileRoute('/_authenticated/feedback/')({
  component: Feedback,
})
