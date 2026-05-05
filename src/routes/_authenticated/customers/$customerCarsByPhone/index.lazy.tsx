import { createLazyFileRoute } from '@tanstack/react-router'
import CustomerCarsMatrix from '@/features/customers/$customerCarsByPhone/index'

export const Route = createLazyFileRoute(
  '/_authenticated/customers/$customerCarsByPhone/',
)({
  component: CustomerCarsMatrixContainer,
})

function CustomerCarsMatrixContainer() {
  const { customerCarsByPhone: customerPhone } = Route.useParams()
  return <CustomerCarsMatrix customerPhone={customerPhone} />
}
