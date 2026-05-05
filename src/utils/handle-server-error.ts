import { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.log(error)

  let errMsg = 'Xəta baş verdi!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Kontent tapılmadı.'
  }

  if (error instanceof AxiosError) {
    errMsg = error.response?.data.message || error.message
  }

  toast({ variant: 'destructive', title: errMsg })
}
