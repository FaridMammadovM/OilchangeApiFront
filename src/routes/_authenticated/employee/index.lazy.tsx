import { createLazyFileRoute } from '@tanstack/react-router'
import Employee from '@/features/employee'

export const Route = createLazyFileRoute('/_authenticated/employee/')({
  component: Employee,
})
