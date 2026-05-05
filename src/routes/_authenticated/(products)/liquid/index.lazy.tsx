import { createLazyFileRoute } from '@tanstack/react-router'
import Liquids from '@/features/products/liquid'

export const Route = createLazyFileRoute(
  '/_authenticated/(products)/liquid/',
)({
  component: Liquids,
})
