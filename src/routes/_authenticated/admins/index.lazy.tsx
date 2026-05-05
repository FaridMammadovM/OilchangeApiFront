import { createLazyFileRoute } from '@tanstack/react-router'
import Admins from '@/features/admins'

export const Route = createLazyFileRoute('/_authenticated/admins/')({
  component: Admins,
})
