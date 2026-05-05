import { createLazyFileRoute } from '@tanstack/react-router'
import Antifreezes from '@/features/products/antifreeze'

export const Route = createLazyFileRoute(
  '/_authenticated/(products)/antifreeze/',
)({
  component: Antifreezes,
})
