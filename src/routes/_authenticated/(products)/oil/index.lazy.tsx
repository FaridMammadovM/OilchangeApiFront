import { createLazyFileRoute } from '@tanstack/react-router'
import Oils from '@/features/products/oil'

export const Route = createLazyFileRoute('/_authenticated/(products)/oil/')({
  component: Oils,
})
