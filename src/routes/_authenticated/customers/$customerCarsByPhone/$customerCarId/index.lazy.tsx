import { createLazyFileRoute } from '@tanstack/react-router'
import CustomerCarAllServices from '@/features/customers/$customerCarsByPhone/$customerCarId/index'

export const Route = createLazyFileRoute(
  '/_authenticated/customers/$customerCarsByPhone/$customerCarId/',
)({
  component: CustomerCarAllServicesContainer,
})

function CustomerCarAllServicesContainer() {
  const { customerCarId } = Route.useParams()
  return <CustomerCarAllServices customerCarId={customerCarId} />
}
