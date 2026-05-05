import { createFileRoute } from '@tanstack/react-router'
import Cars from '@/features/cars'

export const Route = createFileRoute('/_authenticated/')({
  component: Cars,
})
